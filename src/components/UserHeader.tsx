import React from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import { UserAvatar } from "./UserAvatar";

interface UserHeaderProps {
  username: string;
}

export const UserHeader: React.FC<UserHeaderProps> = ({ username }) => {
  return (
    <View style={styles.container}>
      <UserAvatar />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Hi {username}</Text>
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
    flexDirection: "row", // Horizontal alignment
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
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

export default UserHeader;
