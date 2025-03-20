import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {RatingDisplay} from './components/RatingDisplay';
import {InfoItem} from './InfoItem';
import {LocationIcon} from './assets/icons/LocationIcon';
import {PhoneIcon} from './assets/icons/PhoneIcon';
import {TimeIcon} from './assets/icons/TimeIcon';
import {WebsiteIcon} from './assets/icons/WebsiteIcon';

export const RestaurantInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <RatingDisplay rating={4.7} />
      </View>

      <Text style={styles.priceCategory}>$20–30 Pizza restaurant</Text>

      <View style={styles.infoSection}>
        <InfoItem icon={<LocationIcon />} text="Location info" />
        <InfoItem icon={<PhoneIcon />} text="Phone number" />
        <InfoItem icon={<TimeIcon />} text="Hours" />
      </View>

      <View style={styles.websiteContainer}>
        <InfoItem icon={<WebsiteIcon />} text="Website" />
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
    gap: 10,
  },
  priceCategory: {
    marginTop: 30,
    fontSize: 16,
    fontFamily: 'Kanit',
    color: '#000',
  },
  infoSection: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  websiteContainer: {
    marginTop: 153,
  },
});
