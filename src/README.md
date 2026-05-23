# Health by Hayley — Review Manager v2

Private internal tool for sending Google review request emails to clients.
Emails sent via Gmail API from info@healthbyhayley.com.au.

---

## Environment Variables

These must be added to Vercel — never commit them to GitHub.

| Variable | Description |
|---|---|
| `GMAIL_CLIENT_ID` | From Google Cloud Console → Credentials |
| `GMAIL_CLIENT_SECRET` | From Google Cloud Console → Credentials |
| `GMAIL_REFRESH_TOKEN` | From OAuth Playground one-time flow |
| `ANTHROPIC_API_KEY` | From console.anthropic.com → API Keys |

### How to add them in Vercel:
1. Go to your project on vercel.com
2. Settings → Environment Variables
3. Add each one above — set scope to **Production**, **Preview**, and **Development**
4. Click Save
5. Redeploy for changes to take effect

---

## Deploy to Vercel

### Step 1 — Push to GitHub (keep repo PRIVATE)
```bash
npm install
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/hbh-review-manager.git
git push -u origin main
```

### Step 2 — Import to Vercel
1. vercel.com → Add New → Project
2. Import the GitHub repo
3. Before deploying — go to Environment Variables and add all 4 keys above
4. Click Deploy

---

## Local development
```bash
npm install
# Create a .env.local file with your keys:
# GMAIL_CLIENT_ID=...
# GMAIL_CLIENT_SECRET=...
# GMAIL_REFRESH_TOKEN=...
# ANTHROPIC_API_KEY=...
npm start
```

---

## Login
- Email: hayley@healthbyhayley.com.au
- Password: Sunshinechiro25

---

## Custom domain (optional)
To use reviews.healthbyhayley.com.au:
1. Vercel → project → Settings → Domains
2. Add reviews.healthbyhayley.com.au
3. Add the CNAME record to your DNS provider
