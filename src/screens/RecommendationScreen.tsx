import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';  // Import RouteProp
import { RootStackParamList } from '../types';

// Define the type for the params that the screen expects
type RecommendationRouteProp = RouteProp<RootStackParamList, 'Recommendation'>;

export const Recommendation: React.FC = () => {
  // Use the typed route to access the params
  const route = useRoute<RecommendationRouteProp>();  // Type the route

  const { address } = route.params;  // Now TypeScript knows that address is available
  console.log("xxxxx", address)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Places for {address}</Text>
      {/* Render your list of places here */}
    </View>
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
});
