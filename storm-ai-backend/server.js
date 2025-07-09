const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001; // Backend server port

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Placeholder for API key if you integrate a real AI service
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.get('/', (req, res) => {
  res.send('Storm AI Backend is running!');
});

// API endpoint for content generation
app.post('/api/generate', async (req, res) => {
  const { topic, keywords } = req.body;

  console.log('Received request for content generation:');
  console.log('Topic:', topic);
  console.log('Keywords:', keywords);

  if (!topic || typeof topic !== 'string' || topic.trim() === '') {
    return res.status(400).json({ error: 'Topic is required and must be a non-empty string.' });
  }

  if (keywords && typeof keywords !== 'string') {
    return res.status(400).json({ error: 'Keywords must be a string if provided.' });
  }

  try {
    // Simulate AI content generation (placeholder)
    // In a real application, you would call an AI service here.
    // For example, using OpenAI:
    /*
    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key not configured.');
      return res.status(500).json({ error: 'AI service not configured on the server.' });
    }
    // const response = await axios.post('https://api.openai.com/v1/completions', {
    //   model: "text-davinci-003", // Or a newer model
    //   prompt: `Generate content about "${topic}" with keywords: "${keywords}".`,
    //   max_tokens: 500,
    // }, {
    //   headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` }
    // });
    // const generatedText = response.data.choices[0].text;
    */

    // Placeholder generation logic:
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    let generatedText = `This is AI-generated placeholder content for the topic: "${topic}".`;
    if (keywords && keywords.trim() !== '') {
      generatedText += `\nRelevant keywords provided were: "${keywords}".`;
    }
    generatedText += `\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec sollicitudin molestie malesuada.`;

    console.log('Sending generated content to client.');
    res.json({ content: generatedText });

  } catch (error) {
    console.error('Error generating content:', error.message);
    // if (error.response) {
    //   console.error('Error details:', error.response.data);
    // }
    res.status(500).json({ error: 'Failed to generate content due to an internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
