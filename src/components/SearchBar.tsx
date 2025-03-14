import React from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';

export const SearchBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9f8b095214d4848c91ea64977bb80b32f9e17848b0c4036b18ecf3c196e08488?placeholderIfAbsent=true&apiKey=3f859ac61ca447c08465fb745bd43c61',
          }}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor="#666"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
});
