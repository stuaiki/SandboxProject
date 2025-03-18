import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface Place {
  name: string;
  imageUrl: string;
  rating?: number;
  placeId: string;
  address?: string; // Add address if needed
}

export const PlacesList: React.FC = () => {
  const [places, setPlaces] = useState<{ title: string, data: Place[] }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const address = "646 Wymount Terrace, Provo UT"; // Hardcoded address for testing

  // Fetch places based on the type (restaurants or sightseeing)
  const fetchPlaces = useCallback(async (address: string) => {
    setLoading(true);
    setError(null); // Reset error state before making the request
    try {
      const categories = [
        { title: "Places to Eat", type: "restaurant" },
        { title: "Places to Visit", type: "tourist_attraction" },
      ];
  
      const placesData = await Promise.all(
        categories.map(async (category) => {
          const response = await fetch(`http://localhost:3000/places?address=${address}&type=${category.type}`);
          const data = await response.json();
          console.log("Fetched Data from Backend:", data);  // Log the entire response
      
          if (!data.places || data.places.length === 0) {
            return { title: category.title, data: [] }; // Return empty array if no places are found
          }
      
          const placesWithImages = await Promise.all(
            data.places.map(async (place: any) => {
              console.log("Place Data:", place);  // Log the data for each place
      
              const placeName = place.name || 'Unnamed Place';
              const placeAddress = place.address || 'Address not available';
              const placeTypes = place.types || 'Types not available';
              const placeWebsiteUri = place.websiteUri || 'Website not available';
      
              const imageResponse = await fetch(`http://localhost:3000/getImages?places=${encodeURIComponent(placeName)}`);
              const imageData = await imageResponse.json();
              const imagesForPlace = imageData.images[placeName];
              const imageUrl = imagesForPlace && imagesForPlace.length > 0
                ? imagesForPlace[0]
                : "https://via.placeholder.com/150"; // Fallback image
      
              return {
                name: placeName,
                imageUrl,
                rating: Math.random() * (5 - 3) + 3, // Random rating for now
                placeId: place.id || 'unknown_id',
                address: placeAddress,
                types: placeTypes,
                websiteUri: placeWebsiteUri,
              };
            })
          );
      
          return { title: category.title, data: placesWithImages };
        })
      );
      console.log("Places Data:", placesData);
      setPlaces(placesData);
    } catch (error) {
      console.error("Error fetching places or images:", error);
      setError("Failed to load places. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    // Fetch both restaurants and sightseeing places
    fetchPlaces(address);
  }, [address, fetchPlaces]);

  // Navigate to the place detail page
  const handlePressPlace = useCallback((place: Place) => {
    navigation.navigate('DetailScreen', {
      name: place.name,
      imageUrl: place.imageUrl,
      rating: place.rating,
      placeId: place.placeId,
      address: place.address, // Pass address if needed
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text> // Show error if there was an issue
      ) : places.length === 0 ? (
        <Text>No places found</Text> // Show message if no places were found
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {places.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <FlatList
                data={section.data}
                horizontal={true}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePressPlace(item)} style={styles.card}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    <Text style={styles.placeName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    width: 150,
    height: 210,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    marginRight: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "center",
  },
  placeName: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 5,
    maxWidth: 150,
    overflow: "hidden",
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
