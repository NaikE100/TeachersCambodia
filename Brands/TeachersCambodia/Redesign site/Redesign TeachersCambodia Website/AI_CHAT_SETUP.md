# AI Chat Widget Setup Guide

The chat widget has been upgraded to use AI-powered responses with intelligent fallback.

## Features

- **AI-Powered Responses**: Uses OpenAI or compatible API for natural conversations
- **Smart Fallback**: Enhanced keyword matching when AI is unavailable
- **Context Awareness**: Maintains conversation history for better responses
- **Multi-Industry Support**: Handles questions about all career sectors
- **Updated Information**: Includes current pricing (R500, R1,299, R2,499)

## Configuration

### Option 1: Using Environment Variables (Recommended)

Create a `.env` file in the root of the project:

```env
# Enable/disable AI chat (default: true if endpoint is set)
VITE_AI_ENABLED=true

# Your AI API endpoint URL
# This should be a backend endpoint that handles OpenAI API calls securely
VITE_AI_API_ENDPOINT=https://your-backend.com/api/chat
```

### Option 2: Backend API Endpoint Format

Your backend API should accept POST requests with this format:

**Request:**
```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant..."
    },
    {
      "role": "user",
      "content": "What are your prices?"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 500
}
```

**Response (Option A):**
```json
{
  "response": "Our pricing starts at R500 for CV Review..."
}
```

**Response (Option B - OpenAI format):**
```json
{
  "choices": [
    {
      "message": {
        "content": "Our pricing starts at R500..."
      }
    }
  ]
}
```

## Backend Implementation Example

If you need to create a backend endpoint, here's a Node.js/Express example:

```javascript
import express from 'express';
import OpenAI from 'openai';

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, temperature = 0.7, max_tokens = 500 } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: temperature,
      max_tokens: max_tokens,
    });
    
    res.json({
      response: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('AI API error:', error);
    res.status(500).json({ error: 'AI service unavailable' });
  }
});
```

## Fallback Mode

If no AI API endpoint is configured or if the API is unavailable, the widget automatically uses:
- Enhanced keyword matching
- Context-aware responses
- Updated pricing information
- Multi-industry support

## Testing

1. **Without AI Endpoint**: The widget works immediately with enhanced fallback responses
2. **With AI Endpoint**: Set `VITE_AI_API_ENDPOINT` and the widget will use AI for more natural conversations

## Current Features

✅ AI-powered conversational responses
✅ Context-aware conversations (remembers previous messages)
✅ Enhanced fallback responses
✅ Updated pricing (R500, R1,299, R2,499)
✅ Multi-industry support
✅ Professional, helpful tone
✅ Error handling with graceful fallback

## Security Notes

- **Never expose OpenAI API keys in client-side code**
- Always use a backend proxy for API calls
- Implement rate limiting on your backend
- Consider authentication for production use
