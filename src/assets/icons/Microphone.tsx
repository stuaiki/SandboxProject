import React from 'react';
import { Image } from 'react-native';

export const MicrophoneIcon: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png',
      }}
      style={{ width: 28, height: 28 }}
      resizeMode="contain"
    />
  );
};
