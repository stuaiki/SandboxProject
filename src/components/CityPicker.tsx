import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

interface CityPickerProps {
  country: string;
  state: string;
  selectedCity: string | null;
  setCity: React.Dispatch<React.SetStateAction<string | null>>;
  style?: object;
}

export const CityPicker: React.FC<CityPickerProps> = ({
  country,
  state,
  selectedCity,
  setCity
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);

  // Clear city whenever the state changes
  useEffect(() => {
    setCity('');
  }, [state]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.post(
          'https://countriesnow.space/api/v0.1/countries/state/cities',
          { country, state }
        );
        const citiesData = response.data.data;
        if (citiesData && Array.isArray(citiesData)) {
          const cityItems = citiesData.map((city: string) => ({
            label: city,
            value: city,
          }));
          setItems(cityItems);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        setItems([]);
      }
    };

    // If no country, show empty array
    if (!country) {
      setItems([]);
      return;
    }
    // If no state, show empty array
    if (!state) {
      setItems([]);
      return;
    }
    // Otherwise fetch cities
    fetchCities();
  }, [country, state]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>City</Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={selectedCity}
        setValue={setCity}
        items={items}
        setItems={setItems}
        placeholder="Select City"
        placeholderStyle={styles.placeholderStyle}
        containerStyle={styles.pickerContainer}
        listMode="SCROLLVIEW"
        // Only enable searching if a state is selected
        searchable={!!state}
        searchPlaceholder={state ? "Search..." : ""}
        searchPlaceholderTextColor="#666"
        searchTextInputProps={{
          autoFocus: false,
        }}
        // Disable picker if no state is selected
        disabled={!state}
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

export default CityPicker;
