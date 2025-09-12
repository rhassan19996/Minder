import React, { createContext, useContext, useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Platform-specific storage solution
let SecureStore;
if (Platform.OS === 'web') {
  // Use localStorage for web
  SecureStore = {
    getItemAsync: async (key) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    setItemAsync: async (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
    },
    deleteItemAsync: async (key) => {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('Error removing from localStorage:', e);
      }
    },
  };
} else {
  // Use expo-secure-store for native platforms
  SecureStore = require('expo-secure-store');
}

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

// Load Google Client IDs from app config
const { googleExpoClientId, googleIosClientId, googleAndroidClientId, googleWebClientId } =
  Constants.expoConfig?.extra || {};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Auth Request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: googleExpoClientId,
    iosClientId: googleIosClientId,
    androidClientId: googleAndroidClientId,
    webClientId: googleWebClientId,
  });

  // Load user from storage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Error loading user:', e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Handle Google login response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      })
        .then((res) => res.json())
        .then(async (data) => {
          setUser(data);
          await SecureStore.setItemAsync('user', JSON.stringify(data));
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [response]);

  // Logout
  const logout = async () => {
    try {
      setUser(null);
      await SecureStore.deleteItemAsync('user');
    } catch (e) {
      console.error('Error during logout:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, request, promptAsync, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
