import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { DetailScreen } from "../screens/DetailScreen";
import { AIScreen } from "../screens/AIScreen";
import { BottomNavigation } from "../components/BottomNavigation";
import { SafeAreaView, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.navigatorContainer}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="DetailScreen"
                component={DetailScreen}
                options={{ title: "Details" }}
              />
              <Stack.Screen name="AIScreen" component={AIScreen} />
            </Stack.Navigator>
          </View>

          <BottomNavigation />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
};

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
    paddingBottom: 40
  },
});
