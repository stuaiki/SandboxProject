import React, {ReactNode} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface InfoItemProps {
  icon: ReactNode;
  text: string;
  textStyle?: object;
  onPress?: () => void;
}

export const InfoItem: React.FC<InfoItemProps> = ({icon, text, textStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 5,
  },
  iconContainer: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#28303F',
    fontFamily: 'Kanit',
    fontSize: 14,
  },
});
