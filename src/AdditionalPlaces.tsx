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
import axios from 'axios'; // For making HTTP requests

export const AdditionalPlaces: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [randomCountries, setRandomCountries] = useState<any[]>([]);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [selectedCountryStates, setSelectedCountryStates] = useState<string[]>(
    [],
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryImages, setCountryImages] = useState<{[key: string]: string}>(
    {}, // Store images for countries
  );
  const [stateImages, setStateImages] = useState<{[key: string]: string}>(
    {}, // Store images for states
  );
  const address = null;
  const city = null;

  const [cityImageUrl, setCityImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to get random countries
  const getRandomCountries = () => {
    const shuffled = [...countriesData].sort(() => 0.5 - Math.random()); // Randomly shuffle the data
    const selectedCountries = shuffled.slice(0, 5); // Take the first 5 countries after shuffle
    setRandomCountries(selectedCountries);

    // Automatically set the country and state for the first country and its first state
    setCountry(selectedCountries[0]?.country || '');
    setState(selectedCountries[0]?.state[0] || '');
  };

  useEffect(() => {
    // Get random countries when the component mounts
    getRandomCountries();
  }, []);

  // This useEffect is for fetching images of countries when country or states change
  useEffect(() => {
    const fetchImages = async () => {
      // Fetch the country image if not already fetched
      if (!countryImages[country] && country) {
        await fetchCountryImage(country);
      }

      // Fetch the state images
      if (selectedCountryStates.length > 0) {
        selectedCountryStates.forEach(async stateName => {
          if (!stateImages[stateName]) {
            await fetchStateImage(stateName);
          }
        });
      }
    };
    fetchImages();
  }, [country, selectedCountryStates]); // Run when country or selectedCountryStates change

  const isValidImageUrl = (url: string) => {
    const invalidKeywords = ['map', 'watermark', 'logo', 'stockphoto', 'flag'];
    return !invalidKeywords.some(keyword =>
      url.toLowerCase().includes(keyword),
    );
  };

  const getImageUrls = async (query: string) => {
    const apiKey = 'AIzaSyB1ZizZC9zwC2Eruel8F-2mWNWJwKMsAmo';
    const cx = '620f5385862e24576';

    const travelQuery = `${query} travel, tourism, landscape, vacation, scenery, city, skyline, tripadvisor.com, -flag, -map`;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${travelQuery}&searchType=image&key=${apiKey}&cx=${cx}`,
      );

      if (response.data.items && response.data.items.length > 0) {
        // Filter out invalid image URLs
        const validImages = response.data.items.filter((item: {link: string}) =>
          isValidImageUrl(item.link),
        );

        if (validImages.length > 0) {
          return validImages[0].link; // Return the first valid image
        }
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }

    return '';
  };

  // Function to get images for a specific country
  const fetchCountryImage = async (countryName: string) => {
    const imageUrl = await getImageUrls(countryName);
    setCountryImages(prev => ({...prev, [countryName]: imageUrl}));
  };

  // Function to get images for states
  const fetchStateImage = async (stateName: string) => {
    const imageUrl = await getImageUrls(stateName);
    setStateImages(prev => ({...prev, [stateName]: imageUrl}));
  };

  // Function to search for the country and show its states
  const handleSearch = () => {
    const country = countriesData.find(
      country => country.country.toLowerCase() === searchQuery.toLowerCase(),
    );
    if (country) {
      setSelectedCountryStates(country.state);
      setSelectedCountry(country.country); // Set the country name
      fetchCountryImage(country.country); // Fetch image for the country
    } else {
      setSelectedCountryStates([]);
      setSelectedCountry(null);
      console.log('Country not found');
    }
  };

  // Handle country click to display states
  const handleCountryClick = (countryName: string) => {
    const country = countriesData.find(
      country => country.country === countryName,
    );
    if (country) {
      setSelectedCountryStates(country.state);
      setSelectedCountry(countryName);
      fetchCountryImage(countryName); // Fetch image for the selected country
    }
  };

  return (
    <View style={styles.container}>
      {selectedCountryStates.length > 0 ? (
        <View>
          <Text style={styles.title}>Places in {selectedCountry}</Text>
          {/* Render images above the states */}
          <FlatList
            data={selectedCountryStates}
            renderItem={({item}: {item: string}) => (
              <View style={styles.stateContainer}>
                <PlaceCard
                  imageSrc={
                    stateImages[item] ||
                    `https://via.placeholder.com/400x200?text=State+${item}`
                  } // Use the state image if available
                  title={item}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Recommended For You</Text>
          <FlatList
            data={randomCountries}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleCountryClick(item.country)}>
                <View style={styles.countryContainer}>
                  {/* Render images above countries */}
                  <PlaceCard
                    imageSrc={
                      countryImages[item.country] ||
                      `https://via.placeholder.com/400x200?text=${item.country}`
                    } // Placeholder image or dynamic image source
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
