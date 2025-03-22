import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/Home";
import { DetailScreen } from "../screens/DetailScreen";
import { AIScreen } from "../screens/AIScreen";
import { BottomNavigation } from "../components/BottomNavigation";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { AuthContext, AuthProvider } from "../AuthContext";
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Recommendation } from "../screens/RecommendationScreen";
import { RootStackParamList } from "../types";

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user } = authContext;

  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.navigatorContainer}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user ? (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: "Details" }} />
                  <Stack.Screen name="AIScreen" component={AIScreen} />
                  <Stack.Screen name="Recommendation" component={Recommendation} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} />
                </>
              )}
            </Stack.Navigator>
          </View>
          {user && <BottomNavigation />}
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
