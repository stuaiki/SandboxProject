import * as React from "react";
import { View, StyleSheet, Image } from "react-native";

export const UserAvatar: React.FC = () => {
  return (
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/87/56/f8/8756f8b72a77f846323eac772979ccab.jpg",
          }}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
  );
};

const styles = StyleSheet.create({
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
});