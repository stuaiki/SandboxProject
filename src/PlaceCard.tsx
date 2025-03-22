import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Place} from './types';

export const PlaceCard: React.FC<Place> = ({image, name, altText}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: image}}
        style={styles.image}
        accessibilityLabel={altText}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    flexShrink: 0,
  },
  image: {
    width: 100,
    height: 97,
    borderRadius: 10,
  },
  name: {
    color: '#000',
    fontFamily: 'Kanit',
    fontSize: 12,
    marginTop: 8,
    height: 53,
  },
});
