import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import { CountryPicker } from './CountryPicker'; 
import { StatePicker } from './StatePicker';
import { CityPicker } from './CityPicker';

export const SearchBar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState('');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCountrySelection = (country: string) => {
    setSelectedCountry(country);
    setSelectedState(undefined); // Reset state and city when a new country is selected
    setSelectedCity(undefined);
  };

  const handleStateSelection = (state: string) => {
    setSelectedState(state);
    setSelectedCity(undefined); // Reset city when a new state is selected
  };

  const handleCitySelection = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.searchBar}>
        <Image
          source={{
            uri: 'data:image/png;base64,...',
          }}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor="#666"
          value={address}
          onChangeText={setAddress}
        />
      </TouchableOpacity>

      {/* Country, State, City selection modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country, State, and City</Text>
            
            {/* Country Picker */}
            <CountryPicker
              selectedCountry={selectedCountry}
              onCountrySelect={handleCountrySelection}
            />

            {/* State Picker only appears when country is selected */}
            {selectedCountry && (
              <View>
                <Text style={styles.modalTitle}>Select a State</Text>
                <StatePicker
                  country={selectedCountry}
                  selectedState={selectedState}
                  onStateSelect={handleStateSelection}
                />
              </View>
            )}

            {/* City Picker only appears when state is selected */}
            {selectedState && (
              <View>
                <Text style={styles.modalTitle}>Select a City</Text>
                <CityPicker
                  country={selectedCountry || ''}
                  state={selectedState || ''}
                  selectedCity={selectedCity}
                  onCitySelect={handleCitySelection}
                />
              </View>
            )}

            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
