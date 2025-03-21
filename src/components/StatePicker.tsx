import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

interface StatePickerProps {
  country: string | null;  // country can be null if not selected
  selectedState: string | null;
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  style?: object;
}

type StateItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const StatePicker: React.FC<StatePickerProps> = ({
  country,
  selectedState,
  setState
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<StateItem[]>([]);

  useEffect(() => {
    // If no country selected, show an empty list
    if (!country) {
      setItems([]);
      return;
    }

    // Otherwise, fetch states for the selected country
    const fetchStates = async () => {
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states');
        const countriesData = response.data.data;
        const selectedCountryObj = countriesData.find(
          (item: any) => item.name === country
        );

        if (selectedCountryObj && Array.isArray(selectedCountryObj.states)) {
          // If the array of states is empty, show a "No state in this country" message
          if (selectedCountryObj.states.length === 0) {
            setItems([{ label: 'No state in this country', value: '', disabled: true }]);
          } else {
            // Otherwise map them normally
            const stateItems = selectedCountryObj.states.map((st: any) => ({
              label: st.name,
              value: st.name,
            }));
            setItems(stateItems);
          }
        } else {
          // If states property doesn't exist, treat it as no states
          setItems([{ label: 'No state in this country', value: '', disabled: true }]);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        setItems([]);
      }
    };

    fetchStates();
  }, [country]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>State/Province</Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        value={selectedState}
        setValue={setState}
        items={items}
        setItems={setItems}
        placeholder="State"
        placeholderStyle={styles.placeholderStyle}
        containerStyle={styles.pickerContainer}
        listMode="SCROLLVIEW"
        disabled={!country}               // disable if no country
        searchable={!!country}           // enable search only if a country is selected
        searchPlaceholder={country ? 'Search...' : ''}
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

export default StatePicker;
