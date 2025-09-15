import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { title, description, modules } = await request.json()

    const prompt = `Create a comprehensive learning specification document for: ${title}

Description: ${description}

Modules:
${modules.map((module, index) => `
Module ${index + 1}: ${module.title}
- Duration: ${module.duration}
- Difficulty: ${module.difficulty}
- Description: ${module.description}
- Objectives: ${module.objectives.join(', ')}
`).join('')}

Generate a detailed markdown specification that includes:
1. Overview and learning outcomes
2. Detailed module breakdown with activities
3. Assessment criteria
4. Prerequisites and resources
5. Timeline and milestones
6. Success metrics

Make it professional, comprehensive, and suitable for educational use.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an educational curriculum designer who creates detailed learning specifications. Your specs are used by educators and learning platforms to deliver structured courses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    })

    const spec = completion.choices[0]?.message?.content || "Failed to generate specification."

    return NextResponse.json({ spec })
  } catch (error) {
    console.error('Spec generation API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate specification' },
      { status: 500 }
    )
  }
}