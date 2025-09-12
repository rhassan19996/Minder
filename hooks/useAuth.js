import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import React, { createContext, useContext, useEffect, useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

const { googleExpoClientId, googleIosClientId, googleAndroidClientId, googleWebClientId } =
  Constants.expoConfig.extra;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: googleExpoClientId,
    iosClientId: googleIosClientId,
    androidClientId: googleAndroidClientId,
    webClientId: googleWebClientId, // ✅ must be defined for web
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(console.error);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{ user, request, promptAsync }}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
