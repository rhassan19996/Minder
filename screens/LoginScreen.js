import React, { useEffect, useRef } from 'react';
import { View, ImageBackground, Image, Animated } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import useAuth from 'hooks/useAuth';

const LoginScreen = () => {
  const { user, promptAsync, request } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
      className="flex-1 justify-center"
      resizeMode="cover">
      <View className="flex-1 items-center justify-center bg-black/40 px-6">
        <Animated.View style={{ opacity: fadeAnim }} className="items-center">
          {/* Logo */}
          <Surface
            className={`mb-6 h-24 w-24 items-center justify-center rounded-full ${
              user ? 'border-2 border-green-500' : ''
            }`}
            elevation={6}>
            <Image source={{ uri: 'https://placekitten.com/100/100' }} className="h-20 w-20" />
          </Surface>

          {/* App Name */}
          <Text
            variant="headlineMedium"
            className={`mb-8 font-bold text-white ${user ? 'text-yellow-400' : ''}`}>
            QALB
          </Text>

          {/* Welcome message */}
          {user && (
            <Text variant="bodyMedium" className="mb-6 text-green-500">
              Welcome {user.name} 👋
            </Text>
          )}

          {/* Google Sign-In */}
          {!user && (
            <Surface className="w-4/5 overflow-hidden rounded-3xl" elevation={4}>
              <Button
                mode="contained"
                icon="google"
                onPress={() => promptAsync()}
                disabled={!request}
                className="h-12 justify-center rounded-3xl bg-red-600">
                Sign in with Google
              </Button>
            </Surface>
          )}
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
