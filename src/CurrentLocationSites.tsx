import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Linking } from "react-native";
import Geolocation from '@react-native-community/geolocation';

// Define the type for the places, including an optional rating
interface Place {
  name: string;
  imageUrl: string;
  rating?: number; // Optional rating field
}

export const CurrentLocationSites: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });

  // Function to get current location using Geolocation
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude }); // Set current location as the origin
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  // Function to fetch sightseeing places based on current location
const fetchCurrentLocationSites = async () => {
  setLoading(true);
  try {
    const { latitude, longitude } = currentLocation;
    console.log("Sending coordinates:", latitude, longitude); // Log the coordinates

    if (latitude && longitude) {
      // 1) Log that we're about to make the request
      console.log(`Making request to /places with coords lat=${latitude}, lng=${longitude}`);

      const response = await fetch(`http://localhost:3000/places?latitude=${latitude}&longitude=${longitude}`);

      // 2) Log the HTTP status and any headers (optional but helpful)
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // 3) Parse the JSON
      const data = await response.json();

      // 4) Log the data we received
      console.log("Fetched places data:", data);

      if (Array.isArray(data.places) && data.places.length > 0) {
        const imagePromises = data.places.map(async (place: string) => {
          console.log(`Fetching images for place: ${place}`);

          const imageResponse = await fetch(
            `http://localhost:3000/getImages?places=${encodeURIComponent(place)}`
          );

          // Log image response status
          console.log("Image response status:", imageResponse.status);

          const imageData = await imageResponse.json();
          console.log("Image data for place:", place, imageData);

          return {
            name: place,
            imageUrl: imageData.images[place][0],
            rating: Math.random() * (5 - 3) + 3, // Random rating between 3 and 5
          };
        });

        const placesWithImages = await Promise.all(imagePromises);
        setPlaces(placesWithImages);
      } else {
        console.error("No places found or invalid format:", data);
        setPlaces([]);
      }
    } else {
      console.error("Invalid coordinates:", latitude, longitude);
      setPlaces([]);
    }
  } catch (error) {
    // 5) Log the full error object
    console.error("Error fetching places or images:", error);
  } finally {
    setLoading(false);
  }
};

  
  // Fetch places when the component mounts or when currentLocation changes
  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation.latitude !== 0 && currentLocation.longitude !== 0) {
      fetchCurrentLocationSites();
    }
  }, [currentLocation]);

  // Handle clicking on a place and open it in Google Maps
  const handlePressPlace = (placeName: string) => {
    const encodedOrigin = `${currentLocation.latitude},${currentLocation.longitude}`;
    const encodedDestination = encodeURIComponent(placeName);
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}`;
    Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text style={styles.title}>Sites to Visit</Text>
          <FlatList
            data={places}
            horizontal={true}  // This makes the list horizontal
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePressPlace(item.name)} style={styles.card}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <Text style={styles.placeName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => `${item.name}-${index}`}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    width: 160,  // Set width of each card
    height: 210, // Set a fixed height for the card to make it consistent
    backgroundColor: "#fff",  // Add a background color for better card visibility
    borderRadius: 10,  // Rounded corners
    elevation: 5,  // Add shadow for better separation
    margin: 5,
  },
  image: {
    width: 160,  // Image width
    height: 150,  // Image height
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "center",  // Center the image horizontally
  },
  placeName: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    maxWidth: 150,  // Ensure the text does not overflow
    overflow: "hidden",  // Hide overflowing text
  },
  rating: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});
