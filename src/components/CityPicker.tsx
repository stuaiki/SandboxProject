import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface CityPickerProps {
  country: string;
  state: string;
  selectedCity: string | undefined;
  onCitySelect: (city: string) => void;
}

export const CityPicker: React.FC<CityPickerProps> = ({ country, state, selectedCity, onCitySelect }) => {
  const [cities, setCities] = useState<string[]>([]); // Stores cities for the selected state

  // Fetch the cities for the selected country and state
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
          method: 'POST', // Use POST request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            country: country,  // Send the selected country
            state: state,      // Send the selected state
          }),
        });

        const data = await response.json();
        console.log('Fetched data:', data); // Log the entire fetched data

        // Check if cities are available for the state
        if (data && data.data && data.data.length > 0) {
          setCities(data.data); // Set cities for the selected state
        } else {
          console.log('No cities found for the selected state');
          setCities([]); // Reset cities if none found
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]); // Reset cities in case of error
      }
    };

    if (country && state) {
      fetchCities(); // Fetch cities when the country and state change
    }
  }, [country, state]); // Re-fetch whenever the country or state changes

  return (
    <View>
      {cities.length > 0 ? (
        <Picker
          selectedValue={selectedCity}
          onValueChange={(value) => onCitySelect(value)}
        >
          {cities.map((city, index) => (
            <Picker.Item key={index} label={city} value={city} />
          ))}
        </Picker>
      ) : (
        <Text>No cities available</Text>
      )}
    </View>
  );
};
