import React from 'react';
import { Image } from 'react-native';

export const SearchIcon: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png',
      }}
      style={{ width: 20, height: 20 }}
      resizeMode="contain"
    />
  );
};
