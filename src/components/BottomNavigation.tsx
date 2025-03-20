import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';  // Import NavigationProp
import { HomeIcon } from '../assets/icons/HomeIcon';
import { MapIcon } from '../assets/icons/MapIcon';
import { AI_Icon } from '../assets/icons/AI_Icon';
import { FavoritesIcon } from '../assets/icons/FavoritesIcon';
import { RootStackParamList } from '../types';  // Import param list type

export const BottomNavigation: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();  // Initialize navigation with correct type

  // Navigate to Home screen
  const goToHome = () => {
    navigation.navigate('Home');  // Navigate to Home screen
  };

  // Navigate to AI screen
  const goToAIPage = () => {
    navigation.navigate('AIScreen');  // Navigate to AIPage screen
  };

  // Navigate to Map screen
  const goToMap = () => {
    navigation.navigate('MapScreen');  // Navigate to Map screen
  };

  // Navigate to Favorites screen
  const goToFavorites = () => {
    navigation.navigate('FavoritesScreen');  // Navigate to Favorites screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={goToHome}>
            <HomeIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={goToMap}>
            <MapIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={goToAIPage}>
            <AI_Icon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={goToFavorites}>
            <FavoritesIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    width: '100%',
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  iconButton: {
    padding: 10,
  },
});
