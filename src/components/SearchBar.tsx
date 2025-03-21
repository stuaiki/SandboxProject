import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text
} from 'react-native';
import { CountryPicker } from './CountryPicker';
import { StatePicker } from './StatePicker';
import { CityPicker } from './CityPicker';

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
          style={styles.searchInput} // You can style the inline input as well
        />
      </TouchableOpacity>

      {/* The modal that collects Country/State/City/Address */}
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* X Icon to close the modal */}
            <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
              <Text style={styles.closeIconText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Enter Address Details</Text>

            {/* Country Picker */}
            <CountryPicker
              selectedCountry={selectedCountry}
              setCountry={setSelectedCountry}
            />

            {/* State and City side by side */}
            <View style={styles.rowContainer}>
              <View style={styles.stateBox}>
                <StatePicker
                  country={selectedCountry || ''}
                  selectedState={selectedState}
                  setState={setSelectedState}
                />
              </View>
              <View style={styles.cityBox}>
                <CityPicker
                  country={selectedCountry || ''}
                  state={selectedState || ''}
                  selectedCity={selectedCity}
                  setCity={setSelectedCity}
                />
              </View>
            </View>

            {/* Address input with the SAME style as your search bar */}
            <Text style={styles.addressTitle}>Address</Text>
            <View style={styles.addressBox}>
              <TextInput
                style={styles.addressInput}
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
                placeholderTextColor="#666"
              />
            </View>

            {/* Search Button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  /* The main search bar styling */
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
  /* The small icon inside the search bar */
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  /* Inline text input inside the main search bar */
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },

  /* The modal’s dimmed background container */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  /* The main white box of the modal */
  modalContent: {
    width: '80%',
    height: '48%',
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'relative',
  },
  /* The title at the top of the modal */
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  /* X icon for closing modal */
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  closeIconText: {
    fontSize: 20,
    color: '#000',
  },

  /* Row container for State & City side by side */
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  /* Box for StatePicker */
  stateBox: {
    width: '42%',
    marginRight: 10,
  },
  /* Box for CityPicker */
  cityBox: {
    width: '54%',
  },

  /* Address label and input box */
  addressTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 7,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1, // Add a border
    borderColor: 'black',
    marginBottom: 15,
  },
  addressInput: {
    flex: 1,
    color: '#1f2937',
  },

  /* Search Button */
  submitButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SearchBar;
