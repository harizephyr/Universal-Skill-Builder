import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { skill, language, level } = await request.json()

    const prompt = `You are a Universal Skill Translator. Translate the following skill learning request into a comprehensive, culturally-adapted lesson in ${language} for a ${level} learner.

Skill to learn: ${skill}
Target language: ${language}
Learner level: ${level}

Please provide:
1. A clear introduction to the skill in ${language}
2. Step-by-step learning approach appropriate for ${level} level
3. Cultural context and examples relevant to ${language} speakers
4. Practical exercises or examples
5. Key terminology with translations
6. Next steps for continued learning

Make it engaging, practical, and culturally relevant. Use simple language for beginners, more technical terms for advanced learners.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert educator and translator who specializes in making technical skills accessible across languages and cultures. You adapt teaching methods to different learning styles and cultural contexts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    })

    const translation = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a translation at this time."

    return NextResponse.json({ translation })
  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json(
      { error: 'Failed to translate skill' },
      { status: 500 }
    )
  }
}