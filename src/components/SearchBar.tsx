import React, { useState, useRef } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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
      navigation.navigate('Recommendation', { address: fullAddress });
      setIsModalVisible(false)
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
            source={{ uri: 'data:image/png;base64,...' }} 
            style={styles.searchIcon} 
          />
        </TouchableOpacity>

        {/* Text Input for the address */}
        <TextInput
          ref={textInputRef} // Set the reference to the TextInput
          placeholder="Search"
          placeholderTextColor="#666"
          value={address}
          onChangeText={setAddress}
          style={styles.searchInput}
          onSubmitEditing={handleSubmit}  // This will call handleSubmit when "Enter" is pressed
          returnKeyType="done"  // Optional: changes the return key to "Done" on the keyboard
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
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  searchIconContainer: {
    padding: 3, // Add some padding around the icon to make it clickable
  },
});

export default SearchBar;
