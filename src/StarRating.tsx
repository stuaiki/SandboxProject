import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface StarRatingProps {
  rating: number;
}

const STAR_WIDTH = 25;
const STAR_HEIGHT = 25;
const starPath =
  "M12.5 0L15.4 8.1L24.3 9.3L17.2 15L19.1 23.8L12.5 19.2L5.9 23.8L7.8 15L0.7 9.3L9.6 8.1L12.5 0Z";

interface StarProps {
  fill: number; // fill is a number between 0 and 1 (in increments of 0.1 now)
  index: number;
}

const Star: React.FC<StarProps> = ({ fill, index }) => {
  // Create a unique clip id for each star
  const clipId = `clip-${index}`;
  
  return (
    <Svg width={STAR_WIDTH} height={STAR_HEIGHT} viewBox="0 0 25 25">
      <Defs>
        <ClipPath id={clipId}>
          <Rect x="0" y="0" width={STAR_WIDTH * fill} height={STAR_HEIGHT} />
        </ClipPath>
      </Defs>
      {/* Draw the star in gray (empty state) */}
      <Path d={starPath} fill="#A8A8A8" />
      {/* If fill > 0, draw the filled portion clipped to the percentage */}
      {fill > 0 && (
        <Path d={starPath} fill="#2894D1" clipPath={`url(#${clipId})`} />
      )}
    </Svg>
  );
};

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Display 5 stars; for each, calculate how filled it should be in increments of 0.1.
  const stars = [];
  for (let i = 0; i < 5; i++) {
    // Calculate raw fill value for this star (between 0 and 1)
    let starFill = rating - i;
    if (starFill < 0) starFill = 0;
    if (starFill > 1) starFill = 1;
    // Round to the nearest 0.1 increment
    const starFillRounded = Math.round(starFill * 10) / 10;
    stars.push(<Star key={i} fill={starFillRounded} index={i} />);
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StarRating;
