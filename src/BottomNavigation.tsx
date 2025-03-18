import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {HomeIcon} from './assets/icons/HomeIcon';
import {MapIcon} from './assets/icons/MapIcon';
import {SearchIcon} from './assets/icons/SearchIcon';
import {FavoritesIcon} from './assets/icons/FavoritesIcon';

export const BottomNavigation: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <HomeIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MapIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <SearchIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FavoritesIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.homeIndicator} />
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
    shadowOffset: {width: 0, height: -2},
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
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#000',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 7,
    opacity: 0.2,
  },
});
