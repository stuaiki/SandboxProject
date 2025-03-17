import React from 'react';
import {Image} from 'react-native';

export const HomeIcon: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b433e4982dc0e0fafe2ceec1c67d5427ad28e4e5',
      }}
      style={{width: 28, height: 28}}
      resizeMode="contain"
    />
  );
};
