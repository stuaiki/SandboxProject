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
        radius: 30000, 
        type,
        key: googleAPIKey,
      },
      timeout: 10000,
    });

    console.log("Places API response (coordinates):", response.data);
    return response.data.results.map((place) => ({
      name: place.name,
      placeId: place.place_id,
      address: place.vicinity || 'Address not available',
      type, 
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
    prompt = `List 10 popular restaurants near ${address}. It should be specific restaurant names, but not the name of streets, hotels, stores, or unrelated places with restaurants. Provide each place's name, city, state, and country. Return the list in this format: "Name of the Place - City, State, Country".`;
  } else if (type === "tourist_attraction") {
    // Updated prompt: focus on experiences, activities, and the feeling of the location
    prompt = `List 10 must-visit attractions or experiences near ${address} that capture the unique vibe, culture, and activities of the area. Focus on things like scenic viewpoints, cultural landmarks, outdoor adventures, and local events rather than restaurant dining. Provide each place's name, city, state, and country in the following format: "Name of the Place - City, State, Country".`;
  } else {
    prompt = `List 10 popular places near ${address}. Provide each place's name, city, state, and country. Return the list in this format: "Name of the Place - City, State, Country".`;
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an assistant that helps users find popular places." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.3,
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
        
        const name = placeName.trim();
        const city = locationParts.length > 0 ? locationParts[0] : "Unknown";
        const state = locationParts.length > 1 ? locationParts[1] : "Unknown";
        const country = locationParts.length > 2 ? locationParts[2] : "Unknown";

        return {
          name,
          city,
          state,
          country,
          placeId: `PLACE_ID_FOR_${placeName.replace(/\s+/g, "_")}`,
          type, 
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
  
  const searchQuery = type === 'restaurant'
    ? `Popular food and dishes at ${query}`
    : type === 'tourist_attraction'
      ? `Pictures of ${query}` 
      : `${query} -people`;

  try {  
    const res = await customsearch.cse.list({
      q: searchQuery, 
      cx: CSE_ID, 
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
      imageUrls.push('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdDfOU2dKmC9TLY75CcD3a4PG0AjXnbaw2Jw&s'); // Default placeholder image if no results
    }

    return imageUrls;  // Return the array of image URLs
  } catch (error) {
    console.error("Error fetching images:", error);
    // Return a fallback image in case of error
    return ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdDfOU2dKmC9TLY75CcD3a4PG0AjXnbaw2Jw&s'];
  }
}



app.post('/generateDescription', async (req, res) => {
  const { placeName, type } = req.body;

  try {
    let systemMessage = '';
    let userPrompt = '';

    if (type === 'restaurant') {
      // For restaurants, allow references to food, ambiance, etc.
      systemMessage = `You are a helpful assistant that generates short and attractive restaurant descriptions. Focus on ambiance, signature dishes, and overall dining experience. End with a complete sentence.`;
      userPrompt = `Generate a short, engaging description for "${placeName}", which is a restaurant. Make it concise, inviting, and relevant to the type of restaurant. Ensure it ends with a complete sentence.`;
    } else if (type === 'tourist_attraction') {
      // For tourist attractions, avoid referencing food; focus on experience, scenery, or culture
      systemMessage = `You are a helpful assistant that generates short, engaging descriptions for tourist attractions. Focus on experiences, scenery, cultural highlights, and overall atmosphere. Avoid references to food or dining. End with a complete sentence.`;
      userPrompt = `Generate a short, engaging description for "${placeName}", which is a tourist attraction. Highlight its experience, scenery, or cultural significance. Avoid referencing food or dining. Ensure it ends with a complete sentence.`;
    } else {
      // Fallback for any other types
      systemMessage = `You are a helpful assistant that generates short, engaging descriptions for places. End with a complete sentence.`;
      userPrompt = `Generate a short, engaging description for "${placeName}". Keep it concise and ensure it ends with a complete sentence.`;
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 150,  
      temperature: 0.3,
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

async function getCityImage(address, country, state,  city) {
  const customsearch = google.customsearch('v1');

  let searchQuery = "beautiful scenery of";

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
      imageUrls.push("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdDfOU2dKmC9TLY75CcD3a4PG0AjXnbaw2Jw&s");
    }

    // Return the first image URL (either from search or fallback)
    return imageUrls[0];
  } catch (error) {
    console.error("Error fetching city view image:", error);
    // Return the fallback image in case of an error
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdDfOU2dKmC9TLY75CcD3a4PG0AjXnbaw2Jw&s";
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

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
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
