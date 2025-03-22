import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

import HomeScreen from "../screens/Home";
import { DetailScreen } from "../screens/DetailScreen";
import { AIScreen } from "../screens/AIScreen";
import { BottomNavigation } from "../components/BottomNavigation";
import LoginScreen from "../screens/LoginScreen"; // Import LoginScreen
import SignUpScreen from "../screens/SignUpScreen"; // Import SignUpScreen
import { AuthContext, AuthProvider } from "../AuthContext"; // Import AuthContext
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Recommendation } from "../screens/RecommendationScreen";

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  const { user } = useContext(AuthContext); // Get user from context

  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.navigatorContainer}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user ? ( // If user exists, show main screens
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: "Details" }} />
                  <Stack.Screen name="AIScreen" component={AIScreen} />
                   <Stack.Screen name="Recommendation" component={Recommendation} />
                </>
              ) : ( // If user is not logged in, show Login and SignUp screens
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} />
                </>
              )}
            </Stack.Navigator>
          </View>

          {user && <BottomNavigation />} {/* Hide bottom nav if not logged in */}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
};

export const AppNavigator: React.FC = () => (
  <AuthProvider>
    <MainNavigator />
  </AuthProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
  navigatorContainer: {
    flex: 1,
    marginBottom: 10,
    paddingBottom: 40,
  },
});
