import React from 'react';
import { Image } from 'react-native';

export const BarsIcon: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://cdn-icons-png.freepik.com/256/7688/7688995.png?semt=ais_hybrid',
      }}
      style={{ width: 28, height: 28 }}
      resizeMode="contain"
    />
  );
};
