import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/Home";
import { DetailScreen } from "../DetailScreen";
import AIPage from "../screens/AIPage";
import { BottomNavigation } from "../BottomNavigation";  // Import BottomNavigation here

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="AIPage" component={AIPage} />
      </Stack.Navigator>
      <BottomNavigation />  {/* Place BottomNavigation here */}
    </NavigationContainer>
  );
};

export default AppNavigator;
