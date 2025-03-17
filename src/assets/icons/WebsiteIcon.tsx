import React from 'react';
import {Image} from 'react-native';

export const WebsiteIcon: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e0d3089d18b8ed93aca0786e46496ff2408c9ee8',
      }}
      style={{width: 16, height: 16}}
      resizeMode="contain"
    />
  );
};
