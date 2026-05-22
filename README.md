# Health by Hayley — Review Manager

Private internal tool for sending Google review request emails to clients.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm start
```
Opens at http://localhost:3000

### 3. Build for production
```bash
npm run build
```

---

## Deploy to Vercel

### Option A — GitHub (recommended)
1. Push this repo to GitHub (keep it **private**)
2. Go to [vercel.com](https://vercel.com) → Add New → Project
3. Import the GitHub repo
4. Vercel auto-detects Create React App — click **Deploy**
5. Done. Your URL will be something like `hbh-review-manager.vercel.app`

### Option B — Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## Custom domain (optional)
To use `reviews.healthbyhayley.com.au`:
1. Vercel dashboard → your project → Settings → Domains
2. Add `reviews.healthbyhayley.com.au`
3. Add the CNAME record Vercel gives you to your DNS provider
4. Wait 5–30 minutes

---

## Login credentials
- **Email:** hayley@healthbyhayley.com.au
- **Password:** Sunshinechiro25

---

## Notes
- The tool is set to `noindex` — it will not appear in search engines
- Keep the GitHub repository **private** to protect the source code
- Emails are sent via Gmail MCP through the Claude API
