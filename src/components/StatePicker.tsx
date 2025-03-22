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
  const [loading, setLoading] = useState(false);  // Added loading state for better UX

  useEffect(() => {
    if (!country) {
      setItems([]);
      return;
    }

    const fetchStates = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states');
        const countriesData = response.data.data;
        const selectedCountryObj = countriesData.find((item: any) => item.name === country);

        if (selectedCountryObj && Array.isArray(selectedCountryObj.states)) {
          if (selectedCountryObj.states.length === 0) {
            setItems([{ label: 'No state in this country', value: '', disabled: true }]);
          } else {
            const stateItems = selectedCountryObj.states.map((st: any) => ({
              label: st.name,
              value: st.name,
            }));
            setItems(stateItems);
          }
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        setItems([]);
      } finally {
        setLoading(false);
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
        disabled={!country || loading}
        searchable={!!country}
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
