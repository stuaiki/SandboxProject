import React from 'react';
import {View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {UserHeader} from '../components/UserHeader';
import {AdditionalPlaces} from '../AdditionalPlaces';

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <UserHeader />
        <AdditionalPlaces />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default Home;
