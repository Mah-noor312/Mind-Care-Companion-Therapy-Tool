// index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log("✅ Loaded OpenRouter API Key:", process.env.OPENROUTER_API_KEY);

const app = express(); 
const PORT = process.env.PORT || 5001; // Changed to 5001 to avoid conflict with Python

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); 

// ✅ Fixed Keywords - removed spaces and made more comprehensive
const mentalHealthKeywords = [ 
  "greeting", "hello", "hi", "hey", "howdy", "dude",
  "good morning", "good afternoon", "good evening", "good night", 
  "mental", "stress", "anxious", "anxiety", "depress", "depression", 
  "sad", "angry", "anger", "panic", "emotion", "feel", "feeling", 
  "lonely", "loneliness", "sleep", "insomnia", "trauma", "overwhelmed",
  "therapy", "therapist", "calm", "tired", "worry", "fear", "self-harm", 
  "mood", "support", "not okay", "not ok", "burnout", "relax", "rest", 
  "cry", "crying", "unwell", "hopeless", "negative", "thoughts", 
  "counseling", "counselor", "frustrated", "help"
];

// Function to check with Python chatbot first
async function checkPythonChatbot(message) {
  try {
    const response = await axios.post('http://localhost:5000/chat', { // Assuming Python server runs on port 5000
      message: message, // User message
      is_typing: false 
    }, {
      timeout: 5000 // 5 second timeout
    });
    
    // Check if the response is not the default/fallback response
    const botResponse = response.data.response;
    const intentTag = response.data.intent_tag; 
    
    // If it's not a default/error response, return it
    if (intentTag && !['default', 'error'].includes(intentTag)) {
      return {
        source: 'python',
        response: botResponse,
        follow_ups: response.data.follow_ups || [],
        intent_tag: intentTag
      };
    }
    
    return null;
  } catch (error) {
    console.error("❌ Python chatbot error:", error.message);
    return null;
  }
}
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message.trim();

    // Count words
    const wordCount = userMessage.split(/\s+/).length;

    // ✅ If short (5 words or less) -> try Python (intents.json)
    if (wordCount <= 5) {
      const pythonResponse = await axios.post("http://127.0.0.1:5000/chat", {
  message: userMessage
      });

      const pyData = pythonResponse.data;

      // If Python returns ANY proper response -> use it
if (pyData.response && pyData.intent_tag !== "error") {
    return res.json({
        botResponse: pyData.response,
        follow_ups: pyData.follow_ups || [],
        intent_tag: pyData.intent_tag || "none"
    });
}

    }

    // 👉 Otherwise (long/complex) -> use API
    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful mental health assistant." },
          { role: "user", content: userMessage }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    return res.json({ botResponse: aiResponse.data.choices[0].message.content.trim() });

  } catch (err) {
    console.error("❌ Chat handling error:", err.message);
    return res.json({ botResponse: "🚫 Sorry, something went wrong. Please try again later." });
  }
});



// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Node.js server is running' });
});

app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `✅ Node.js server is running at http://localhost:${PORT}`);
});