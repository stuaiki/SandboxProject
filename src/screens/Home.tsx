import React, { useState, useContext } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View, Button } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthContext } from "../AuthContext"; // Import AuthContext
import { SearchBar } from "../components/SearchBar";
import { UserHeader } from "../components/UserHeader";
import { PlacesList } from "../components/PlacesList";
import { BottomNavigation } from "../components/BottomNavigation";

export const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const auth = useContext(AuthContext);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleLogout = async () => {
    await auth?.logout();
    // Navigation will update automatically based on auth state.
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Pass the username from the AuthContext to the UserHeader */}
          <UserHeader username={auth?.user || "Guest"} />
          <SearchBar closeModal={closeModal} />
        </View>
      </ScrollView>
      
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
  logoutButtonContainer: {
    position: "absolute",
    top: 1,
    right: 20,
    zIndex: 1,
  },
});

export default Home;
