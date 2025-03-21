'use client';
import * as React from 'react';
import {View, TextInput} from 'react-native';

export function SearchBar() {
  return (
    <View style={{marginHorizontal: 24, marginTop: 28}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          width: '100%',
          borderRadius: 8,
          backgroundColor: '#F1F5F9',
          height: 47,
        }}>
        {/* SVG icon can be added as an Image or inline if needed */}
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
            marginLeft: 12,
            fontSize: 18,
            color: 'black',
            backgroundColor: 'transparent',
            opacity: 0.5,
            borderWidth: 0,
          }}
        />
      </View>
    </View>
  );
}
