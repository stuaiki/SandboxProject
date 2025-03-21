import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface StatePickerProps {
  country: string;
  selectedState: string | undefined;
  onStateSelect: (state: string) => void;
}

export const StatePicker: React.FC<StatePickerProps> = ({ country, selectedState, onStateSelect }) => {
  const [states, setStates] = useState<string[]>([]); // Stores states for the selected country

  // Fetch the states for the selected country
  useEffect(() => {

    const fetchStates = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/states');
        const data = await response.json();
        
        console.log('Fetched data:', data); // Log the entire fetched data

        // Find the selected country in the response and set its states
        const selectedCountry = data.data.find((item: any) => item.name === country || item.iso3 === country);
        if (selectedCountry) {
          console.log('Found country:', selectedCountry); // Log the selected country from the data
          const stateNames = selectedCountry.states.map((state: any) => state.name);
          console.log('States:', stateNames); // Log the states for the selected country
          setStates(stateNames); // Set states for the selected country
        } else {
          console.log('No states found for the selected country');
          setStates([]); // If no states found, set an empty array
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        setStates([]); // Reset states in case of error
      }
    };

    if (country) {
      fetchStates(); // Fetch states when the country changes
    }
  }, [country]); // Re-fetch whenever the country changes

  return (
    <View>
      {states.length > 0 ? (
        <Picker
          selectedValue={selectedState}
          onValueChange={(value) => onStateSelect(value)}
        >
          {states.map((state, index) => (
            <Picker.Item key={index} label={state} value={state} />
          ))}
        </Picker>
      ) : (
        <Text>No states available</Text>
      )}
    </View>
  );
};
