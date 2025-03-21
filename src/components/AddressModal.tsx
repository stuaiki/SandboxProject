import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import { CountryPicker } from './CountryPicker';
import { StatePicker } from './StatePicker';
import { CityPicker } from './CityPicker';

interface AddressModalProps {
  isModalVisible: boolean;
  closeModal: () => void;
  selectedCountry: string | null;
  selectedState: string | null;
  selectedCity: string | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedState: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedCity: React.Dispatch<React.SetStateAction<string | null>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isModalVisible,
  closeModal,
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
  address,
  setAddress,
  handleSubmit,
}) => {
  return (
    <Modal visible={isModalVisible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* X Icon to close the modal */}
          <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
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

          {/* Address input */}
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
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '48%',
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  stateBox: {
    width: '42%',
    marginRight: 10,
  },
  cityBox: {
    width: '54%',
  },
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

export default AddressModal;
