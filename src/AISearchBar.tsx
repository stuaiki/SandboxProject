import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

interface AISearchBarProps {
  onSubmit: (text: string) => void;
}

export const AISearchBar: React.FC<AISearchBarProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask me anything..."
        placeholderTextColor="#B0B0B0"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/3f859ac61ca447c08465fb745bd43c61/6d0ae5777992abbe254342496ead6f2ac178661d?placeholderIfAbsent=true',
            }}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/3f859ac61ca447c08465fb745bd43c61/23c2acb738e045baaf0bf94a878304b402e26cb5?placeholderIfAbsent=true',
          }}
          style={styles.icon}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/3f859ac61ca447c08465fb745bd43c61/77f74a7854f94e0eef0cf1df8d46f8e33abcd901?placeholderIfAbsent=true',
          }}
          style={styles.icon}
          resizeMode="contain"
        />
        <View style={styles.searchButton}>
          <Image
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/3f859ac61ca447c08465fb745bd43c61/fafa7b344649b3747f4ffadc170f2be38edf0511?placeholderIfAbsent=true',
            }}
            style={styles.searchIcon}
            resizeMode="contain"
          />
          <Text style={styles.searchText}>Search</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    display: 'flex',
    marginTop: 10,
    width: '100%',
    paddingLeft: 6,
    paddingRight: 75,
    paddingTop: 13,
    paddingBottom: 3,
    flexDirection: 'column',
  },
  placeholder: {
    color: '#000',
    fontSize: 17,
    opacity: 0.5,
    fontFamily: 'Kanit',
  },
  iconContainer: {
    display: 'flex',
    marginTop: 38,
    alignItems: 'stretch',
    gap: 5,
    flexDirection: 'row',
  },
  icon: {
    width: 18,
    height: 18,
    marginVertical: 'auto',
  },
  searchButton: {
    borderRadius: 10,
    display: 'flex',
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#000',
  },
  searchIcon: {
    width: 14,
    height: 14,
  },
  searchText: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 1)',
  },
});
