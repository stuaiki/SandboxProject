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

const cors = require('cors');
app.use(cors());
app.use(express.json());

// Function to get the geocode (latitude, longitude) for a given address
async function getGeocode(address) {
  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: address,
        key: googleAPIKey,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
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

// Fetch places using the Google Places API based on coordinates
async function getPlaces(address, type) {
  const { lat, lng } = await getGeocode(address);

  try {
    const response = await clientMaps.placesNearby({
      params: {
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        radius: 30000, // 30 km radius
        type: type, // Type can be 'restaurant' or 'tourist_attraction'
        key: googleAPIKey,
      },
      timeout: 10000,
    });

    return response.data.results.map((place) => ({
      name: place.name,        // Name of the place
      placeId: place.place_id, // placeId for each place
      address: place.vicinity || 'Address not available', // Fallback to 'Address not available'
    }));
  } catch (error) {
    console.error("Error fetching places from Nearby Search API:", error.response ? error.response.data : error);
    throw error;
  }
}

// Endpoint to get places (restaurant or tourist attraction) by address
app.get("/places", async (req, res) => {
  const { address, type } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  if (!type) {
    return res.status(400).json({ error: "Type (restaurant or tourist_attraction) is required" });
  }

  try {
    const places = await getPlaces(address, type);
    if (!places || places.length === 0) {
      return res.status(404).json({ error: "No places found" });
    }

    // Enrich the places with type information and ensure proper response
    const enrichedPlaces = places.map((place) => ({
      name: place.name || 'Unnamed Place',
      address: place.address || 'Address not available',
      placeId: place.placeId || 'Unknown Place ID',
      type: type, // Include the type (restaurant or tourist_attraction)
    }));

    res.json({ places: enrichedPlaces });
  } catch (error) {
    console.error("Error fetching places by address:", error);
    res.status(500).json({ error: "Error fetching places" });
  }
});

// Function to get image URLs using Google Custom Search
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

// Endpoint to get images for places
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
