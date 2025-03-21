import React from 'react';
import { Image } from 'react-native';

export const SaveIcon: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://cdn-icons-png.flaticon.com/512/494/494568.png',
      }}
      style={{ width: 28, height: 28 }}
      resizeMode="contain"
    />
  );
};
