import React from "react";
import { AppNavigator } from "./navigation/AppNavigation";

const App: React.FC = () => {
  return (
    <AppNavigator />  // Just render the AppNavigator here, it will handle the navigation and BottomNavigation
  );
};

export default App;
