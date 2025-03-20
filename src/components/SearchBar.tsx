import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AddressModal } from './AddressModal';  // Import Address Modal
import { TimeIcon } from '../assets/icons/TimeIcon';

export const SearchBar: React.FC = () => {
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearchPress = () => {
    setShowModal(true);
  };

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
          value={address}
          onChangeText={setAddress}
          placeholder="Search"
          style={styles.input}
          placeholderTextColor="#666"
        />
        <TouchableOpacity onPress={handleSearchPress}>
          <Image
            source={{ uri: 'data:image/png;base64,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' }} // You can use your search icon here
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {showModal && <AddressModal closeModal={() => setShowModal(false)} />}
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
    shadowOffset: { width: 0, height: 1 },
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
