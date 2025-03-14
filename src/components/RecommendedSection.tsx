import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {DestinationCard} from '../DestinationCard';

export const RecommendedSection: React.FC = () => {
  const destinations = [
    {
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/2c718aed1b485db66a2458c079dbbba11f76674d8802fbb8d8d05a5ef34a8f96?placeholderIfAbsent=true&apiKey=3f859ac61ca447c08465fb745bd43c61',
      name: 'Sarasota, Florida',
      rating: 4.8,
    },
    {
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/b77a9dde55881f5c78b958f309ff9a056fb168afd72131669fb1ea35587a42fe?placeholderIfAbsent=true&apiKey=3f859ac61ca447c08465fb745bd43c61',
      name: 'Maui, Hawaii',
      rating: 4.5,
    },
    {
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/842ab66f1b4ffb90b726f57fbe33ecf9952cd1d3347c2185069c127ed91a9b0b?placeholderIfAbsent=true&apiKey=3f859ac61ca447c08465fb745bd43c61',
      name: 'Tokyo, Japan',
      rating: 4.3,
    },
    {
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/e61ee4a1f0cb54562dde18efa778c7c379db82cb726551b002d829df7f65e873?placeholderIfAbsent=true&apiKey=3f859ac61ca447c08465fb745bd43c61',
      name: 'Dubai',
      rating: 4.1,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {destinations.map((destination, index) => (
          <DestinationCard
            key={index}
            imageUrl={destination.imageUrl}
            name={destination.name}
            rating={destination.rating}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    flexDirection: 'row',
  },
});
