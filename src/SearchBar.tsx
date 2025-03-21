import React from 'react';
import {View, TextInput, Image, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const isSmallScreen = width <= 991;

const SearchBar: React.FC = () => {
  return (
    <View style={styles.searchBar}>
      <Image
        source={{
          uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a768ecaf184b45303967a6857c7e05a7609c5d333bd8d0f2a401bee386cddd95?placeholderIfAbsent=true&apiKey=3258114e603f4c4b93159cc5a3da17fc',
        }}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        placeholderTextColor="rgba(0,0,0,0.5)"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    color: '#000',
    backgroundColor: '#f2f5fa',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 16,
    marginLeft: isSmallScreen ? 10 : 17,
    marginRight: isSmallScreen ? 10 : 17,
    padding: 12,
    paddingLeft: 11,
    paddingRight: 11,
    fontSize: 17,
  },
  searchIcon: {
    width: 23,
    height: 23,
  },
  searchInput: {
    flex: 1,
    opacity: 0.5,
    fontSize: 17,
    fontFamily: 'Kanit',
  },
});

export default SearchBar;
