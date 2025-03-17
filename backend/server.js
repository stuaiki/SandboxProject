require('dotenv').config({ path: '/Users/rental/Desktop/Sandbox/TripApp/.env' });
const express = require("express");
const { OpenAI } = require("openai");
const { google } = require("googleapis");
const { Client } = require("@googlemaps/google-maps-services-js");

const app = express();
const port = 3000;

const openAIAPIKey = process.env.OPENAI_API_KEY;
const googleAPIKey = process.env.GOOGLE_API_KEY;
const CSE_ID = process.env.CSE_ID;

const client = new OpenAI({ apiKey: openAIAPIKey });
const clientMaps = new Client({});

app.use(express.json());

async function getRestaurantDetails(placeId) {
  try {
    const response = await clientMaps.placeDetails({
      params: {
        place_id: placeId,
        key: googleAPIKey,
      },
      timeout: 10000,
    });

    const details = response.data.result;

    // Extract photos if available
    // let photoUrl = null;
    // if (details.photos && details.photos.length > 0) {
    //   const photoReference = details.photos[0].photo_reference;
    //   // You can adjust this URL to the correct size/quality as needed
    //   photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleAPIKey}`;
    // }

    return {
      name: details.name,
      address: details.formatted_address,
      phoneNumber: details.formatted_phone_number,
      website: details.website,
      hours: details.opening_hours,
      priceLevel: details.price_level,
      imageUrl: photoUrl,  // Add image URL for the place
    };
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    return {};
  }
}


app.get("/restaurantDetails", async (req, res) => {
  const { placeId } = req.query;
  if (!placeId) {
    return res.status(400).json({ error: "Place ID is required" });
  }

  try {
    const details = await getRestaurantDetails(placeId);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: "Error fetching restaurant details" });
  }
});

async function getPlacesByCoordinates(latitude, longitude) {
  try {
    const response = await clientMaps.placesNearby({
      params: {
        location: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        radius: 30000, // 30 km radius
        key: googleAPIKey,
      },
      timeout: 10000,
    });

    // Ensure the response includes `placeId` for each place
    return response.data.results.map((place) => ({
      name: place.name,        // Name of the place
      placeId: place.place_id, // placeId for each place
    }));
  } catch (error) {
    console.error("Error fetching places by coordinates:", error.response?.data || error.message || error);
    return [];
  }
}


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

app.get("/places", async (req, res) => {
  const { address, latitude, longitude } = req.query;

  if (latitude && longitude) {
    try {
      const places = await getPlacesByCoordinates(latitude, longitude);
      console.log("Backend Places Response:", places);  // Log the backend response for places
      res.json({ places });
    } catch (error) {
      console.error("Error fetching places by coordinates:", error);
      res.status(500).json({ error: "Error fetching places by coordinates" });
    }
  } else if (address) {
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
      const places = messageContent.split("\n").map((place) => place.trim()).filter(Boolean);

      // Modify the places array to return objects with both name and placeId
      const placesWithIds = places.map(place => ({
        name: place,        // Add the name of the place
        placeId: `PLACE_ID_FOR_${place}`,  // This should be replaced with a real placeId fetching mechanism
      }));

      console.log("Backend Places with IDs:", placesWithIds);
      res.json({ places: placesWithIds });
    } catch (error) {
      console.error("Error fetching places by address:", error);
      res.status(500).json({ error: "Error fetching places by address" });
    }
  } else {
    return res.status(400).json({ error: "Address or coordinates are required" });
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
