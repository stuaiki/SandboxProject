import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { Loading } from "./Loading";
import { PlacesListProps } from "../types";

interface Place {
  name: string;
  imageUrl: string;
  rating?: number;
  placeId: string;
  address?: string;
  type?: string;
}

export const PlacesList: React.FC<PlacesListProps> = ({ address }) => {
  const [places, setPlaces] = useState<{ title: string, data: Place[] }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // Fetch places based on the type (restaurants or sightseeing)
  const fetchPlaces = useCallback(async (address: string) => {
    setLoading(true);
    setError(null);
    setPlaces([]);
    try {
      const categories = [
        { title: "Places to Eat", type: "restaurant" },
        { title: "Places to Visit", type: "tourist_attraction" },
      ];
      const placesData = await Promise.all(
        categories.map(async (category) => {
          const response = await fetch(`http://localhost:3000/places?address=${address}&type=${category.type}`);
          const data = await response.json();
          console.log("Fetched Data for category:", category.title, data);
          if (!data.places || data.places.length === 0) {
            console.log(`No places found for ${category.title}`);
            return { title: category.title, data: [] };
          }
          // Process each place: fetch its images and build the final object.
          const placesWithImages = await Promise.all(
            data.places.map(async (place: any) => {
              console.log("Processing place:", place);
              const placeName = place.name || 'Unnamed Place';
              const placeAddress = place.address || 'Address not available';
              const placeTypes = place.types || 'Types not available';
              const placeWebsiteUri = place.websiteUri || 'Website not available';
              const imageResponse = await fetch(`http://localhost:3000/getImages?places=${encodeURIComponent(placeName)}`);
              const imageData = await imageResponse.json();
              const imagesForPlace = imageData.images[placeName];
              const imageUrl = imagesForPlace && imagesForPlace.length > 0
                ? imagesForPlace[0]
                : "https://via.placeholder.com/150";
              return {
                name: placeName,
                imageUrl,
                rating: Math.random() * (5 - 3) + 3,
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
      console.log("Fetched places data:", placesData);
      setPlaces(placesData);
    } catch (error) {
      console.error("Error fetching places or images:", error);
      setError("Failed to load places. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('Fetching places for address:', address);
    fetchPlaces(address);
  }, [address, fetchPlaces]);

  useEffect(() => {
    console.log('Fetched Places:', places);
  }, [places]);

  // Navigate to the place detail page
  const handlePressPlace = useCallback((place: Place) => {
    navigation.navigate('DetailScreen', {
      name: place.name,
      imageUrl: place.imageUrl,
      type: place.type,
      rating: place.rating,
      destAddress: `${place.name}, ${place.address}`, // Destination address from API
      address: address,           // User input address (origin)
    });
  }, [navigation, address]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : places.length === 0 ? (
        <Text>No places found</Text>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {places.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <FlatList
                data={section.data}
                horizontal
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePressPlace(item)} style={styles.card}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    <Text style={styles.placeName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
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

export default PlacesList;
