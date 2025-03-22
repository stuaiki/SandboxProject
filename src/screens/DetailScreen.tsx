import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, SafeAreaView, Linking, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DetailsHeader } from '../components/DetailsHeader';
import { RatingDisplay } from '../components/RatingDisplay';
import { InfoItem } from '../components/InfoItem';
import { LocationIcon } from '../assets/icons/LocationIcon';
import { PhoneIcon } from '../assets/icons/PhoneIcon';
import { TimeIcon } from '../assets/icons/TimeIcon';
import { PriceIcon } from '../assets/icons/PriceIcon';
import { WebsiteIcon } from '../assets/icons/WebsiteIcon';
import { BackButton } from '../components/BackButton';
import { Loading } from '../components/Loading';

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
  type: string;
  rating: number;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {  
  const { name, imageUrl, type, rating = 4.5 } = route.params;

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
          body: JSON.stringify({ placeName: name, type: type }),
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
    name,
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
    priceLevel: 3,
    description,
    type,
    rating,
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      
      <ScrollView style={styles.scrollView}>
        <DetailsHeader imageUrl={imageUrl} detailName={name} />
        <View style={styles.detailsContainer}>
          <RatingDisplay rating={details.rating} />
          <Text style={styles.detailTitle}>Description:</Text>
          <Text>{details.description || 'No description available'}</Text>

          <Text style={styles.detailTitle}>Address:</Text>
          <InfoItem icon={<LocationIcon/>} text={details.address} />

          <Text style={styles.detailTitle}>Phone Number:</Text>
          <InfoItem icon={<PhoneIcon />} text={details.phoneNumber} />
                  

          <Text style={styles.detailTitle}>Price Level:</Text>
          <InfoItem icon={<PriceIcon />} text={`$${details.priceLevel}`} />

          <Text style={styles.detailTitle}>Hours:</Text>
          {details.hours.map((hour: string, index: number) => (
            <InfoItem key={index} icon={<TimeIcon />} text={hour} />
          ))}

          <Text style={styles.detailTitle}>Website Link:</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(details.website)}
          >
            <InfoItem icon={<WebsiteIcon />} text={details.website} textStyle={styles.weblink}/>
          </TouchableOpacity>
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
  fixedBackIconContainer: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10, // Ensure it stays on top of everything
  },
  weblink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  scrollView: {
    flex: 1,
  },
  fixedBackButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 16,
    marginTop: 5,
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

