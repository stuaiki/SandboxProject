import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { RecommendedSection } from "../components/RecommendedSection";
import { NavigationBar } from "../components/NavigationBar";
import { UserHeader } from "../components/UserHeader";
import { PlacesList } from "../components/SightseeingList";
import { CurrentLocationSites } from "../CurrentLocationSites";
import { DetailScreen } from "./DetailScreen"

const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Function to toggle modal visibility
  const closeModal = () => {
    setIsModalVisible(false); // Close the modal by setting isModalVisible to false
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <UserHeader />
          <SearchBar closeModal={closeModal}/>
          <PlacesList address='Japan, Hokkaido' />
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
