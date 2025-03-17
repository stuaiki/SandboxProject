import React from 'react';
import {Image} from 'react-native';

export const TimeIcon: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a96e81b2b25afced468e94df1d49a8fc318a476a',
      }}
      style={{width: 16, height: 16}}
      resizeMode="contain"
    />
  );
};
