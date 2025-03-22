import React, { useContext, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Alert 
} from "react-native";
import { AuthContext } from "../AuthContext"; // Import AuthContext
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../types";  // Import your navigator types

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext must be provided");
  }
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      // Call login to save username and navigate to Login screen
      await auth.login(username); // Log the user in after sign-up
      Alert.alert("Success", "Sign Up Successful! Please log in.");
      navigation.navigate("Login"); // Navigate to Login screen after sign-up
    } catch (error) {
      console.error("Error during sign up:", error);
      Alert.alert("Error", "An error occurred during sign-up. Please try again.");
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
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
        <Text style={styles.title}>Sign Up</Text>
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
            placeholder="Email"
            placeholderTextColor="#B0B0B0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#B0B0B0"
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            autoComplete="off"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            placeholderTextColor="#B0B0B0"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCorrect={false}
            autoComplete="off"
            keyboardType="default"
          />

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>OR</Text>
        </View>

        <Text style={styles.continueWithText}>Continue with...</Text>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: "https://thermalprocessing.com/wp-content/uploads/2023/04/facboo1.png" }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Already have an account? Log In</Text>
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
    height: 190,
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
    paddingTop: 10,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
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
    fontSize: 16,
    color: "#333",
  },
  usernameInput: {
    fontWeight: "600",
  },
  signUpButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  signUpButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  dividerContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444",
    letterSpacing: 1,
  },
  continueWithText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 13,
    color: "#444",
    fontWeight: "500",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
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
  loginButton: {
    marginTop: 15,
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default SignUpScreen;
