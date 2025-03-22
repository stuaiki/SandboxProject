import React from 'react';
import {View, StyleSheet} from 'react-native';
import { AISuggestionItem } from './AISuggestionItem';

export const AISuggestionList: React.FC = () => {
  return (
    <View style={styles.container}>
      <AISuggestionItem title="Plan my trip" subtitle="anywhere in the world" />
      <AISuggestionItem
        title="What should I do today..."
        subtitle="to experience Florida like a local"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    display: 'flex',
    marginTop: 530,
    width: '100%',
    maxWidth: 346,
    alignItems: 'stretch',
    gap: 15,
  },
});
