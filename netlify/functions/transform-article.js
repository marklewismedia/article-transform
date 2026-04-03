// netlify/functions/transform-article.js
// Receives a base64 PNG screenshot, sends it to Claude vision,
// returns a structured card array matching the EczemaSpace card schema.

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "ANTHROPIC_API_KEY is not set. Go to Netlify → Site configuration → Environment variables and add it, then redeploy." }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body." }) };
  }

  const { imageBase64, mediaType = "image/png" } = body;
  if (!imageBase64) {
    return { statusCode: 400, body: JSON.stringify({ error: "No image data received." }) };
  }

  const systemPrompt = `You are a health content transformation engine for EczemaSpace, a calm and credible eczema companion app.

Your job is to read a screenshot of a health article and transform it into a structured card sequence that users can swipe through on mobile.

You must return ONLY valid JSON — no markdown, no explanation, no code fences. Just the raw JSON object.

The JSON must match this exact schema:

{
  "metadata": {
    "title": "string — the article's full title",
    "source": "string — publication name (e.g. Verywell Mind, WebMD)",
    "sourceUrl": "string — publication domain if visible, else ''",
    "reviewedBy": "string — reviewer name if visible, else ''",
    "reviewedRole": "string — reviewer credential/role if visible, else ''",
    "readTime": "string — e.g. '6 min read', estimate if not shown",
    "articleUrl": "#"
  },
  "cards": [
    {
      "id": 1,
      "type": "summary",
      "tag": "KEY INSIGHT",
      "headline": "string — punchy, plain-english key takeaway, max 12 words",
      "body": "string — 1-2 sentences, the core finding of the article",
      "hint": "string — 'Relevant if...' or 'Common for people who...' framing"
    },
    {
      "id": 2,
      "type": "explanation",
      "tag": "WHY IT HAPPENS",
      "headline": "string — plain-english mechanism, max 12 words",
      "intro": "string — 1 sentence setup",
      "bullets": ["string", "string", "string", "string"]
    },
    {
      "id": 3,
      "type": "pattern",
      "tag": "THE CYCLE",
      "headline": "string — max 8 words",
      "steps": [
        { "icon": "emoji", "label": "string — short step label" }
      ],
      "note": "string — 1 sentence, a direct or near-direct quote from the article if possible"
    },
    {
      "id": 4,
      "type": "triggers",
      "tag": "COMMON TRIGGERS",
      "headline": "string",
      "groups": [
        {
          "label": "string — category name",
          "items": ["string", "string", "string"]
        }
      ]
    },
    {
      "id": 5,
      "type": "action",
      "tag": "WHAT HELPS",
      "headline": "Strategies the article recommends.",
      "actions": [
        {
          "emoji": "relevant emoji",
          "title": "string — short action title",
          "desc": "string — 1 sentence, plain language"
        }
      ]
    },
    {
      "id": 6,
      "type": "full_article",
      "tag": "FULL ARTICLE",
      "headline": "string — article title",
      "excerpt": "string — 1-2 sentence description of what the full article covers"
    }
  ]
}

Rules:
- Every card must be present, in order, with the correct type.
- Keep all text short and scannable. No jargon. No long paragraphs.
- The pattern card steps array should have 4-5 items with relevant emojis.
- The triggers card groups array should have 2 groups with 2-4 items each.
- The action card actions array should have 4-5 items.
- If information for a field is not clearly visible in the screenshot, make a reasonable inference from context rather than leaving it empty.
- Return ONLY the JSON object. No other text.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mediaType,
                  data: imageBase64,
                },
              },
              {
                type: "text",
                text: "Please transform this article screenshot into the card JSON structure.",
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      let detail = errText;
      try {
        const errJson = JSON.parse(errText);
        detail = errJson?.error?.message || errText;
      } catch {}
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Anthropic API error (${response.status}): ${detail}` }),
      };
    }

    const data = await response.json();
    const rawText = data.content?.[0]?.text ?? "";

    // Strip any accidental markdown fences
    const cleaned = rawText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/,"").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Claude returned unexpected output. Try uploading the screenshot again.",
          raw: rawText.slice(0, 300),
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Function error: ${err.message}` }),
    };
  }
};
