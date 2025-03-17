import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {StarRating} from './StarRating';

interface RatingDisplayProps {
  rating: number;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({rating}) => {
  return (
    <View style={styles.container}>
      <StarRating rating={rating} />
      <Text style={styles.ratingText}>{rating}</Text>
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
