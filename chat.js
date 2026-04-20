export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5",
        input: messages
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.output_text || "No response"
    });

  } catch (err) {
    res.status(500).json({ reply: "Server error" });
  }
}
