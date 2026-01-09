
require('dotenv').config(); // load .env first

const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get('/health', (req, res) => {
  res.send('Server is running');
});

app.post('/api/generate', async (req, res) => {
  try {
    const { userText } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',   // valid Gemini model
      contents: [
        {
          parts: [
            { text: userText }
          ]
        }
      ]
    });

    // the text the model generated
    const text = response.text;
    res.json({ text });

  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
