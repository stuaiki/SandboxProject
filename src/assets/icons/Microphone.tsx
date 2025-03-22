import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';

interface MicrophoneIconProps {
  name?: string; // Optional - if needed for identification
  size: number;
  color: string;
  style?: StyleProp<ImageStyle>;
}

export const MicrophoneIcon: React.FC<MicrophoneIconProps> = ({ name, size, color, style }) => {
  return (
    <Image
      source={{
        uri: 'https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png',
      }}
      style={[{ width: size, height: size, tintColor: color }, style]}
      resizeMode="contain"
    />
  );
};
