import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    // Build context from conversation history
    const conversationContext = history
      .slice(-5) // Last 5 messages for context
      .map((msg: { text: string; isUser: boolean }) => `${msg.isUser ? "User" : "Assistant"}: ${msg.text}`)
      .join("\n")

    const systemPrompt = `You are a helpful AI assistant for 24 Digital Products, an online learning platform that sells digital courses and educational products.

Our platform offers courses in:
- Web Development (HTML, CSS, JavaScript, React, Node.js)
- Digital Marketing (SEO, Social Media, Email Marketing)
- Programming (Python, Data Science, R)
- Graphic Design (Photoshop, Illustrator)
- Business & Management
- Data Science & Analytics

Key information:
- All courses have lifetime access
- 30-day money-back guarantee
- Prices range from $39.99 to $64.99
- Courses include certificates of completion
- We accept PayPal payments
- Courses are self-paced with video lessons

Your role:
- Help users find the right courses for their goals
- Answer questions about pricing, features, and platform
- Provide course recommendations based on user interests
- Be friendly, helpful, and concise
- If you don't know something specific, be honest and suggest contacting support

Keep responses conversational and under 3-4 sentences unless more detail is specifically requested.`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Previous conversation:\n${conversationContext}\n\nCurrent message: ${message}` },
      ],
      temperature: 0.7,
      maxTokens: 300,
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
