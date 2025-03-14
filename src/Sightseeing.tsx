import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Linking } from "react-native";

// Define the type for the places, including an optional rating
interface Place {
  name: string;
  imageUrl: string;
  rating?: number; // Optional rating field
}

export const SightseeingList: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  const address = "646 Wymount Terrace, Provo UT"; // Hardcoded address for testing

  // Fetch sightseeing places from the backend
  const fetchSightseeingPlaces = async (address: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/places?address=${address}`);
      const data = await response.json();
      console.log("Places fetched:", data.places); // Log the places returned from the backend

      // Fetch images and optionally ratings for the places
      const imagePromises = data.places.map(async (place: string) => {
        const imageResponse = await fetch(`http://localhost:3000/getImages?places=${encodeURIComponent(place)}`);
        const imageData = await imageResponse.json();
        return { 
          name: place, 
          imageUrl: imageData.images[place][0],  // Get the first image for each place
          rating: Math.random() * (5 - 3) + 3 // Random rating between 3 and 5 for demo purposes
        }; 
      });

      // Wait for all image promises to resolve
      const placesWithImages = await Promise.all(imagePromises);

      setPlaces(placesWithImages);
    } catch (error) {
      console.error("Error fetching places or images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch places when the component mounts
  useEffect(() => {
    fetchSightseeingPlaces(address);
  }, []);

  // Handle clicking on a place and open it in Google Maps
  const handlePressPlace = (placeName: string) => {
    const encodedOrigin = encodeURIComponent(address);
    const encodedDestination = encodeURIComponent(placeName);
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}`;
    Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={places}
          horizontal={true}  // This makes the list horizontal
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePressPlace(item.name)} style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.placeName}>{item.name}</Text>
              {item.rating && <Text style={styles.rating}>Rating: {item.rating.toFixed(1)}</Text>} 
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `${item.name}-${index}`}
        />
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
    width: 180,  // Set width of each card
    height: 250, // Set a fixed height for the card to make it consistent
    justifyContent: "center",
    backgroundColor: "#fff",  // Add a background color for better card visibility
    borderRadius: 10,  // Rounded corners
    elevation: 5,  // Add shadow for better separation
  },
  image: {
    width: 150,  // Image width
    height: 150,  // Image height
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "center",  // Center the image horizontally
  },
  placeName: {
    fontSize: 13,
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
