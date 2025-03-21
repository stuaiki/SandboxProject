import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const isSmallScreen = width <= 991;

const Header: React.FC = () => {
  return (
    <>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/48b365ad2352c83d0b5c29594199d8106aa277abb82a985e2ffabcd8ced07cba?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
          }}
          style={styles.logo}
        />
      </View>
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d074c390698c3fbda682feb49bf117195672746fb0ae25527397302b8754c7ec?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.greeting}>Hi Thomas</Text>
          <Text style={styles.subtitle}>
            Pick a city and plan your dream vacation!
          </Text>
        </View>
        <View style={styles.spacer} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff3',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: isSmallScreen ? 20 : 12,
    paddingLeft: isSmallScreen ? 20 : 21,
    paddingRight: isSmallScreen ? 20 : 21,
    display: 'flex',
    overflow: 'hidden',
  },
  logo: {
    width: 54,
    height: 54 / 2.57,
    borderRadius: 32,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    marginTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 23,
    alignSelf: 'stretch',
  },
  profileInfo: {
    flex: 1,
    alignSelf: 'stretch',
  },
  greeting: {
    color: '#000',
    letterSpacing: 0.46,
    fontFamily: 'Karla',
    fontSize: 20,
  },
  subtitle: {
    color: '#636773',
    letterSpacing: 0.32,
    marginTop: 4,
    fontFamily: 'Kanit',
    fontSize: 14,
  },
  spacer: {
    alignSelf: 'stretch',
    minHeight: 44,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    gap: 10,
  },
});

export default Header;
