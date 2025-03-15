require('dotenv').config({ path: '/Users/rental/Desktop/Sandbox/TripApp/.env' });  // Explicit path
const express = require("express");
const { OpenAI } = require("openai"); // Import OpenAI client
const { google } = require("googleapis");
const app = express();
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

// Function to fetch places based on latitude and longitude (current location)
async function getPlacesByCoordinates(latitude, longitude) {
  const places = google.maps.places('v1'); // Using Google Places API
  try {
    const response = await places.textSearch({
      key: googleAPIKey,
      location: `${latitude},${longitude}`,
      radius: 5000, // Adjust the radius as needed (e.g., 5000 meters = 5 km)
    });
    return response.data.results.map(place => place.name);
  } catch (error) {
    console.error("Error fetching places by coordinates:", error);
    return [];
  }
}

// Route to get sightseeing places based on current location (latitude and longitude) or address
app.get("/places", async (req, res) => {
  const { address, latitude, longitude } = req.query;

  if (latitude && longitude) {
    // Handle coordinates
  } else if (address) {
    // Handle address
  } else {
    return res.status(400).json({ error: "Address or coordinates are required" });
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
