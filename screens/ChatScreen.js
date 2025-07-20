import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>ChatScreen</Text>
      <Button
        title="HomeScreen"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default ChatScreen;
