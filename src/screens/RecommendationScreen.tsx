import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { RecommendationHeader } from '../components/RecommendationHeader';
import { PlacesList } from '../components/PlacesList';
import { Loading } from '../components/Loading';
import { RootStackParamList } from '../types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BackButton } from '../components/BackButton'; 


type RecommendationRouteProp = RouteProp<RootStackParamList, 'Recommendation'>;

export const Recommendation: React.FC = () => {
  const route = useRoute<RecommendationRouteProp>(); 
  const { address, country, state, city } = route.params;

  const [cityImageUrl, setCityImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCityImage = async () => {
      const queryParams = [
        `address=${encodeURIComponent(address)}`,
        country ? `country=${encodeURIComponent(country)}` : '',
        state ? `state=${encodeURIComponent(state)}` : '',
        city ? `city=${encodeURIComponent(city)}` : ''
      ]
      .filter(Boolean)
      .join('&');

      try {
        const response = await fetch(`http://localhost:3000/cityImage?${queryParams}`);
        const data = await response.json();
        setCityImageUrl(data.imageUrl);
      } catch (err) {
        setError("Failed to load city image");
      } finally {
        setLoading(false);
      }
    };
    fetchCityImage();
  }, [address, country, state, city]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
      <RecommendationHeader imageUrl={cityImageUrl} address={address} error={error} />
      <PlacesList address={address} />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
