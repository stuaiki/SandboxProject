import React from 'react';
import {AppNavigator} from './navigation/AppNavigation';
import {BottomNavigation} from './BottomNavigation';

const App: React.FC = () => {
  return (
    <>
      <AppNavigator />
      <BottomNavigation />
    </>
  );
};

export default App;
