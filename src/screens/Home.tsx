import React from "react";
import { View, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { RecommendedSection } from "../components/RecommendedSection";
import { NavigationBar } from "../components/NavigationBar";
import { UserHeader } from "../components/UserHeader";
import { PlacesList } from "../components/SightseeingList";
import { CurrentLocationSites } from "../CurrentLocationSites";
import { DetailScreen } from "./DetailScreen"

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <UserHeader />
          <SearchBar />
          <PlacesList />
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

export default Home;
