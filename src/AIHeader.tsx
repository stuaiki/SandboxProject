import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export const AIHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.builder.io/api/v1/image/assets/3f859ac61ca447c08465fb745bd43c61/52e57b49a94c96b1ca2c06596bd2fcf13f1f3c67?placeholderIfAbsent=true',
        }}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 21,
    paddingVertical: 12,
    flexDirection: 'column',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  logo: {
    aspectRatio: 2.57,
    width: 54,
    borderRadius: 32,
  },
});

