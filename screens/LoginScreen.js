import { View, Text } from 'react-native';
import React from 'react';
import useAuth from 'hooks/useAuth'; // Assuming useAuth is imported from hooks/useAuth

const LoginScreen = () => {
  const { user } = useAuth(); // Assuming useAuth is imported from hooks/useAuth
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;
