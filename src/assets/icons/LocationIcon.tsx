import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const LocationIcon: React.FC = () => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M14 7.2593C14 10.5321 10.25 14.6667 8 14.6667C5.75 14.6667 2 10.5321 2 7.2593C2 3.9865 4.68629 1.33337 8 1.33337C11.3137 1.33337 14 3.9865 14 7.2593Z"
        stroke="#28303F"
        strokeWidth="1.5"
      />
      <Path
        d="M10 7.33337C10 8.43794 9.10457 9.33337 8 9.33337C6.89543 9.33337 6 8.43794 6 7.33337C6 6.2288 6.89543 5.33337 8 5.33337C9.10457 5.33337 10 6.2288 10 7.33337Z"
        stroke="#28303F"
        strokeWidth="1.5"
      />
    </Svg>
  );
};
