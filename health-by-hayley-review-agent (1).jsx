import { useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   HEALTH BY HAYLEY — Review Request Agent
   Hardcoded business constants — nothing to change unless details update.
───────────────────────────────────────────────────────────────────────────── */
const HBH = {
  senderEmail: "info@healthbyhayley.com.au",
  reviewLink:  "https://g.page/r/CRsidlcTVKHsEBM/review",
  subject:     "{{first_name}}, we'd love your feedback",
};

/* ─────────────────────────────────────────────────────────────────────────────
   EMAIL TEMPLATE — Hayley's exact design, first name + review link injected
───────────────────────────────────────────────────────────────────────────── */
const LOGO = "data:image/png;base64,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";

function buildEmail(contactName) {
  const raw = (contactName || "").trim().split(/\s+/)[0] || "there";
  const firstName = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  const subject = HBH.subject.replace("{{first_name}}", firstName);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${subject}</title>
<!--[if mso]>
<style type="text/css">
  table, td, div, p, a { font-family: Arial, Helvetica, sans-serif !important; }
</style>
<![endif]-->
<style type="text/css">
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
  body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
  @media screen and (max-width: 620px) {
    .container { width: 100% !important; max-width: 100% !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .py-lg { padding-top: 32px !important; padding-bottom: 32px !important; }
    .h1 { font-size: 24px !important; line-height: 32px !important; }
    .h2 { font-size: 18px !important; line-height: 26px !important; }
    .btn a { display: block !important; width: 100% !important; box-sizing: border-box !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#FFF8BC; font-family: Arial, Helvetica, sans-serif; color:#293448;">

<div style="display:none; font-size:1px; color:#FFF8BC; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
  A quick favour from Hayley — share your honest experience with a Google review.
</div>

<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#FFF8BC;">
  <tr>
    <td align="center" style="padding: 32px 16px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="620" class="container" style="width:620px; max-width:620px; background-color:#FFFFFF; border-radius:20px; overflow:hidden; box-shadow: 0 4px 18px rgba(41, 52, 72, 0.08);">

        <!-- HEADER -->
        <tr>
          <td align="center" class="px py-lg" style="background-color:#FFF8BC; padding: 40px 40px 36px 40px; border-top-left-radius:20px; border-top-right-radius:20px;">
            <a href="https://www.healthbyhayley.com.au/" target="_blank" style="text-decoration:none; border:0;">
              <img src="${LOGO}" width="220" height="auto" alt="Health by Hayley" style="display:block; margin: 0 auto 18px auto; max-width:220px; height:auto;">
            </a>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 24px auto;">
              <tr>
                <td style="background-color:#E2F0F6; color:#293448; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; letter-spacing:0.6px; text-transform:uppercase; padding: 8px 16px; border-radius:999px;">
                  Chiropractic + Wellness Care
                </td>
              </tr>
            </table>
            <h1 class="h1" style="margin:0 0 8px 0; font-family:Arial, Helvetica, sans-serif; color:#293448; font-size:28px; line-height:36px; font-weight:bold;">
              Thank you for coming to see me!
            </h1>
            <p class="h2" style="margin:0; font-family:Arial, Helvetica, sans-serif; color:#5A6478; font-size:16px; line-height:24px; font-style:italic;">
              Move Better. Feel Stronger. Live Well.
            </p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td class="px py-lg" style="background-color:#FFFFFF; padding: 40px 48px 16px 48px; font-family:Arial, Helvetica, sans-serif; color:#293448; font-size:16px; line-height:26px;">
            <p style="margin:0 0 20px 0;">Hi ${firstName},</p>
            <p style="margin:0 0 20px 0;">I hope you're feeling great after your visit to Health by Hayley.</p>
            <p style="margin:0 0 32px 0;">If you had a positive experience, I'd be so grateful if you could take a moment to leave a Google review. Your feedback means a lot and helps other Sunshine Coast locals feel comfortable reaching out for care, while also helping Health by Hayley continue to grow :)</p>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" class="btn" style="margin: 8px auto 12px auto;">
              <tr>
                <td align="center" bgcolor="#293448" style="border-radius:999px;">
                  <a href="${HBH.reviewLink}" target="_blank"
                     style="display:inline-block; padding: 16px 36px; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; color:#FFFFFF; text-decoration:none; border-radius:999px; background-color:#293448; mso-padding-alt:0;">
                    Leave a Google Review  ⭐
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- HIGHLIGHT BOX -->
        <tr>
          <td class="px" style="background-color:#FFFFFF; padding: 16px 48px 32px 48px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="background-color:#FFF8BC; border-radius:14px; padding: 20px 24px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:24px; color:#293448; text-align:center;">
                  Your review does not need to be long — even a few words about your experience is incredibly helpful.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SIGN OFF -->
        <tr>
          <td class="px" style="background-color:#FFFFFF; padding: 8px 48px 40px 48px; font-family:Arial, Helvetica, sans-serif; color:#293448; font-size:16px; line-height:26px;">
            <p style="margin:0 0 6px 0;">Thanks again,</p>
            <p style="margin:0; font-weight:bold;">Hayley</p>
            <p style="margin:0; color:#5A6478;">Health by Hayley</p>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td class="px" style="background-color:#FFF8BC; background-image: linear-gradient(180deg, #FFF8BC 0%, #FFF8BC 30%, #EFF6E0 60%, #E2F0F6 100%); padding: 36px 40px; border-top: 1px solid #FFF1A8; text-align:center; font-family:Arial, Helvetica, sans-serif; color:#293448;">
            <p style="margin:0 0 6px 0; font-size:15px; font-weight:bold;">Health by Hayley</p>
            <p style="margin:0 0 6px 0; font-size:14px; color:#5A6478; line-height:22px;">Shop 9/61 Burnett St, Buderim QLD 4556</p>
            <p style="margin:0 0 18px 0; font-size:14px;">
              <a href="https://www.healthbyhayley.com.au/" target="_blank" style="color:#293448; text-decoration:underline; font-weight:bold;">www.healthbyhayley.com.au</a>
            </p>
            <p style="margin:0; font-size:12px; color:#5A6478; line-height:18px;">
              You're receiving this because you recently visited Health by Hayley.
            </p>
          </td>
        </tr>

      </table>
      <div style="height:24px; line-height:24px; font-size:24px;">&nbsp;</div>
    </td>
  </tr>
</table>
</body></html>`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   API HELPERS
───────────────────────────────────────────────────────────────────────────── */
async function parseContactsAI(raw) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: `Extract contacts from this spreadsheet data. Return ONLY a JSON array — no markdown, no explanation.
Each object: {"name":"","email":"","phone":""}
- name: full name exactly as written (e.g. "Ben" or "Ben Alderlieste") — never split or shorten it, preserve capitalisation
- email: valid email or empty string
- phone: cleaned phone number or empty string
- Skip rows with no email AND no phone
Data:\n${raw}` }],
      }),
    });
    const data = await res.json();
    const text = data.content?.find(b => b.type === "text")?.text || "[]";
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch { return []; }
}

async function sendViaGmail(contact, htmlBody) {
  const firstName = (contact.name || "").trim().split(" ")[0] || "there";
  const subject = HBH.subject.replace("{{first_name}}", firstName);
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        mcp_servers: [{ type: "url", url: "https://gmailmcp.googleapis.com/mcp/v1", name: "gmail-mcp" }],
        messages: [{ role: "user", content: `Send this email using Gmail now:
To: ${contact.email}
Subject: ${subject}
HTML body: ${htmlBody}
Reply only "sent" or "failed".` }],
      }),
    });
    const data = await res.json();
    const text = data.content?.map(b => b.type === "text" ? b.text : "").join(" ").toLowerCase();
    const ok = text.includes("sent") || text.includes("success") || (!text.includes("error") && !text.includes("fail"));
    return { success: ok, note: ok ? "Sent" : "Failed" };
  } catch { return { success: false, note: "Error" }; }
}

/* ─────────────────────────────────────────────────────────────────────────────
   UI — matches Health by Hayley palette (#FFF8BC yellow, #293448 dark, #E2F0F6 blue)
───────────────────────────────────────────────────────────────────────────── */
const C = {
  yellow:     "#FFF8BC",
  yellowDark: "#FFF1A8",
  dark:       "#293448",
  blue:       "#E2F0F6",
  blueDeep:   "#3a7fa0",
  muted:      "#5A6478",
  white:      "#FFFFFF",
  green:      "#EFF6E0",
};

function Stepper({ step }) {
  const tabs = ["Import", "Contacts", "Preview", "Confirm", "Results"];
  return (
    <div style={{ display: "flex", background: C.yellow, borderBottom: `2px solid ${C.yellowDark}` }}>
      {tabs.map((label, i) => {
        const active = i === step, done = i < step;
        return (
          <div key={label} style={{
            flex: 1, padding: "9px 4px 8px", textAlign: "center",
            fontSize: 10, fontWeight: 700, letterSpacing: ".7px", textTransform: "uppercase",
            fontFamily: "Arial, sans-serif",
            color: active ? C.dark : done ? "#2a7a50" : C.muted,
            borderBottom: active ? `3px solid ${C.dark}` : "3px solid transparent",
            background: active ? "rgba(255,255,255,0.5)" : "transparent",
            whiteSpace: "nowrap",
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 16, height: 16, borderRadius: "50%", fontSize: 9, marginRight: 4,
              background: active ? C.dark : done ? "#2a7a50" : "rgba(41,52,72,0.15)",
              color: active || done ? C.white : C.muted, verticalAlign: "middle",
            }}>{done ? "✓" : i + 1}</span>
            {label}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   LOGIN PAGE
───────────────────────────────────────────────────────────────────────────── */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const handleLogin = () => {
    if (
      email.trim().toLowerCase() === "hayley@healthbyhayley.com.au" &&
      password === "Sunshinechiro25"
    ) {
      onLogin();
    } else {
      setError("Incorrect email or password. Please try again.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const handleKey = e => { if (e.key === "Enter") handleLogin(); };

  return (
    <div style={{
      minHeight: "100vh", background: "#FFF8BC",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Arial, Helvetica, sans-serif", padding: 24,
    }}>
      <div style={{
        width: "100%", maxWidth: 420,
        background: "#FFFFFF", borderRadius: 20,
        boxShadow: "0 4px 24px rgba(41,52,72,0.10)",
        overflow: "hidden",
        animation: shaking ? "shake 0.4s ease" : "none",
      }}>
        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            20%{transform:translateX(-8px)}
            40%{transform:translateX(8px)}
            60%{transform:translateX(-6px)}
            80%{transform:translateX(6px)}
          }
        `}</style>

        {/* Header */}
        <div style={{ background: "#FFFFFF", padding: "36px 40px 28px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
          <img src={LOGO} alt="Health by Hayley" style={{ height: 48, margin: "0 auto 16px", display: "block" }} />
          <div style={{ display: "inline-block", background: "#E2F0F6", color: "#293448", fontSize: 11, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999, marginBottom: 14 }}>
            Review Manager
          </div>
          <div style={{ fontSize: 14, color: "#5A6478", lineHeight: 1.5 }}>
            Sign in to access the<br />Health by Hayley review tool
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: "32px 40px 36px" }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#5A6478", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              onKeyDown={handleKey}
              placeholder="hayley@healthbyhayley.com.au"
              style={{
                width: "100%", boxSizing: "border-box", padding: "11px 14px",
                fontSize: 14, fontFamily: "Arial, sans-serif", color: "#293448",
                background: "#FAFAFA", border: "1px solid #D8E8F0",
                borderRadius: 8, outline: "none",
              }}
              autoComplete="email"
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#5A6478", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                onKeyDown={handleKey}
                placeholder="••••••••••••••"
                style={{
                  width: "100%", boxSizing: "border-box", padding: "11px 44px 11px 14px",
                  fontSize: 14, fontFamily: "Arial, sans-serif", color: "#293448",
                  background: "#FAFAFA", border: "1px solid #D8E8F0",
                  borderRadius: 8, outline: "none",
                }}
                autoComplete="current-password"
              />
              <button
                onClick={() => setShowPw(v => !v)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, color: "#5A6478", padding: 2,
                }}
                tabIndex={-1}
              >
                {showPw ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ fontSize: 12, color: "#c0392b", background: "#fdecea", border: "1px solid #f5b8b4", borderRadius: 6, padding: "8px 12px", marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            style={{
              width: "100%", marginTop: error ? 0 : 16,
              background: "#293448", color: "#FFFFFF",
              border: "none", borderRadius: 999,
              padding: "14px 0", fontSize: 15, fontWeight: 700,
              fontFamily: "Arial, sans-serif", cursor: "pointer",
              letterSpacing: "0.3px",
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [step, setStep] = useState(0);
  const [paste, setPaste] = useState("");
  const [contacts, setContacts] = useState([]);
  const [parsing, setParsing] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendIdx, setSendIdx] = useState(0);
  const [results, setResults] = useState([]);

  const selected = contacts.filter(c => c.selected);
  const withEmail = selected.filter(c => c.email);
  const phoneOnly = selected.filter(c => !c.email && c.phone);
  const sample = contacts.find(c => c.selected) || contacts[0] || { name: "Sarah Johnson" };

  const handleParse = useCallback(async () => {
    if (!paste.trim()) return;
    setParsing(true);
    const parsed = await parseContactsAI(paste);
    setContacts(parsed.map(c => ({ ...c, selected: true })));
    setParsing(false);
    if (parsed.length > 0) setStep(1);
  }, [paste]);

  const handleSend = useCallback(async () => {
    setStep(4); setSending(true); setSendIdx(0); setResults([]);
    const res = [];
    for (let i = 0; i < withEmail.length; i++) {
      setSendIdx(i);
      const c = withEmail[i];
      const r = await sendViaGmail(c, buildEmail(c.name));
      res.push({ ...c, ...r });
      setResults([...res]);
    }
    setSending(false);
  }, [withEmail]);

  const inputStyle = {
    width: "100%", boxSizing: "border-box", fontFamily: "Arial, sans-serif",
    fontSize: 13, background: C.white, border: `1px solid #c8d8e8`,
    borderRadius: 8, padding: "9px 12px", color: C.dark, outline: "none",
  };
  const btnPrimary = {
    background: C.dark, color: C.white, border: "none", padding: "13px 28px",
    borderRadius: 999, fontFamily: "Arial, sans-serif", fontSize: 14, fontWeight: 700,
    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
  };
  const btnGhost = {
    background: C.white, border: `1px solid #c8d8e8`, padding: "13px 20px",
    borderRadius: 999, fontFamily: "Arial, sans-serif", fontSize: 13,
    fontWeight: 600, cursor: "pointer", color: C.muted,
  };
  const actions = {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    paddingTop: 16, marginTop: 8, borderTop: `1px solid ${C.yellowDark}`,
  };
  const panel = { padding: 24, background: "#FFFFFF", fontFamily: "Arial, sans-serif" };

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: C.dark, background: "transparent" }}>

      {/* HEADER */}
      <div style={{ background: C.yellow, padding: "16px 24px", display: "flex", alignItems: "center", gap: 14, borderBottom: `1px solid ${C.yellowDark}` }}>
        <img src={LOGO} alt="Health by Hayley" style={{ height: 44 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, letterSpacing: ".3px" }}>Review Request Agent</div>
          <div style={{ fontSize: 10, color: C.muted, letterSpacing: "1.2px", textTransform: "uppercase", marginTop: 2 }}>Health by Hayley</div>
        </div>
        <button
          onClick={() => setLoggedIn(false)}
          style={{
            background: "rgba(41,52,72,0.08)", border: "none", borderRadius: 999,
            padding: "6px 14px", fontSize: 11, fontWeight: 700, color: C.muted,
            cursor: "pointer", fontFamily: "Arial, sans-serif", letterSpacing: ".3px",
          }}
        >
          Sign out
        </button>
      </div>

      <Stepper step={step} />

      <div style={panel}>

        {/* ── STEP 0: IMPORT ── */}
        {step === 0 && <>
          <div style={{ background: C.blue, border: `1px solid #b8d8e8`, borderRadius: 10, padding: "12px 16px", fontSize: 13, color: C.dark, lineHeight: 1.7, marginBottom: 16, display: "flex", gap: 10 }}>
            <span style={{ flexShrink: 0 }}>📋</span>
            <span>Open your Google Sheet → select all (Ctrl+A) → copy (Ctrl+C) → paste below. The AI will extract <strong>names, emails and phone numbers</strong> from any column layout.</span>
          </div>
          <textarea
            style={{ ...inputStyle, minHeight: 160, resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
            value={paste}
            onChange={e => setPaste(e.target.value)}
            placeholder={"Name\tEmail\tPhone\nSarah Johnson\tsarah@example.com\t0412 345 678\nMike Chen\tmike@example.com\t\n\nAny column order — AI will extract names, emails and phones automatically."}
          />
          {contacts.length > 0 && (
            <div style={{ fontSize: 11, color: "#2a7a50", marginTop: 6, fontWeight: 700 }}>✓ {contacts.length} contacts already parsed</div>
          )}
          <div style={actions}>
            <span />
            <button style={{ ...btnPrimary, opacity: parsing || !paste.trim() ? .45 : 1 }} onClick={handleParse} disabled={parsing || !paste.trim()}>
              {parsing ? "Parsing…" : "Parse contacts ✦"}
            </button>
          </div>
        </>}

        {/* ── STEP 1: CONTACTS ── */}
        {step === 1 && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>{selected.length} of {contacts.length} contacts selected</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[["All", true], ["None", false]].map(([l, v]) => (
                <button key={l} style={{ ...btnGhost, padding: "5px 12px", fontSize: 11 }}
                  onClick={() => setContacts(cs => cs.map(c => ({ ...c, selected: v })))}>{l}</button>
              ))}
            </div>
          </div>

          <div style={{ maxHeight: 260, overflowY: "auto", border: `1px solid #c8d8e8`, borderRadius: 10, padding: 6, background: C.white, marginBottom: 14 }}>
            {contacts.map((c, i) => (
              <div key={i} onClick={() => setContacts(cs => cs.map((x, j) => j === i ? { ...x, selected: !x.selected } : x))}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "9px 10px",
                  borderRadius: 8, cursor: "pointer", marginBottom: 2,
                  background: c.selected ? "#FFFDE8" : "transparent",
                  border: c.selected ? `1px solid ${C.yellowDark}` : "1px solid transparent",
                }}>
                <div style={{ width: 16, height: 16, borderRadius: 3, border: `2px solid ${c.selected ? C.dark : "#b0b8c8"}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: c.selected ? C.dark : C.white }}>
                  {c.selected && <span style={{ color: C.white, fontSize: 10 }}>✓</span>}
                </div>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.yellow, border: `1px solid ${C.yellowDark}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.dark, flexShrink: 0 }}>
                  {(c.name || c.email || "?").slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{c.name || "—"}</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 3, flexWrap: "wrap" }}>
                    {c.email && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: C.blue, color: C.dark, border: `1px solid #b8d8e8` }}>✉ {c.email}</span>}
                    {c.phone && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: C.green, color: C.dark, border: "1px solid #c8ddb8" }}>📞 {c.phone}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={actions}>
            <button style={btnGhost} onClick={() => setStep(0)}>← Back</button>
            <button style={{ ...btnPrimary, opacity: selected.length === 0 ? .45 : 1 }} disabled={selected.length === 0} onClick={() => setStep(2)}>
              Preview email →
            </button>
          </div>
        </>}

        {/* ── STEP 2: PREVIEW ── */}
        {step === 2 && <>
          <div style={{ marginBottom: 10, background: "#FFFFFF", padding: "0 0 10px 0" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 3 }}>Email preview</div>
            <div style={{ fontSize: 12, color: C.muted }}>
              Personalised for: <strong>{sample.name || sample.email}</strong> — every client gets their own first name in the greeting.
            </div>
          </div>
          <div style={{ border: `1px solid #c8d8e8`, borderRadius: 12, overflow: "hidden", background: C.white }}>
            <iframe
              srcDoc={buildEmail(sample.name)}
              style={{ width: "100%", height: 560, border: "none", display: "block" }}
              title="Email preview"
            />
          </div>
          <div style={actions}>
            <button style={btnGhost} onClick={() => setStep(1)}>← Back</button>
            <button style={btnPrimary} onClick={() => setStep(3)}>Looks great — confirm →</button>
          </div>
        </>}

        {/* ── STEP 3: CONFIRM ── */}
        {step === 3 && <>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Ready to send?</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Each client receives exactly one personalised email. Review carefully — this cannot be undone.</div>

          <div style={{ background: C.white, border: `1px solid #c8d8e8`, borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
            {[
              ["From", HBH.senderEmail],
              ["Subject", `"[First Name], we'd love your feedback"`],
              ["Recipients", `${withEmail.length} client${withEmail.length !== 1 ? "s" : ""}`],
              ...(phoneOnly.length > 0 ? [["Phone-only (skipped)", `${phoneOnly.length} — no email address`]] : []),
              ["Review link", HBH.reviewLink],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.yellow}`, fontSize: 13, gap: 12 }}>
                <span style={{ color: C.muted, fontWeight: 600, flexShrink: 0 }}>{k}</span>
                <span style={{ color: C.dark, fontWeight: 700, textAlign: "right", wordBreak: "break-all" }}>{v}</span>
              </div>
            ))}
          </div>

          {phoneOnly.length > 0 && (
            <div style={{ background: "#FFF8E7", border: "1px solid #e8cfa0", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#7a5f00", marginBottom: 12, display: "flex", gap: 8 }}>
              <span style={{ flexShrink: 0 }}>ℹ️</span>
              <span>{phoneOnly.length} client(s) have phone numbers only — they will be skipped. Email is required to send.</span>
            </div>
          )}

          <div style={{ background: "#FFF8E7", border: "1px solid #e8cfa0", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#7a5f00", marginBottom: 16, display: "flex", gap: 8 }}>
            <span style={{ flexShrink: 0 }}>⚠️</span>
            <span>Each client receives <strong>exactly one email</strong> personalised with their first name. This cannot be undone.</span>
          </div>

          <div style={actions}>
            <button style={btnGhost} onClick={() => setStep(2)}>← Back</button>
            <button style={{ ...btnPrimary, opacity: withEmail.length === 0 ? .45 : 1 }} disabled={withEmail.length === 0} onClick={handleSend}>
              ✉ Send {withEmail.length} email{withEmail.length !== 1 ? "s" : ""} now
            </button>
          </div>
        </>}

        {/* ── STEP 4: RESULTS ── */}
        {step === 4 && <>
          {sending ? (
            <div style={{ textAlign: "center", padding: "40px 16px" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Sending emails…</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
                {sendIdx + 1} of {withEmail.length} — {withEmail[sendIdx]?.email || ""}
              </div>
              <div style={{ height: 4, background: C.yellow, borderRadius: 2, maxWidth: 300, margin: "0 auto" }}>
                <div style={{ height: "100%", background: C.dark, borderRadius: 2, transition: "width .4s", width: `${Math.round(((sendIdx + 1) / withEmail.length) * 100)}%` }} />
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>{Math.round(((sendIdx + 1) / withEmail.length) * 100)}%</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Campaign complete</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>Review requests sent on behalf of Health by Hayley.</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[[results.filter(r => r.success).length, "Sent", "#2a7a50"],
                  [results.filter(r => !r.success).length, "Failed", "#c0392b"],
                  [results.length, "Total", C.dark]].map(([v, l, col]) => (
                  <div key={l} style={{ background: C.white, border: `1px solid #c8d8e8`, borderRadius: 10, padding: 14, textAlign: "center" }}>
                    <div style={{ fontSize: 30, fontWeight: 700, color: col, lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 4, letterSpacing: ".5px", textTransform: "uppercase" }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ border: `1px solid #c8d8e8`, borderRadius: 10, padding: "8px 14px", maxHeight: 240, overflowY: "auto", background: C.white, marginBottom: 16 }}>
                {results.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < results.length - 1 ? `1px solid ${C.yellow}` : "none", fontSize: 12 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{r.success ? "✅" : "❌"}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700 }}>{r.name || r.email}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{r.email}</div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, background: r.success ? "#e5f5ee" : "#fdecea", color: r.success ? "#2a7a50" : "#c0392b", border: `1px solid ${r.success ? "#a8dcc0" : "#f5b8b4"}` }}>
                      {r.note}
                    </span>
                  </div>
                ))}
              </div>

              <button style={{ ...btnGhost, width: "100%", justifyContent: "center", display: "flex", borderRadius: 999 }}
                onClick={() => { setStep(0); setContacts([]); setPaste(""); setResults([]); }}>
                + New campaign
              </button>
            </>
          )}
        </>}

      </div>
    </div>
  );
}
