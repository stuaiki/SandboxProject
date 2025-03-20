import React from 'react';
import { Svg, Path } from 'react-native-svg';

export const PriceIcon: React.FC = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.03 20 4 16.97 4 12C4 7.03 7.03 4 12 4C16.97 4 20 7.03 20 12C20 16.97 16.97 20 12 20ZM11 5H13V11.29L14.29 9.99L15 10.7L12 13.7L9 10.7L9.71 9.99L11 11.29V5Z"
      fill="#2894D1"  // Color of the icon, adjust as needed
    />
  </Svg>
);
