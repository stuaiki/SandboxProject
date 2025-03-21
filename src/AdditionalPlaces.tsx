import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import countriesData from './countrystate.json'; // Your JSON data
import PlaceCard from './PlaceCard'; // Import the PlaceCard component

export const AdditionalPlaces: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [randomCountries, setRandomCountries] = useState<any[]>([]);
  const [selectedCountryStates, setSelectedCountryStates] = useState<string[]>(
    [],
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Function to get random countries
  const getRandomCountries = () => {
    const shuffled = [...countriesData].sort(() => 0.5 - Math.random()); // Randomly shuffle the data
    setRandomCountries(shuffled.slice(0, 5)); // Take the first 5 countries after shuffle
  };

  // Function to search for the country and show its states
  const handleSearch = () => {
    const country = countriesData.find(
      country => country.country.toLowerCase() === searchQuery.toLowerCase(),
    );
    if (country) {
      setSelectedCountryStates(country.state);
      setSelectedCountry(country.country); // Set the country name
    } else {
      setSelectedCountryStates([]);
      setSelectedCountry(null);
      console.log('Country not found');
    }
  };

  // Load random countries on mount
  useEffect(() => {
    getRandomCountries();
  }, []);

  // Handle country click to display states
  const handleCountryClick = (countryName: string) => {
    const country = countriesData.find(
      country => country.country === countryName,
    );
    if (country) {
      setSelectedCountryStates(country.state);
      setSelectedCountry(countryName);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search Country"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>
      <Button title="Search" onPress={handleSearch} />

      {selectedCountryStates.length > 0 ? (
        <View>
          <Text style={styles.title}>States in {selectedCountry}:</Text>
          {/* Render images above the states */}
          <FlatList
            data={selectedCountryStates}
            renderItem={({item}: {item: string}) => (
              <View style={styles.stateContainer}>
                <PlaceCard
                  imageSrc={`https://via.placeholder.com/400x200?text=State+${item}`} // Use the state name
                  title={item}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Randomly Displayed Countries:</Text>
          <FlatList
            data={randomCountries}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleCountryClick(item.country)}>
                <View style={styles.countryContainer}>
                  {/* Render images above countries */}
                  <PlaceCard
                    imageSrc={`https://via.placeholder.com/400x200?text=${item.country}`} // Placeholder image or dynamic image source
                    title={item.country}
                  />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    height: 47,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'transparent',
    opacity: 0.5,
    borderWidth: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countryContainer: {
    marginBottom: 15,
  },
  stateContainer: {
    marginBottom: 15,
  },
});
