import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { DetailScreen } from "../DetailScreen";
import { AIScreen } from "../screens/AIScreen";
import { BottomNavigation } from "../BottomNavigation";  // Import BottomNavigation here

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: "Details" }} />
        <Stack.Screen name="AIScreen" component={AIScreen} />
      </Stack.Navigator>
      <BottomNavigation />
    </NavigationContainer>
  );
};
