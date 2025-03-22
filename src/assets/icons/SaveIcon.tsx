import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';

interface SaveIconProps {
  name?: string; // Optional - if you need to reference the icon
  size: number;
  color: string;
  style?: StyleProp<ImageStyle>;
}

export const SaveIcon: React.FC<SaveIconProps> = ({ name, size, color, style }) => {
  return (
    <Image
      source={{
        uri: 'https://cdn-icons-png.flaticon.com/512/494/494568.png',
      }}
      style={[{ width: size, height: size, tintColor: color }, style]}
      resizeMode="contain"
    />
  );
};
