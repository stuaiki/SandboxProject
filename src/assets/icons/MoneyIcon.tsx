import React from 'react';
import {Image} from 'react-native';

export const MoneyIcon: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://www.freeiconspng.com/uploads/coins-money-icon-21.png',
      }}
      style={{width: 30, height: 30}}
      resizeMode="contain"
    />
  );
};
