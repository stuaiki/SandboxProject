require('dotenv').config({ path: '/Users/rental/Desktop/Sandbox/TripApp/.env' });  // Explicit path
const express = require("express");
const { OpenAI } = require("openai"); // Import OpenAI client
const app = express();
const { google } = require("googleapis");
const port = 3000;

const openAIAPIKey = process.env.OPENAI_API_KEY;
const googleAPIKey = process.env.GOOGLE_API_KEY;
const CSE_ID = process.env.CSE_ID;

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
          content: `List 25 popular sightseeing places near ${address}. Only provide place names, each on a new line. Do not put number in front of name`,
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

// Function to get image URLs from Google Custom Search
async function getImageUrls(query) {
  const customsearch = google.customsearch('v1');

  try {
    const res = await customsearch.cse.list({
      q: query,
      cx: CSE_ID, // Use the Custom Search Engine ID
      searchType: 'image', // Set search type to 'image' to get images
      auth: googleAPIKey, // Use Google API Key
    });

    const imageUrls = [];
    if (res.data.items) {
      res.data.items.forEach((item) => {
        imageUrls.push(item.link); // Add image URL to the array
      });
    }
    return imageUrls;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

// Route to get images for sightseeing places
app.get("/getImages", async (req, res) => {
  const { places } = req.query;

  if (!places) {
    return res.status(400).json({ error: "Places are required" });
  }

  const placesArray = places.split(","); // Assuming places are passed as comma-separated values

  try {
    const images = {};
    for (let place of placesArray) {
      const imageUrls = await getImageUrls(place.trim());
      images[place.trim()] = imageUrls; // Store image URLs for each place
    }
    res.json({ images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});