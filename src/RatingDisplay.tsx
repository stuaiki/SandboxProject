import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StarRating } from './StarRating';

interface RatingDisplayProps {
  rating: number;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({ rating }) => {
  // Format the rating to two decimal places
  const formattedRating = rating.toFixed(2);

  return (
    <View style={styles.container}>
      <StarRating rating={rating} />
      <Text style={styles.ratingText}>{formattedRating}</Text> {/* Display formatted rating */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  ratingText: {
    color: '#2894D1',
    fontFamily: 'Kanit',
    fontSize: 13,
  },
});
