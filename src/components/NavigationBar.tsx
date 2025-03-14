import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export const NavigationBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navItems}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bc45f759344dfc030e261872e35fa3124db122d99de46bbc9cc6807d7056b87a?placeholderIfAbsent=true&apiKey=3f859ac61ca447c08465fb745bd43c61',
          }}
          style={styles.navIcon}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/22d47fb947f8b338ff424e04b8560b3225d31e807020089cc563c8c498523403?placeholderIfAbsent=true&apiKey=3f859ac61ca447c08465fb745bd43c61',
          }}
          style={styles.navIcon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.homeIndicatorContainer}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  navItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  homeIndicatorContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  homeIndicator: {
    width: 128,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
  },
});
