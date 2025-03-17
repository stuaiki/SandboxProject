import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { BackIcon } from './assets/icons/BackIcon';

interface RestaurantHeaderProps {
  imageUrl: string;
  restaurantName: string;
  onBackPress: () => void;
}

export const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  imageUrl,
  restaurantName,
  onBackPress,
}) => {
  // Sanitize the restaurant name to avoid any potential HTML links causing issues
  const sanitizedRestaurantName = restaurantName.replace(/<\/?[^>]+(>|$)/g, "");  // Remove HTML tags, if any
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <BackIcon />
      </TouchableOpacity>
      <View style={styles.nameContainer}>
        <Text style={styles.restaurantName}>{sanitizedRestaurantName}</Text>
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
