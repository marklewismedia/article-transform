# EczemaSpace — Article Card Prototype

A mobile-first prototype that transforms health article screenshots into swipeable card sequences using Claude's vision API.

---

## How it works

1. User uploads a PNG screenshot of a health article
2. The image is sent to a Netlify serverless function
3. The function passes it to Claude (vision) with a structured prompt
4. Claude returns a JSON card sequence matching the EczemaSpace schema
5. The app renders the cards in a swipeable mobile viewer

---

## Project structure

```
eczema-cards/
├── netlify/
│   └── functions/
│       └── transform-article.js   ← Serverless function (Anthropic API call)
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx                   ← React entry point
│   ├── App.jsx                    ← Root: manages upload ↔ viewer state
│   ├── UploadScreen.jsx           ← Upload UI
│   ├── cards.jsx                  ← All 6 card variant components
│   ├── tokens.js                  ← Design tokens
│   ├── ui.jsx                     ← Shared small components (Tag, Trust)
│   └── defaultArticle.js          ← Pre-loaded article (shown before upload)
├── index.html
├── vite.config.js
├── netlify.toml
├── package.json
└── .env.example
```

---

## Local development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your API key

```bash
cp .env.example .env.local
# Edit .env.local and add your Anthropic API key
```

### 3. Run with Netlify Dev (recommended — runs functions locally)

```bash
npm install -g netlify-cli
netlify dev
```

This starts the Vite dev server and the Netlify function runtime together.
The upload flow will work end-to-end at `http://localhost:8888`.

### 4. Or run Vite only (cards viewer, no upload)

```bash
npm run dev
```

The default article will display. Upload won't work without the function proxy.

---

## Deploy to Netlify

### Option A: Netlify CLI (fastest)

```bash
netlify login
netlify init         # link or create a new site
netlify deploy --prod
```

### Option B: GitHub → Netlify dashboard

1. Push this folder to a GitHub repo
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select your repo
4. Build settings are already in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**

### Set the environment variable

In the Netlify dashboard:
**Site > Site configuration > Environment variables**

Add:
```
ANTHROPIC_API_KEY = sk-ant-...your key...
```

Then trigger a redeploy. The upload function will be live.

---

## Adding a new article

On the live site, tap **+ New** in the top bar to go to the upload screen.
Take a full-page screenshot of any health article (PNG or JPG) and upload it.
Claude will read the content and generate a new card sequence in ~10–20 seconds.

---

## Card schema

Each transformed article produces this structure:

```js
{
  metadata: {
    title, source, sourceUrl,
    reviewedBy, reviewedRole,
    readTime, articleUrl
  },
  cards: [
    { id: 1, type: "summary",      tag, headline, body, hint },
    { id: 2, type: "explanation",  tag, headline, intro, bullets[] },
    { id: 3, type: "pattern",      tag, headline, steps[], note },
    { id: 4, type: "triggers",     tag, headline, groups[] },
    { id: 5, type: "action",       tag, headline, actions[] },
    { id: 6, type: "full_article", tag, headline, excerpt }
  ]
}
```

To hardcode a new article without the upload flow, edit `src/defaultArticle.js`.
