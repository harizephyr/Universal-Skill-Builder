import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const { skill, projectType } = await request.json()

    const prompt = `Generate a comprehensive ${projectType} workflow for learning: ${skill}

Please provide a detailed JSON response with the following structure:
{
  "title": "Project title",
  "description": "Project description",
  "structure": [
    {
      "type": "folder|file",
      "name": "filename",
      "description": "purpose",
      "children": [] // for folders only
    }
  ],
  "tasks": [
    {
      "id": number,
      "title": "task description",
      "completed": false,
      "difficulty": "Easy|Medium|Hard"
    }
  ],
  "commands": ["command1", "command2"]
}

Make it practical, educational, and appropriate for the skill level. Include 5-7 progressive tasks and relevant setup commands.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a project architect who creates structured learning workflows. Always respond with valid JSON that matches the requested format exactly."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    let workflow
    try {
      workflow = JSON.parse(completion.choices[0]?.message?.content || '{}')
    } catch (parseError) {
      // Fallback if JSON parsing fails
      workflow = {
        title: `${skill} - ${projectType} Project`,
        description: `A comprehensive ${projectType} project to master ${skill}`,
        structure: [
          { type: 'folder', name: 'src', children: [
            { type: 'file', name: 'index.js', description: 'Main application file' }
          ]},
          { type: 'file', name: 'README.md', description: 'Project documentation' }
        ],
        tasks: [
          { id: 1, title: 'Set up project structure', completed: false, difficulty: 'Easy' },
          { id: 2, title: 'Implement core functionality', completed: false, difficulty: 'Medium' }
        ],
        commands: ['npm init -y', 'npm start']
      }
    }

    return NextResponse.json({ workflow })
  } catch (error) {
    console.error('Workflow generation API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate workflow' },
      { status: 500 }
    )
  }
}