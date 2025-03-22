import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface PlaceCardProps {
  imageSrc: string;
  title: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({imageSrc, title}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: imageSrc}} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default PlaceCard;
