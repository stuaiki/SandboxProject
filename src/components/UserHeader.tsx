import * as React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";

export const UserHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/87/56/f8/8756f8b72a77f846323eac772979ccab.jpg",
          }}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Hi Thomas</Text>
        <Text style={styles.subtitleText}>
          Pick a city and plan your dream vacation!
        </Text>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Make avatar & text horizontal
    alignItems: "center", // Align items vertically
    padding: 16, // Adjust padding
    backgroundColor: "#fff", // Background matches UI
  },
  avatarContainer: {
    width: 60, // Set avatar size
    height: 60,
    borderRadius: 30, // Make it circular
    overflow: "hidden", // Crop image within circle
    backgroundColor: "#ddd", // Placeholder color
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    marginLeft: 12, // Space between avatar and text
    flex: 1, // Allow text to fill remaining space
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  subtitleText: {
    fontSize: 14,
    color: "#666",
  },
});