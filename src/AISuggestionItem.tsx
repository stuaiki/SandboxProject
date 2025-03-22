import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface SuggestionItemProps {
  title: string;
  subtitle: string;
}

export const AISuggestionItem: React.FC<SuggestionItemProps> = ({title, subtitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    display: 'flex',
    paddingLeft: 6,
    paddingRight: 28,
    paddingTop: 7,
    paddingBottom: 18,
    flexDirection: 'column',
  },
  title: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 14,
    fontFamily: 'Kanit',
  },
  subtitle: {
    color: 'rgba(179, 180, 186, 1)',
    fontSize: 10,
    fontFamily: 'Kanit',
    marginTop: 4,
  },
});

