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
  // Set prompt to ask OpenAI to generate a list of places with names, city, state, and country.
  let prompt;
  if (type === "restaurant") {
    prompt = `List 5 popular restaurants near ${address}. It should be specific restaurant names, but not the name of streets, hotels, stores, or unrelated places with restaurants. Provide each place's name, city, state, and country. Return the list in this format: "Name of the Place - City, State, Country".`;
  } else if (type === "tourist_attraction") {
    prompt = `List 5 popular tourist attractions such as sightseeing locations, natures, traditional building, or activities (ex.zoo, amusement park) near ${address}. Provide each place's name, city, state, and country. Return the list in this format: "Name of the Place - City, State, Country".`;
  } else {
    prompt = `List 5 popular places near ${address}. Provide each place's name, city, state, and country. Return the list in this format: "Name of the Place - City, State, Country".`;
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an assistant that helps users find popular places." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.4,
    });

    const messageContent = completion.choices[0].message.content.trim();
    console.log("OpenAI response:", messageContent);

    // Parse the AI response, which should now include name, city, state, and country
    const places = messageContent
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        // Remove leading numbers and dots (e.g., "1.", "2.")
        const cleanedLine = line.replace(/^\d+\.\s*/, '').trim();

        const [placeName, location] = cleanedLine.split(" - ");
        const locationParts = location.split(", ");
        
        // Handle cases where location might not have all parts
        const name = placeName.trim();
        const city = locationParts.length > 0 ? locationParts[0] : "Unknown";
        const state = locationParts.length > 1 ? locationParts[1] : "Unknown";
        const country = locationParts.length > 2 ? locationParts[2] : "Unknown";

        // Return the object with improved parsing
        return {
          name,
          city,
          state,
          country,
          placeId: `PLACE_ID_FOR_${placeName.replace(/\s+/g, "_")}`, // Placeholder for placeId
          type, // Keep the type passed
          address: location, // Include location in address format (e.g., "City, State, Country")
        };
      });

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
async function getImageUrls(query, type) {
  const customsearch = google.customsearch('v1');
  
  // Modify the query based on the type of place
  const searchQuery = type === 'restaurant'
    ? `Popular food and dishes at ${query}` // Include "restaurant" in the search for restaurants
    : type === 'tourist_attraction'
      ? `Pictures of ${query}`  // Focus on views and landmarks without people
      : `${query} -people`; // For other types, use the query as is

  try {  
    const res = await customsearch.cse.list({
      q: searchQuery, // Use the modified query
      cx: CSE_ID,  // Custom Search Engine ID
      searchType: 'image',
      auth: googleAPIKey,
    });

    const imageUrls = [];
    if (res.data.items) {
      res.data.items.forEach((item) => {
        imageUrls.push(item.link);  // Store the image URLs
      });
    }

    // Fallback if no images are found
    if (imageUrls.length === 0) {
      imageUrls.push('https://via.placeholder.com/150'); // Default placeholder image if no results
    }

    return imageUrls;  // Return the array of image URLs
  } catch (error) {
    console.error("Error fetching images:", error);
    // Return a fallback image in case of error
    return ['https://via.placeholder.com/150'];
  }
}



app.post('/generateDescription', async (req, res) => {
  const { placeName, type } = req.body; // Accept placeName and type

  try {
    const prompt = `Generate a short, engaging description for "${placeName}" that is a ${type}. Keep it concise, inviting, and relevant to the type of restaurant.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4', // Specify GPT-4
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that generates short and attractive ${type} descriptions based on the restaurant type.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 50, // Shorter description
      temperature: 0.7,
    });

    const description = completion.choices[0].message.content.trim();
    res.json({ description });
  } catch (error) {
    console.error("Error generating description:", error);
    res.status(500).send('Error generating description');
  }
});


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

// Function to get an image URL from Google Custom Search using full address
async function getCityImage(address, country, state,  city) {
  const customsearch = google.customsearch('v1');

  // Build the search query based on the provided address, country, state, and city
  let searchQuery = "beautiful scenery of";

  // Include city, state, and country if available
  if (city) {
    searchQuery += ` ${city}`;
  }
  if (state) {
    searchQuery += ` ${state}`;
  }
  if (country) {
    searchQuery += ` in ${country}`;
  }
  
  // If no specific city, state, or country is provided, use the full address
  if (!city && !state && !country) {
    searchQuery = `beautiful scenery of ${address}`;
  }

  try {
    const res = await customsearch.cse.list({
      q: searchQuery, // Use the full address to search for city view images
      cx: CSE_ID, // Custom Search Engine ID
      searchType: 'image',
      auth: googleAPIKey,
    });

    const imageUrls = [];
    if (res.data.items && res.data.items.length > 0) {
      // Push the image URL of the first image to the imageUrls array
      imageUrls.push(res.data.items[0].link);
    }

    // If no images were found, add a fallback image URL
    if (imageUrls.length === 0) {
      imageUrls.push("https://via.placeholder.com/150");
    }

    // Return the first image URL (either from search or fallback)
    return imageUrls[0];
  } catch (error) {
    console.error("Error fetching city view image:", error);
    // Return the fallback image in case of an error
    return "https://via.placeholder.com/150";
  }
}


// New API route to fetch city image based on full address
app.get("/cityImage", async (req, res) => {
  const { address, country, state, city } = req.query;

  console.log("Received parameters:");
  console.log("Address:", address);  // Logs the received address
  console.log("Country:", country);  // Logs the received country (could be undefined)
  console.log("State:", state);      // Logs the received state (could be undefined)
  console.log("City:", city);        // Logs the received city (could be undefined)

  // Check if address is present
  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    // Call the getCityImage function with available parameters
    const cityImageUrl = await getCityImage(address, country, state, city);
    console.log("Fetched City Image URL:", cityImageUrl);
    res.json({ imageUrl: cityImageUrl });
  } catch (error) {
    console.error("Error fetching city image:", error);
    res.status(500).json({ error: "Failed to fetch city image" });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
