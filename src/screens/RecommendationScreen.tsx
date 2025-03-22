import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';  
import { RootStackParamList } from '../types';
import { PlacesList } from '../components/SightseeingList';

type RecommendationRouteProp = RouteProp<RootStackParamList, 'Recommendation'>;

export const Recommendation: React.FC = () => {
  const route = useRoute<RecommendationRouteProp>();  // Get typed route
  const { address, country, state, city } = route.params;

  const [cityImageUrl, setCityImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        // Dynamically build query parameters
        const queryParams = [
          `address=${encodeURIComponent(address)}`,
          country ? `country=${encodeURIComponent(country)}` : '',
          state ? `state=${encodeURIComponent(state)}` : '',
          city ? `city=${encodeURIComponent(city)}` : ''
        ]
        .filter(Boolean)  // Remove any empty parameters
        .join('&');  // Join parameters with '&'

        // Correct fetch URL
        const response = await fetch(`http://localhost:3000/cityImage?${queryParams}`);
        const data = await response.json();
        console.log("City Image URL received:", data.imageUrl);  // Log the URL received from the backend
        setCityImageUrl(data.imageUrl);  // Set the city image URL in state
      } catch (err) {
        console.error("Error fetching city image:", err);
        setError("Failed to load city image");
      }
    };
  
    fetchCityImage();
  }, [address, country, state, city]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section: Image and Title */}
        <View style={styles.header}>
          {cityImageUrl ? (
            <Image source={{ uri: cityImageUrl }} style={styles.cityImage} />
          ) : error ? (
            <Text>{error}</Text>  // Error message
          ) : (
            <Text>Loading city image...</Text>  // Loading message
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{address}</Text> 
          </View>
        </View>

        {/* Content Section: Places List */}
        <View style={styles.content}>
          <PlacesList address={address} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,  // Allow the ScrollView to grow and fill the space
  },
  header: {
    position: 'relative',
    height: 260,  // Set height for the header
    marginBottom: 20,
  },
  cityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',  // Ensure the image covers the area without distorting
    borderRadius: 7,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 10,
    left: '20%',
    right: 16,  // Padding to prevent clipping on sides
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Black background for the title
    borderRadius: 7,  // Optionally add rounded corners for the title background
    paddingVertical: 5,
    paddingHorizontal: 10,  // Added padding to make the title look neat
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',  // Align text to the center
    flexWrap: 'wrap',  // Allow text to wrap if it overflows
  },
  content: {
    flex: 1,
  },
});
