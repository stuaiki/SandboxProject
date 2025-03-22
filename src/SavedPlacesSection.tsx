import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SavedPlacesSectionProps} from './types';
import {PlaceCard} from './PlaceCard';

export const SavedPlacesSection: React.FC<SavedPlacesSectionProps> = ({
  title,
  places,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {places.map((place, index) => (
          <PlaceCard
            key={`${place.name}-${index}`}
            image={place.image}
            name={place.name}
            altText={place.altText}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    color: '#000',
    fontFamily: 'Kanit',
    fontSize: 16,
    marginBottom: 5,
  },
  scrollContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 8,
  },
});
