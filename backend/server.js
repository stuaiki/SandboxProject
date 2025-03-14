require('dotenv').config({ path: '/Users/rental/Desktop/Sandbox/TripApp/.env' });  // Explicit path
const express = require("express");
const { OpenAI } = require("openai"); // Import OpenAI client
const app = express();
const port = 3000;

console.log('DEBUG: All Environment Variables:', process.env);  // Print all loaded env variables
console.log('DEBUG: OpenAI API Key:', process.env.OPENAI_API_KEY);

const openAIAPIKey = process.env.OPENAI_API_KEY;
// const googleAPIKey = "YOUR_GOOGLE_API_KEY"; // Commented out for now

// Define OpenAI client with your API key
const client = new OpenAI({
  apiKey: openAIAPIKey,
});

// Middleware to parse JSON requests
app.use(express.json());

// Route to get sightseeing places
app.get("/places", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `List 25 popular sightseeing places near ${address}. Only provide place names, each on a new line.`,
        },
      ],
    });

    const messageContent = completion.choices[0].message.content.trim();
    console.log("OpenAI raw response:", messageContent);

    const places = messageContent.split("\n").map((place) => place.trim()).filter(Boolean);
    console.log("Parsed places:", places);

    res.json({ places });
  } catch (error) {
    console.error("Error fetching sightseeing places:", error);
    res.status(500).json({ error: "Error fetching sightseeing places" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
