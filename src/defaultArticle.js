// Default article — shown on first load before any upload.
// Source: "The Surprising Link Between Stress and Eczema Flare-Ups", Verywell Mind

export const defaultArticle = {
  metadata: {
    title: "The Surprising Link Between Stress and Eczema Flare-Ups",
    source: "Verywell Mind",
    sourceUrl: "https://www.verywellmind.com",
    reviewedBy: "Dr. Brendan Camp, MD",
    reviewedRole: "Double board-certified dermatologist",
    readTime: "8 min read",
    articleUrl: "https://www.verywellmind.com/the-impact-of-stress-on-eczema-11690763",
  },
  cards: [
    {
      id: 1,
      type: "summary",
      tag: "KEY INSIGHT",
      headline: "Stress doesn't just feel bad — it can visibly worsen your eczema.",
      body: "Research confirms that psychological stress is one of the most common triggers for eczema flare-ups. The connection is biological, not imagined.",
      hint: "Relevant if you notice flares during stressful periods at work, at home, or around major life events.",
    },
    {
      id: 2,
      type: "explanation",
      tag: "WHY IT HAPPENS",
      headline: "Your immune system reacts to stress like it reacts to a threat.",
      intro: "When you experience stress, your body releases hormones including cortisol. In eczema, this process goes further:",
      bullets: [
        "Stress hormones trigger inflammatory cytokines in the skin",
        "Inflammation disrupts the skin's natural moisture barrier",
        "A weakened barrier lets irritants penetrate more easily",
        "This sets off the itch-scratch cycle that's so hard to stop",
      ],
    },
    {
      id: 3,
      type: "pattern",
      tag: "THE ECZEMA CYCLE",
      headline: "One flare can feed the next.",
      steps: [
        { icon: "⚡", label: "Stress event occurs" },
        { icon: "🔥", label: "Inflammatory response spikes" },
        { icon: "💧", label: "Skin barrier weakens" },
        { icon: "😣", label: "Itch and scratch intensifies" },
        { icon: "🔁", label: "Discomfort raises stress further" },
      ],
      note: "The article notes: \"It becomes a vicious cycle where stress causes eczema, which then causes more stress.\"",
    },
    {
      id: 4,
      type: "triggers",
      tag: "COMMON TRIGGERS",
      headline: "Stress-related eczema triggers to know.",
      groups: [
        {
          label: "Emotional",
          items: ["Work or financial pressure", "Relationship difficulties", "Anxiety or depression"],
        },
        {
          label: "Physical",
          items: ["Poor sleep from stress", "Skipping moisturiser routine", "Sweating during stress response"],
        },
      ],
    },
    {
      id: 5,
      type: "action",
      tag: "WHAT HELPS",
      headline: "Strategies that the article recommends.",
      actions: [
        { emoji: "🧘", title: "Mind-body practices",       desc: "Meditation, deep breathing, and yoga can measurably lower cortisol levels." },
        { emoji: "🧴", title: "Consistent moisturising",   desc: "Applying emollient regularly — especially during high-stress periods — protects the barrier before it breaks down." },
        { emoji: "🛏️", title: "Protect your sleep",        desc: "Skin repairs itself overnight. Poor sleep worsens both stress and eczema severity." },
        { emoji: "🗒️", title: "Track your triggers",       desc: "A symptom journal helps identify your personal stress-flare pattern so you can act earlier." },
        { emoji: "🤝", title: "Talk to someone",           desc: "Cognitive behavioural therapy (CBT) has evidence behind it for both stress reduction and eczema management." },
      ],
    },
    {
      id: 6,
      type: "full_article",
      tag: "FULL ARTICLE",
      headline: "The Surprising Link Between Stress and Eczema Flare-Ups",
      excerpt: "Covers the eczema cycle in depth, lifestyle adjustments, tips for body management, healing guidance, and the bottom line from a double board-certified dermatologist.",
    },
  ],
};
