const { OpenAI } = require("openai");

exports.videoChat = async (req, res) => {
  try {
    const { message, videoTitle, videoDescription, history } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    // Hot-reload .env so the user never has to restart terminal
    require('dotenv').config({ override: true });

    // Ensure OPENAI_API_KEY exists
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ success: false, message: "OPENAI_API_KEY is missing from your .env file." });
    }

    // Initialize OpenAI to route through OpenRouter
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENAI_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "StudyNotion Platform",
      }
    });

    // Formatting History
    const recentHistory = history && Array.isArray(history) ? history.slice(-5) : [];

    const systemPrompt = `You are a highly intelligent and versatile AI assistant (similar to ChatGPT).
    You are embedded within the "StudyNotion" educational platform.
    You can help the user with anything they ask, whether it's coding, general knowledge, or casual conversation.
    There are no restrictions on the topics you can discuss. Always be helpful, clear, and accurate.
    
    IMPORTANT: You MUST format all of your responses in a highly beautiful, structured, and organized way. 
    Always use proper Markdown: 
    - Use clear Headings (###) for sections.
    - Use Bullet points (-) or numbered lists for steps.
    - Use **bold text** to highlight key terms.
    - Use formatting to ensure your response never looks like a giant wall of text.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...recentHistory.map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Request to OpenRouter using their native auto-router for reliable free-tier usage
    const response = await openai.chat.completions.create({
      model: "openrouter/auto", // openrouter parses their balance automatically
      messages: messages,
      max_tokens: 350,
      temperature: 0.7,
    });

    // Return the response
    return res.status(200).json({
      success: true,
      data: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("Chatbot Error:", error);

    // Return exact OpenAI Error so the frontend can catch it
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch response from OpenAI",
      error: error.message,
    });
  }
};
