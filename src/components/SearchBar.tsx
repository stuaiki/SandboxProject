import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CountryPicker } from './CountryPicker';
import { StatePicker } from './StatePicker';
import { CityPicker } from './CityPicker';
import AddressModal from './AddressModal';

interface SearchBarProps {
  closeModal: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ closeModal }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmit = () => {
    // Process the address information here
    console.log({
      selectedCountry,
      selectedState,
      selectedCity,
      address
    });
    closeModal();
  };

  return (
    <View style={styles.container}>
      {/* This is your "search bar" on the main screen */}
      <TouchableOpacity onPress={toggleModal} style={styles.searchBar}>
        <Image
          source={{ uri: 'data:image/png;base64,...' }} // Put your search icon data/URL here
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#666"
          value={address}
          onChangeText={setAddress}
          style={styles.searchInput}
        />
      </TouchableOpacity>

      {/* The AddressModal component */}
      <AddressModal
        isModalVisible={isModalVisible}
        closeModal={toggleModal}
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        selectedCity={selectedCity}
        setSelectedCountry={setSelectedCountry}
        setSelectedState={setSelectedState}
        setSelectedCity={setSelectedCity}
        address={address}
        setAddress={setAddress}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

/* ---------------- STYLES ---------------- */
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
});

export default SearchBar;
