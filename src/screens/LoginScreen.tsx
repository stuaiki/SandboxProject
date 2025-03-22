import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { AuthContext } from "../AuthContext";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await auth?.login(username);
      // No need to call navigation.navigate("Home") here;
      // the navigator will re-render based on auth.user.
    } catch (error) {
      Alert.alert("Error", "An error occurred during login. Please try again.");
    }
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
            style={[styles.input, styles.usernameInput]}
            placeholder="Username"
            placeholderTextColor="#B0B0B0"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#B0B0B0"
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

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "flex-start",
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
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: "#007BFF",
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
    marginBottom: 15,
  },
  dividerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    letterSpacing: 1,
  },
  continueWithText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
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
    width: 150,
    justifyContent: "center",
  },
  socialButtonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  signUpButton: {
    marginTop: 20,
    alignItems: "center",
  },
  signUpButtonText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
  usernameInput: {
    fontWeight: "600", // Make the username input text a bit bolder
    // You can add more custom styles here if desired
  },
});

export default LoginScreen;
