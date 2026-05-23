// api/send-email.js
// Vercel serverless function — sends email via Gmail API
// Credentials stored as Vercel environment variables

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject, htmlBody } = req.body;

  if (!to || !subject || !htmlBody) {
    return res.status(400).json({ error: "Missing required fields: to, subject, htmlBody" });
  }

  try {
    // Step 1 — exchange refresh token for a fresh access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id:     process.env.GMAIL_CLIENT_ID,
        client_secret: process.env.GMAIL_CLIENT_SECRET,
        refresh_token: process.env.GMAIL_REFRESH_TOKEN,
        grant_type:    "refresh_token",
      }).toString(),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error("Token error:", JSON.stringify(tokenData));
      return res.status(500).json({ success: false, error: "Failed to get Gmail access token", detail: tokenData });
    }

    // Step 2 — build RFC 2822 email, sending FROM the alias info@healthbyhayley.com.au
    const emailLines = [
      `From: Health by Hayley <info@healthbyhayley.com.au>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      ``,
      htmlBody,
    ].join("\r\n");

    // Step 3 — base64url encode (Gmail API requirement)
    const encodedEmail = Buffer.from(emailLines)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Step 4 — send via Gmail API
    const sendRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw: encodedEmail }),
      }
    );

    const sendData = await sendRes.json();

    if (sendRes.ok && sendData.id) {
      return res.status(200).json({ success: true, messageId: sendData.id });
    } else {
      console.error("Gmail send error:", JSON.stringify(sendData));
      return res.status(500).json({ success: false, error: sendData });
    }

  } catch (err) {
    console.error("Server error:", err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};
