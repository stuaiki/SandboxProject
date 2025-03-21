import {View, Text, Image} from 'react-native';

export function UserHeader() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 64,
        height: 48,
      }}>
      <Image
        source={{
          uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f070ac504aba5ef32e647c4e13968813dfd1fc92',
        }}
        style={{width: 45, height: 45, borderRadius: 22.5}}
      />
      <View style={{marginLeft: 12}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          Hi Thomas
        </Text>
        <Text style={{fontSize: 14, color: 'gray'}}>
          Pick a country and plan your dream vacation!
        </Text>
      </View>
    </View>
  );
}
