import React from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

export const Loading: React.FC = () => {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
