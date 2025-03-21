import React, { useContext } from "react";
import { View, SafeAreaView, ScrollView, StatusBar, StyleSheet, Button, Text } from "react-native";
import { AuthContext } from "../AuthContext"; // Import AuthContext
import { SearchBar } from "../components/SearchBar";
import { RecommendedSection } from "../components/RecommendedSection";
import { NavigationBar } from "../components/NavigationBar";
import { UserHeader } from "../components/UserHeader";
import { PlacesList } from "../components/SightseeingList";
import { CurrentLocationSites } from "../CurrentLocationSites";
import { DetailScreen } from "./DetailScreen";

const Home: React.FC = ({ navigation }) => {
  const auth = useContext(AuthContext); // Access user info and logout function

  // Handle user logout
  const handleLogout = async () => {
    await auth?.logout(); // Call logout function from AuthContext
    navigation.navigate("Login"); // Navigate back to Login screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <UserHeader />
      
          {/* Other components */}
          <SearchBar />
          <PlacesList />
        </View>
      </ScrollView>
      
      {/* Logout button positioned at the top-right corner */}
      {auth?.user && (
        <View style={styles.logoutButtonContainer}>
          <Button title="Log Out" onPress={handleLogout} />
        </View>
      )}
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
  userInfo: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  logoutButtonContainer: {
    position: "absolute",
    top: 1, // Move the button slightly higher
    right: 20,
    zIndex: 1, // Ensure the button is above other content
  },
  logoutButton: {
    width: 20, // Adjust width for a smaller button
    height: 30, // Adjust height for a smaller button
  },
});

export default Home;
