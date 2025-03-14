import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Linking } from "react-native";

// Define the type for the places
interface Place {
  name: string;
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

      // Ensure that data.places is an array of strings
      if (Array.isArray(data.places)) {
        setPlaces(data.places.map((place: string) => ({ name: place })));
      } else {
        console.error("Invalid data format: ", data);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
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
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePressPlace(item.name)}>
              <Text>{item.name}</Text>
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
    flex: 1,
    paddingTop: 20,
  },
});
