import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, SafeAreaView, Linking, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import { RestaurantHeader } from '../RestaurantHeader';

interface DetailScreenProps {
  route: any;
}

interface Details {
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  hours: any; // You can define a type for hours based on the Google Places API response
  priceLevel: number;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { name, imageUrl, rating, placeId } = route.params; // Make sure placeId is coming correctly from route params

  const [details, setDetails] = useState<Details | null>(null);

  useEffect(() => {
    if (placeId) {
      const fetchRestaurantDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3000/restaurantDetails?placeId=${placeId}`);
          const data = await response.json();
          setDetails(data);
        } catch (error) {
          console.error("Error fetching restaurant details:", error);
        }
      };

      fetchRestaurantDetails();
    }
  }, [placeId]);

  const onBackPress = () => {
    navigation.goBack();
  };

  // If restaurant details are not yet loaded, show loading spinner
  if (!details) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <RestaurantHeader imageUrl={imageUrl} restaurantName={name} onBackPress={onBackPress} />

        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Address:</Text>
          <Text>{details.address}</Text>

          <Text style={styles.detailTitle}>Phone Number:</Text>
          <Text>{details.phoneNumber}</Text>

          <Text style={styles.detailTitle}>Price Level:</Text>
          <Text>{`$${details.priceLevel}`}</Text>

          <Text style={styles.detailTitle}>Hours:</Text>
          {details.hours?.weekday_text?.map((hour: string, index: number) => (
            <Text key={index}>{hour}</Text>
          ))}

          <Button
            title="Visit Website"
            onPress={() => Linking.openURL(details.website)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  detailsContainer: {
    padding: 16,
    marginTop: 20,
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Centers the spinner vertically
    alignItems: 'center', // Centers the spinner horizontally
    backgroundColor: '#fff', // Optional: set background color
  },
});
