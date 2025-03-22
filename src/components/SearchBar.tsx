import React, { useState, useRef } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';  // Import the type for navigation
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

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();  // Type the navigation prop

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const textInputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    // If none of the values (country, state, city) are set, show alert
    if (!selectedCountry && !selectedState && !selectedCity && !address) {
      Alert.alert('Incomplete Information', 'You haven\'t set any location details yet. Please select at least one location or provide an address.');
    } else {
      // Construct the formatted address: Address, City, State, Country
      const fullAddress = [
        address, 
        selectedCity, 
        selectedState, 
        selectedCountry
      ]
        .filter(Boolean)  // Remove null or undefined values
        .join(', ');  // Join them with commas
      
      // Proceed to Recommendation page with the formatted address
      navigation.navigate('Recommendation', { 
        address: fullAddress, 
        country: selectedCountry || undefined, // Use undefined if selectedCountry is null
        state: selectedState || undefined,     // Use undefined if selectedState is null
        city: selectedCity || undefined
      });
  
      // Clear all selections
      setSelectedCountry(null);
      setSelectedState(null);
      setSelectedCity(null);
      setAddress('');  // Clear the input field
  
      setIsModalVisible(false);
      closeModal();
    }
  };
  

  const handleFocus = () => {
    textInputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      {/* Your search bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={toggleModal} style={styles.searchIconContainer}>
            <Image 
            source={{ uri: 'data:image/png;base64,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' }} 
            style={styles.searchIcon}
          />
        </TouchableOpacity>

        {/* Text Input for the address */}
        <TextInput
          onPress={handleFocus}
          ref={textInputRef} // Set the reference to the TextInput
          placeholder="Enter address to search recommendation..."
          placeholderTextColor="#666"
          value={address}
          onChangeText={setAddress}
          style={styles.searchInput}
          onSubmitEditing={handleSubmit}  // This will call handleSubmit when "Enter" is pressed
          returnKeyType="done"
          // Optional: changes the return key to "Done" on the keyboard
        />
      </View>

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
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },
  searchIconContainer: {
    padding: 3, // Add some padding around the icon to make it clickable
  },
  tooltip: {
    position: 'absolute',
    top: -20,
    left: '50%',
    transform: [{ translateX: -30 }],
    backgroundColor: '#333',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
  },
});

export default SearchBar;
