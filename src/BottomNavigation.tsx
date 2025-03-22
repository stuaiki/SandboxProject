import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export const BottomNavigation: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navIcons}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b433e4982dc0e0fafe2ceec1c67d5427ad28e4e5',
          }}
          style={styles.icon}
          accessibilityLabel="Home"
        />
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7287ac6161da0b8f670cfa2ebecfdee5e65b1d1e',
          }}
          style={styles.icon}
          accessibilityLabel="Map"
        />
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/832fde581b6cbcfb25df2fb55df575bec2c0fdd2',
          }}
          style={styles.icon}
          accessibilityLabel="Search"
        />
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/88e8a2f5155c187f03f55f05983c94ed42c58cf6',
          }}
          style={styles.icon}
          accessibilityLabel="Favorites"
        />
      </View>
      <View style={styles.bottomIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#FFF',
  },
  navIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 28,
    paddingHorizontal: 47,
  },
  icon: {
    width: 28,
    height: 28,
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#000',
    marginTop: 15,
    marginBottom: 7,
    alignSelf: 'center',
  },
});
