import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

interface DetailsHeaderProps {
  imageUrl: string;
  detailName: string;
}

export const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  imageUrl,
  detailName,
}) => {
  // Sanitize the restaurant name to avoid any potential HTML links causing issues
  const sanitizedDetailName = detailName.replace(/<\/?[^>]+(>|$)/g, "");  // Remove HTML tags, if any
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.nameContainer}>
        <Text style={styles.restaurantName}>{sanitizedDetailName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 381,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    position: 'absolute',
    bottom: 7,
    left: 11,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  restaurantName: {
    fontFamily: 'Kanit',
    color: '#FFFEFE',
    fontSize: 18,
    fontWeight: '500',
    textDecorationLine: 'none',  // Ensure no underline
  },
});
