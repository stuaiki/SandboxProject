import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Linking } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface Place {
  name: string;
  imageUrl: string;
  rating?: number;  // Optional rating field
  placeId: string;
}

export const SightseeingList: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const address = "646 Wymount Terrace, Provo UT"; // Hardcoded address for testing

  // Fetch sightseeing places from the backend
  const fetchSightseeingPlaces = async (address: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/places?address=${address}`);
      const data = await response.json();
      console.log("Places fetched:", data.places);  // Log the structure of the data
  
      // Ensure that data.places is an array of objects of type Place
    if (Array.isArray(data.places)) {
      // Explicitly define the type for 'place' and 'index'
      data.places.forEach((place: Place, index: number) => {
        console.log(`Place at index ${index}:`, place);  // Log each place to inspect
      });
    }
  
      // Fetch images and optionally ratings for the places
      const imagePromises = data.places.map(async (place: any) => {
        console.log("Place object in map:", place);  // Log the actual object here
  
        const imageResponse = await fetch(`http://localhost:3000/getImages?places=${encodeURIComponent(place.name)}`);
        const imageData = await imageResponse.json();
        return { 
          name: place.name, 
          imageUrl: imageData.images[place.name][0],  // Get the first image for each place
          rating: Math.random() * (5 - 3) + 3, // Random rating between 3 and 5 for demo purposes
          placeId: place.placeId,  // Ensure you have placeId here
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

  // Navigate to the restaurant detail page
  const handlePressPlace = (place: Place) => {
    console.log("Navigating with placeId:", place.placeId);  // Log placeId to check if it's available
    navigation.navigate('DetailScreen', {
      name: place.name,
      imageUrl: place.imageUrl,
      rating: place.rating,
      placeId: place.placeId,
    });
  };


  // // Handle clicking on a place and open it in Google Maps
  // const handlePressPlace = (placeName: string) => {
  //   const encodedOrigin = encodeURIComponent(address);
  //   const encodedDestination = encodeURIComponent(placeName);
  //   const url = `https://www.google.com/maps/dir/?api=1&origin=${encodedOrigin}&destination=${encodedDestination}`;
  //   Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
  // };

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
                <TouchableOpacity onPress={() => handlePressPlace(item)} style={styles.card}>
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
    width: 150,  // Set width of each card
    height: 210, // Set a fixed height for the card to make it consistent
    backgroundColor: "#fff",  // Add a background color for better card visibility
    borderRadius: 10,  // Rounded corners
    elevation: 5,  // Add shadow for better separation
    margin: 5,
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
