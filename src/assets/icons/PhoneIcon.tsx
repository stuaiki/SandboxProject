import React from 'react';
import {Image} from 'react-native';

export const PhoneIcon: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/577e4a5ed7785babd4571cb0ab9ac3021c8b278a',
      }}
      style={{width: 16, height: 16}}
      resizeMode="contain"
    />
  );
};
