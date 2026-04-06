import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is missing in Vercel environment variables",
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const idea = (body?.idea || "").trim();

    if (!idea) {
      return res.status(400).json({ error: "Idea text is required" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            'Ты помощник по упаковке бизнес-идей. Отвечай только JSON без markdown в формате {"socialPost":"string","teamTasks":["string"],"analytics":"string"}. ' +
            "socialPost: короткий пост на русском с 1-2 эмодзи и 1-2 хештегами. " +
            "teamTasks: 4 конкретные задачи. analytics: 2-3 коротких предложения о профите и рисках.",
        },
        {
          role: "user",
          content: `Бизнес-идея: ${idea}`,
        },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw);

    return res.status(200).json({
      socialPost: parsed.socialPost || "",
      teamTasks: Array.isArray(parsed.teamTasks) ? parsed.teamTasks : [],
      analytics: parsed.analytics || "",
    });
  } catch (err) {
    const details =
      err?.error?.message ||
      err?.message ||
      "Unknown error";

    return res.status(500).json({
      error: "Generation failed",
      details,
    });
  }
}
