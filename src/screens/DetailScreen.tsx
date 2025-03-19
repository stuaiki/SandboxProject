import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, SafeAreaView, Linking, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import { RestaurantHeader } from '../RestaurantHeader';
import { RatingDisplay } from '../RatingDisplay';

interface DetailScreenProps {
  route: any;
}

interface Details {
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  hours: string[];
  priceLevel: number;
  description: string;
  type: string; // Added type field
}

export const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { name, imageUrl, type } = route.params; // Now pulling type as well

  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch('http://localhost:3000/generateDescription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ placeName: name, type: type }), // Passing both name and type
        });

        if (response.ok) {
          const data = await response.json();
          setDescription(data.description);
        } else {
          throw new Error('Failed to fetch description');
        }
      } catch (error) {
        console.error("Error fetching description:", error);
        setDescription('Error fetching description.');
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchDescription();
    }
  }, [name, type]);

  const details: Details = {
    name: name,
    address: "123 Main Street, City, Country",
    phoneNumber: "+1 234 567 890",
    website: "https://www.restaurant.com",
    hours: [
      "Monday: 9:00 AM - 9:00 PM",
      "Tuesday: 9:00 AM - 9:00 PM",
      "Wednesday: 9:00 AM - 9:00 PM",
      "Thursday: 9:00 AM - 9:00 PM",
      "Friday: 9:00 AM - 10:00 PM",
      "Saturday: 9:00 AM - 10:00 PM",
      "Sunday: Closed"
    ],
    priceLevel: 3, // $$
    description: description,
    type: type,
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
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
          <Text style={styles.detailTitle}>Description:</Text>
          <Text>{details.description || 'No description available'}</Text>

          <Text style={styles.detailTitle}>Address:</Text>
          <Text>{details.address}</Text>

          <Text style={styles.detailTitle}>Phone Number:</Text>
          <Text>{details.phoneNumber}</Text>

          <Text style={styles.detailTitle}>Price Level:</Text>
          <Text>{`$${details.priceLevel}`}</Text>

          <Text style={styles.detailTitle}>Hours:</Text>
          {details.hours.map((hour: string, index: number) => (
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
