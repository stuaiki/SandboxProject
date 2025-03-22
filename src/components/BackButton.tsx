// BackButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { BackIcon } from '../assets/icons/BackIcon';
import { useNavigation } from '@react-navigation/native';

export const BackButton: React.FC = () => {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={onBackPress} style={styles.fixedBackButton}>
      <BackIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fixedBackButton: {
    position: 'absolute',
    top: 30,    // Position the back button at the top of the screen
    left: 20,   // Align it to the left
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure it stays on top of other elements
  },
});
