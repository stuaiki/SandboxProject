import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { RatingDisplay } from './components/RatingDisplay';
import { InfoItem } from './components/InfoItem';
import { LocationIcon } from './assets/icons/LocationIcon';
import { PhoneIcon } from './assets/icons/PhoneIcon';
import { TimeIcon } from './assets/icons/TimeIcon';
import { WebsiteIcon } from './assets/icons/WebsiteIcon';
import { PriceIcon } from './assets/icons/PriceIcon'; // Make sure PriceIcon is imported

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

const details: Details = {
  name: 'Pizza Place',
  address: '123 Main Street, City, Country',
  phoneNumber: '+1 234 567 890',
  website: 'https://www.pizzaplace.com',
  hours: [
    'Monday: 9:00 AM - 9:00 PM',
    'Tuesday: 9:00 AM - 9:00 PM',
    'Wednesday: 9:00 AM - 9:00 PM',
    'Thursday: 9:00 AM - 9:00 PM',
    'Friday: 9:00 AM - 10:00 PM',
    'Saturday: 9:00 AM - 10:00 PM',
    'Sunday: Closed',
  ],
  priceLevel: 3,
  description: 'A cozy place serving delicious pizzas and pastas.',
  type: 'restaurant',
  rating: 4.7,
};

export const RestaurantInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Rating and description */}
      <View style={styles.ratingContainer}>
        <RatingDisplay rating={details.rating} />
      </View>
      {/* Restaurant details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Description:</Text>
        <Text>{details.description || 'No description available'}</Text>

        <Text style={styles.detailTitle}>Address:</Text>
        <InfoItem icon={<LocationIcon />} text={details.address} />

        <Text style={styles.detailTitle}>Phone Number:</Text>
        <InfoItem icon={<PhoneIcon />} text={details.phoneNumber} />

        <Text style={styles.detailTitle}>Price Level:</Text>
        <InfoItem icon={<PriceIcon />} text={`$${details.priceLevel}`} />

        <Text style={styles.detailTitle}>Hours:</Text>
        {details.hours.map((hour: string, index: number) => (
          <InfoItem key={index} icon={<TimeIcon />} text={hour} />
        ))}

        <Text style={styles.detailTitle}>Website Link:</Text>
        <TouchableOpacity onPress={() => Linking.openURL(details.website)}>
          <InfoItem icon={<WebsiteIcon />} text={details.website} textStyle={styles.weblink} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailsContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10
  },
  weblink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});


