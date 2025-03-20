import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StarRating } from './StarRating';

interface RatingDisplayProps {
  rating: number;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({ rating }) => {
  // Ensure rating is a number, then format to two decimals
  const numericRating = typeof rating === 'number' ? rating : Number(rating);
  const formattedRating = isNaN(numericRating) ? '0.00' : numericRating.toFixed(2);

  return (
    <View style={styles.container}>
      <StarRating rating={numericRating} />
      <Text style={styles.ratingText}>{formattedRating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // Removed unsupported gap property
  },
  ratingText: {
    color: '#2894D1',
    fontFamily: 'Kanit',
    fontSize: 13,
    marginLeft: 10, // Adjust spacing as needed
  },
});

export default RatingDisplay;
