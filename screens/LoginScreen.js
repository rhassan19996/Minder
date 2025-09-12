import { View, Text, Button } from 'react-native';
import React from 'react';
import useAuth from 'hooks/useAuth';

const LoginScreen = () => {
  const { user, promptAsync, request } = useAuth();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">Login Screen</Text>

      {user ? (
        <Text className="mt-4">Welcome {user.name} 👋</Text>
      ) : (
        <Button disabled={!request} title="Login with Google" onPress={() => promptAsync()} />
      )}
    </View>
  );
};

export default LoginScreen;
