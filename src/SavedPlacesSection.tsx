import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import PlaceCard from './PlaceCard';

interface Place {
  imageSrc: string;
  title: string;
  imageStyle?: object;
}

interface SavedPlacesSectionProps {
  title: string;
  places: Place[];
  containerStyle: object;
  titleStyle?: object;
  scrollContainerStyle?: object;
}

const SavedPlacesSection: React.FC<SavedPlacesSectionProps> = ({
  title,
  places,
  containerStyle,
  titleStyle = styles.sectionHeading,
  scrollContainerStyle = styles.placesList,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <View style={styles.scrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={scrollContainerStyle}>
            {places.map((place, index) => (
              <PlaceCard
                key={index}
                imageSrc={place.imageSrc}
                title={place.title}
                //  imageStyle={place.imageStyle}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    marginTop: 5,
  },
  placesList: {
    flexDirection: 'row',
    gap: 10,
  },
  sectionHeading: {
    fontSize: 16,
    fontFamily: 'Kanit',
  },
});

export default SavedPlacesSection;
