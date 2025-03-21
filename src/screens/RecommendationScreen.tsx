import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';  
import { RootStackParamList } from '../types';
import { PlacesList } from '../components/SightseeingList';

type RecommendationRouteProp = RouteProp<RootStackParamList, 'Recommendation'>;

export const Recommendation: React.FC = () => {
  const route = useRoute<RecommendationRouteProp>();  // Get typed route
  
  const { address } = route.params;
console.log("Address received in Recommendation:", address);  // Check address again
<PlacesList address={address} />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}><Text>Recommended Places for {address}</Text></View>
      <ScrollView >
        <View style={styles.content}>
          <PlacesList address={address} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
});
