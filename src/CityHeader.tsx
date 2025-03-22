import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Svg, Path} from 'react-native-svg';

interface CityHeaderProps {
  cityImage: string;
  cityName: string;
  onBackPress: () => void;
}

export const CityHeader: React.FC<CityHeaderProps> = ({
  cityImage,
  cityName,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: cityImage}}
        style={styles.image}
        accessibilityLabel={`${cityName} skyline`}
      />
      <Text style={styles.cityName}>{cityName}</Text>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
          <Path
            d="M9.78125 16.25L16.7812 23.25L15 25L5 15L15 5L16.7812 6.75L9.78125 13.75H25V16.25H9.78125Z"
            fill="white"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 229,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cityName: {
    position: 'absolute',
    bottom: 20,
    left: 26,
    color: '#FFF',
    fontFamily: 'Kanit',
    fontSize: 40,
  },
  backButton: {
    position: 'absolute',
    top: 49,
    left: 10,
    width: 30,
    height: 30,
  },
});
