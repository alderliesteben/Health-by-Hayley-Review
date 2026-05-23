// api/parse-contacts.js
// Vercel serverless function — parses pasted spreadsheet data via Anthropic API
// Credentials stored as Vercel environment variables

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { raw } = req.body;

  if (!raw) {
    return res.status(400).json({ error: "Missing raw data" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{
          role: "user",
          content: `Extract contacts from this spreadsheet data. Return ONLY a JSON array — no markdown, no explanation.
Each object: {"name":"","email":"","phone":""}
- name: full name exactly as written (e.g. "Ben" or "Ben Alderlieste") — never split or shorten it, preserve capitalisation
- email: valid email or empty string
- phone: cleaned phone number or empty string
- Skip rows with no email AND no phone
Data:\n${raw}`,
        }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic error:", JSON.stringify(data));
      return res.status(500).json({ error: "Anthropic API error", detail: data });
    }

    const text = data.content?.find(b => b.type === "text")?.text || "[]";
    const contacts = JSON.parse(text.replace(/```json|```/g, "").trim());

    return res.status(200).json({ contacts });

  } catch (err) {
    console.error("Parse error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
