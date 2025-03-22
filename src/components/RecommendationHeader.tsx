import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Loading } from './Loading';

interface RecommendationHeaderProps {
  imageUrl: string | null;
  address: string;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  error?: string | null;
}

export const RecommendationHeader: React.FC<RecommendationHeaderProps> = ({ imageUrl, address, country, state, city, error }) => {
  // Determine what to display based on available data
  const displayAddress = city || state || country ? 
    `${city || ''}, ${state || ''} ${country || ''}`.trim() : address;

  return (
    <View style={styles.header}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.cityImage} />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Loading />
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{displayAddress}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    height: 260,
    marginBottom: 20,
  },
  cityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 7,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 10,
    left: '20%',
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    flexWrap: 'wrap',
  },
});
