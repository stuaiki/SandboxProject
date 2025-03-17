import React from 'react';
import {Image} from 'react-native';

export const FavoritesIcon: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/88e8a2f5155c187f03f55f05983c94ed42c58cf6',
      }}
      style={{width: 28, height: 28}}
      resizeMode="contain"
    />
  );
};
