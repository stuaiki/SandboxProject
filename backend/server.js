require('dotenv').config({ path: '/Users/rental/Desktop/Sandbox/TripApp/.env' });
const express = require("express");
const { OpenAI } = require("openai");
const { google } = require("googleapis");
const { Client } = require("@googlemaps/google-maps-services-js");
const axios = require("axios");

const app = express();
const port = 3000;

const openAIAPIKey = process.env.OPENAI_API_KEY;
const googleAPIKey = process.env.GOOGLE_API_KEY;
const CSE_ID = process.env.CSE_ID;

// Instantiate the OpenAI and Google Maps clients.
const client = new OpenAI({ apiKey: openAIAPIKey });
const clientMaps = new Client({});

app.use(express.json());

// ----------------------
// Helper: Get geocode for an address
// ----------------------
async function getGeocode(address) {
  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address,
        key: googleAPIKey,
      },
    });
    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      console.log("Geocode location:", location);
      return location;
    } else {
      console.error("No results found for address:", address);
      throw new Error("No results found for address");
    }
  } catch (error) {
    console.error("Error geocoding address:", error);
    throw error;
  }
}

// ----------------------
// Function: Get places by coordinates using the new Places API
// ----------------------
async function getPlacesByCoordinates(latitude, longitude, type) {
  try {
    const response = await clientMaps.placesNearby({
      params: {
        location: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        radius: 30000, // 30 km radius
        type,         // For example, "restaurant" or "tourist_attraction"
        key: googleAPIKey,
      },
      timeout: 10000,
    });

    console.log("Places API response (coordinates):", response.data);
    return response.data.results.map((place) => ({
      name: place.name,
      placeId: place.place_id,
      address: place.vicinity || 'Address not available',
      type, // include the type as provided
    }));
  } catch (error) {
    console.error("Error fetching places by coordinates:", error.response?.data || error.message || error);
    throw error;
  }
}

// ----------------------
// Function: Use OpenAI to generate a list of places by address
// ----------------------
async function generatePlacesList(address, type) {
  // Set prompt based on type
  let prompt;
  if (type === "restaurant") {
    prompt = `List 30 popular restaurants near ${address}. Only provide place names, each on a new line. Do not include numbers or any extra text.`;
  } else if (type === "tourist_attraction") {
    prompt = `List 30 popular tourist attractions or popular places like mountains or other natures people often visit near ${address}. Only provide place names, each on a new line. Do not include numbers or any extra text.`;
  } else {
    prompt = `List 30 popular places near ${address}. Only provide place names, each on a new line.`;
  }
  
  try {
    console.log("Sending prompt to OpenAI:", prompt);
    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an assistant that helps users find popular places." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });
    const messageContent = completion.choices[0].message.content.trim();
    console.log("OpenAI response:", messageContent);

    // Split lines and create an array of objects with placeholder placeIds.
    const places = messageContent
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((name) => ({
        name,
        // Placeholder; you might later replace this with a real lookup for place IDs
        placeId: `PLACE_ID_FOR_${name.replace(/\s+/g, "_")}`,
        type,
        address: "Address not available", // Since OpenAI response doesn't include address details
      }));

    return places;
  } catch (error) {
    console.error("Error generating places list from OpenAI:", error);
    throw error;
  }
}

// ----------------------
// Endpoint: /places
// ----------------------
app.get("/places", async (req, res) => {
  const { address, latitude, longitude, type } = req.query;

  if (!type || (type !== "restaurant" && type !== "tourist_attraction")) {
    return res.status(400).json({ error: "Type must be either 'restaurant' or 'tourist_attraction'" });
  }

  if (latitude && longitude) {
    try {
      const places = await getPlacesByCoordinates(latitude, longitude, type);
      console.log("Backend Places (coordinates):", places);
      res.json({ places });
    } catch (error) {
      console.error("Error fetching places by coordinates:", error);
      res.status(500).json({ error: "Error fetching places by coordinates" });
    }
  } else if (address) {
    try {
      const places = await generatePlacesList(address, type);
      console.log("Backend Places (OpenAI):", places);
      res.json({ places });
    } catch (error) {
      console.error("Error fetching places by address:", error);
      res.status(500).json({ error: "Error fetching places by address" });
    }
  } else {
    return res.status(400).json({ error: "Either address or coordinates are required" });
  }
});

// ----------------------
// Endpoint: /getImages
// ----------------------
async function getImageUrls(query) {
  const customsearch = google.customsearch('v1');
  try {  
    const res = await customsearch.cse.list({
      q: query,
      cx: CSE_ID,
      searchType: 'image',
      auth: googleAPIKey,
    });
    const imageUrls = [];
    if (res.data.items) {
      res.data.items.forEach((item) => {
        imageUrls.push(item.link);
      });
    }
    return imageUrls;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

app.get("/getImages", async (req, res) => {
  const { places } = req.query;

  if (!places) {
    return res.status(400).json({ error: "Places are required" });
  }

  const placesArray = places.split(",");
  try {
    const images = {};
    for (let place of placesArray) {
      const imageUrls = await getImageUrls(place.trim());
      images[place.trim()] = imageUrls;
    }
    res.json({ images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
