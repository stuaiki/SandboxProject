import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

interface CountryPickerProps {
  selectedCountry: string | null;
  setCountry: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CountryPicker: React.FC<CountryPickerProps> = ({ selectedCountry, setCountry }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
        const countries = response.data.data.map((item: any) => ({
          label: item.country,
          value: item.country,
        }));
        setItems(countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Country</Text>
      <DropDownPicker
        open={open}
        value={selectedCountry}
        items={items}
        setOpen={setOpen}
        setValue={setCountry}
        setItems={setItems}
        placeholder="Select Country"
        placeholderStyle={styles.placeholderStyle}
        containerStyle={styles.pickerContainer}
        listMode="MODAL" // Open a full-screen modal for search
        searchable={true}
        searchPlaceholder="Search country..."
        searchPlaceholderTextColor="#666"
        searchTextInputProps={{
          autoFocus: false,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  pickerContainer: {
    height: 40,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  placeholderStyle: {
    color: '#666', 
  },
});

export default CountryPicker;
