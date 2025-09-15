---
inclusion: fileMatch
fileMatchPattern: 'app/api/**/*.ts'
---

# AI Prompting Guidelines for Universal Skill Translator

## OpenAI Integration Best Practices

### Prompt Engineering Standards
- Use clear, specific instructions with structured formats
- Include examples and expected output formats
- Set appropriate temperature (0.7 for creative content, 0.3 for structured data)
- Implement token limits based on content type (1500 for translations, 1000 for workflows)

### Content Generation Prompts
- Always specify target audience and skill level
- Include cultural context requirements
- Request structured outputs (JSON, Markdown) when needed
- Add fallback instructions for edge cases

### Error Handling
- Validate all AI responses before sending to frontend
- Implement graceful fallbacks for API failures
- Log errors for monitoring and improvement
- Provide meaningful error messages to users

### Performance Optimization
- Cache frequently requested content
- Implement request debouncing for user inputs
- Use streaming responses for long content generation
- Monitor token usage and costs

### Quality Assurance
- Test prompts with various input types
- Validate cultural sensitivity of generated content
- Ensure educational value and accuracy
- Implement content moderation checks

### Example Prompt Structure
```
You are a [role/expertise].
Task: [specific task description]
Context: [relevant context and constraints]
Format: [expected output format]
Requirements: [specific requirements and guidelines]
Examples: [if applicable]
```