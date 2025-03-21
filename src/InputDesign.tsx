import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Header from './Header';
import SearchBar from './SearchBar';
import SavedPlacesSection from './SavedPlacesSection';
import {AdditionalPlaces} from './AdditionalPlaces';

const {width} = Dimensions.get('window');
const isSmallScreen = width <= 991;

function InputDesign() {
  // Data for restaurants
  const restaurants = [
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/b91e5cfc5fd35b3e3ab6351e2f18365c77baa4887cfd7f482c75b5695628f0c5?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'SottoCasa Pizzeria',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/780b7acb2e9acc6503b5a72b1dd4cbabd11fbfd9d00333f0bfc066abeb3c676d?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Central Park Boathouse',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/e3a99298cf7c07370f6f5520d1e7f3ade86ccd28813972081cd1e4cf3f4c94a9?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'La Grande Boucherie',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/8c777cb68ca07e1c3563158b5254c32c7bb28d0f74730b6fe7c686f907bb3ea0?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Between the Bagel NY',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Kuu Ramen',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Manhatta',
    },
  ];

  // Data for attractions
  const attractions = [
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/4a7d8bc9245a59853675b5e087a8070e27d1c2741797c78d76ef5dd03d36200c?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Statue of Liberty',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/723d8405c45c5094cbd823326a9d432f327a4d1aeb3a44bd203e2c15cabb31de?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Empire State Building',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/393f08bf17654f95b6db536f34d440c2a50100215827d7779d827dadbd43dbd5?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Central Park',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/91970515dc1bfc0629fc1870f847fbc5675374a537c727d040b3bd3b69d3b1b2?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Brooklyn Bridge',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Times Square',
    },
  ];

  // Data for hotels
  const hotels = [
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/f43cd751514ad8bf25f04947712115336db8aa71f1dc26e25d93a22855b0ec85?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'The Central Park North',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/a3c4a4ba0542bcb5f5a98c4a0e3819e95793f29e13ea8c0ca6d36271064e24f9?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'LY New York Hotel',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/5dfe985b4cf32fecb9b4d02e49418202ceabb1cf02bd5e166cbfb3ddc5f8893a?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Cachet Boutique Hotel',
    },
    {
      imageSrc:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/6a48869815c09340466045e720719337d22cb032ff16daa34fba2489892b2ab1?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
      title: 'Nap New York Sleep Station',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.home}>
            <Header />

            <View style={styles.mainContent}>
              <SearchBar />

              <Text style={styles.sectionTitle}>NEAR YOU</Text>

              <SavedPlacesSection
                title="Saved Places to Eat"
                places={restaurants}
                containerStyle={styles.eatSection}
              />

              <SavedPlacesSection
                title="Saved Sites to See"
                places={attractions}
                containerStyle={styles.sitesSection}
                scrollContainerStyle={styles.sitesList}
              />

              <SavedPlacesSection
                title="Saved Places to Stay"
                places={hotels}
                containerStyle={styles.hotelsSection}
                scrollContainerStyle={styles.hotelsList}
              />
            </View>
          </View>

          <AdditionalPlaces />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: 556,
    display: 'flex',
  },
  home: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 393,
    overflow: 'hidden',
  },
  mainContent: {
    color: '#000',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    marginTop: 27,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: 'Kanit',
  },
  sectionTitle: {
    color: '#000',
    alignSelf: 'flex-start',
    marginTop: isSmallScreen ? 40 : 128,
    fontSize: 17,
    fontFamily: 'Kanit',
  },
  eatSection: {
    marginTop: 16,
  },
  sitesSection: {
    width: '100%',
    marginTop: 7,
    marginRight: isSmallScreen ? 2 : 0,
  },
  sitesList: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 5,
  },
  hotelsSection: {
    width: '100%',
    marginTop: 7,
  },
  hotelsList: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    minHeight: 150,
    marginTop: 5,
  },
});

export default InputDesign;
