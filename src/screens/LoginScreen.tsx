import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { AuthContext } from "../AuthContext";

const LoginScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await auth?.login(username); // Call login function from AuthContext
    navigation.navigate("Home"); // Navigate to Home screen after login
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp"); // Navigate to SignUp screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://media.istockphoto.com/id/1497396873/photo/ready-for-starting-my-beach-holiday.jpg?s=612x612&w=0&k=20&c=Rfb7IbYAZR1hNTF6KUDYq8CVu9Yr4wRgK2VLZIZyORY=" }}
          style={styles.headerImage}
        />
        <View style={styles.gradientOverlay} />
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.title}>Log in</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, styles.usernameInput]} // Make username label dark like password
            placeholder="Username"
            placeholderTextColor="#B0B0B0" // Lighter color for the username placeholder
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#B0B0B0" // Lighter color for the password placeholder
            value={password}
            onChangeText={setPassword}
          />
          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>OR</Text>
        </View>

        <Text style={styles.continueWithText}>Continue with...</Text>

        {/* Social login options with icons */}
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: "https://thermalprocessing.com/wp-content/uploads/2023/04/facboo1.png",
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensures ScrollView expands to fill content
    backgroundColor: "#f9fafb",
    justifyContent: "flex-start", // Ensures all content is aligned to the top
  },
  header: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  mainContent: {
    padding: 20,
    paddingTop: 40,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "#007BFF", // Blue color for the login button
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  dividerContainer: {
    alignItems: "center",
    marginBottom: 15, // Reduced space between OR and Continue with
  },
  dividerText: {
    fontSize: 16,
    fontWeight: "600", // Increased font weight for a cleaner look
    color: "#444", // Darker color for a more professional tone
    letterSpacing: 1, // Subtle letter spacing for refinement
  },
  continueWithText: {
    textAlign: "center",
    marginVertical: 10, // Reduced margin for a more compact layout
    fontSize: 14,
    color: "#444", // A darker shade for a professional look
    fontWeight: "500", // Lighter weight for a more subtle tone
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 8,
  },
  socialButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    width: 150, // Added width for consistency
    justifyContent: "center", // Centering the text and icon
  },
  socialButtonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10, // Space between icon and text
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  signUpButton: {
    marginTop: 20, // Increased margin to ensure spacing
    alignItems: "center",
  },
  signUpButtonText: {
    fontSize: 16,
    color: "#007BFF", // Blue color for the sign up link
    fontWeight: "bold",
  },
});

export default LoginScreen;