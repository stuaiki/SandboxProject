import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {DestinationProps} from './types';

export const DestinationCard: React.FC<DestinationProps> = ({
  imageUrl,
  name,
  rating,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: imageUrl}} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1d962f04f98059bd5fde1ab9d136dc214c4558fef6f480818c797065b1c4b383?placeholderIfAbsent=true&apiKey=3f859ac61ca447c08465fb745bd43c61',
            }}
            style={styles.ratingIcon}
          />
          <Text style={styles.rating}>{rating}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 128,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    color: '#4b5563',
  },
});
