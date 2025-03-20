import React, { useState } from 'react';
import { View, Modal, TextInput, Text, Button, StyleSheet } from 'react-native';

export const AddressModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    // Handle the submission of the data
    console.log({ country, city, state, address });
    closeModal();  // Close the modal after submission
  };

  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Address Details</Text>

          <TextInput
            value={country}
            onChangeText={setCountry}
            placeholder="Country"
            style={styles.input}
          />
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="City"
            style={styles.input}
          />
          <TextInput
            value={state}
            onChangeText={setState}
            placeholder="State"
            style={styles.input}
          />
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
            style={styles.input}
          />

          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
