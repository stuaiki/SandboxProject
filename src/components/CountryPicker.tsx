import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import axios from 'axios';

interface CountryPickerProps {
  selectedCountry: string | undefined;
  onCountrySelect: (country: string) => void;
}

export const CountryPicker: React.FC<CountryPickerProps> = ({ selectedCountry, onCountrySelect }) => {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
        setCountries(response.data.data.map((item: any) => item.country));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <View>
      <Text>Select a Country</Text>
      <Picker
        selectedValue={selectedCountry}
        onValueChange={onCountrySelect}
      >
        {countries.map((country, index) => (
          <Picker.Item label={country} value={country} key={index} />
        ))}
      </Picker>
    </View>
  );
};
