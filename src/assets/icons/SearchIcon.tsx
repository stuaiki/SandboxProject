import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';

interface SearchIconProps {
  name?: string; // Optional - not used here, but you can keep it if needed.
  size: number;
  color: string;
  style?: StyleProp<ImageStyle>; // Optional additional styles
}

export const SearchIcon: React.FC<SearchIconProps> = ({ name, size, color, style }) => {
  return (
    <Image
      source={{
        uri: 'https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png',
      }}
      style={[{ width: size, height: size, tintColor: color }, style]}
      resizeMode="contain"
    />
  );
};
