import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const BackIcon: React.FC = () => {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
      <Path
        d="M9.78125 16.25L16.7812 23.25L15 25L5 15L15 5L16.7812 6.75L9.78125 13.75H25V16.25H9.78125Z"
        fill="white"
      />
    </Svg>
  );
};
