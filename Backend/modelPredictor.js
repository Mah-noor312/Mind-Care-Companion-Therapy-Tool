// getBotResponse.js

const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Make sure .env loads correctly

async function getBotResponse(userMessage) {
  console.log("📨 Received user message:", userMessage); // Debug log

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful and friendly mental health assistant." },
          { role: "user", content: userMessage }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // required by OpenRouter
          'X-Title': 'Aziz Mental Chatbot'         // optional
        }
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    console.log("🤖 ChatGPT Response:", reply);
    return reply;

  } catch (error) {
    console.error("❌ OpenRouter API error:", error.response?.data || error.message);
    return "Sorry, I'm having trouble responding right now. Please try again later.";
  }
}

module.exports = { getBotResponse };
