import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {CityHeader} from './CityHeader';
import {SavedPlacesSection} from './SavedPlacesSection';
import {BottomNavigation} from './BottomNavigation';

export const CityGuideScreen: React.FC = () => {
  const placesToEat = [
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/cafec18aa4079fbffa6cc89347a792084a7b7a20',
      name: 'SottoCasa Pizzeria',
      altText: 'SottoCasa Pizzeria',
    },
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/d3375fbf671581d30d80ecfe692a2b13188e8af3',
      name: 'Central Park Boathouse',
      altText: 'Central Park Boathouse',
    },
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/2aa9283f276d75f8e5863ea97e0dc3ddcdaeaa9e',
      name: 'La Grande Boucherie',
      altText: 'La Grande Boucherie',
    },
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/1019d11f1a79f3bb2f1b9823630295566b43d409',
      name: 'Between NY',
      altText: 'Between NY',
    },
  ];

  const sitesToSee = [
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/00df43aa9d8d7cbfa31f6826838bc02c4d72020e',
      name: 'Statue of Liberty',
      altText: 'Statue of Liberty',
    },
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/099fc3b451489f433df85b9b32d92d6b961f90d0',
      name: 'Empire State Building',
      altText: 'Empire State Building',
    },
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/cbe69c1e671653d3b46cdb220fd2a1ed50c0a461',
      name: 'Central Park',
      altText: 'Central Park',
    },
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/ac05f1bacf899fdd4d2f8f06e2aa5055e7db1a37',
      name: 'Brooklyn Bridge',
      altText: 'Brooklyn Bridge',
    },
  ];

  const placesToStay = [
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/7598f7163ef06fda8f58c9a6727748e40f48227f',
      name: 'The Central Park North',
      altText: 'The Central Park North',
    },
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/4b98bb0ff7b8238a19793b007b4761b0ec98d1f3',
      name: 'LY New York Hotel',
      altText: 'LY New York Hotel',
    },
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/7d5eb512c4df992f55281978c529fc2ae6bd13c8',
      name: 'Cachet Boutique Hotel',
      altText: 'Cachet Boutique Hotel',
    },
    {
      image:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/f03840e658297c58e5e96d0b9aaa7927469d443a',
      name: 'Nap York Sleep Station',
      altText: 'Nap York Sleep Station',
    },
  ];

  const handleBackPress = () => {
    // Handle navigation back
    console.log('Back pressed');
  };

  return (
    <View style={styles.container}>
      <CityHeader
        cityImage="https://cdn.builder.io/api/v1/image/assets/TEMP/f9ab06904f006b445794475fb7a45197eaf10ef8"
        cityName="New York City, USA"
        onBackPress={handleBackPress}
      />
      <ScrollView style={styles.content}>
        <SavedPlacesSection title="Saved Places to Eat" places={placesToEat} />
        <SavedPlacesSection title="Saved Sites to See" places={sitesToSee} />
        <SavedPlacesSection
          title="Saved Places to Stay"
          places={placesToStay}
        />
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 393,
    height: 852,
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
});
