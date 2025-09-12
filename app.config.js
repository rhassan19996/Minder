import 'dotenv/config';

export default {
  expo: {
    name: 'minder',
    slug: 'minder',
    version: '1.0.0',
    scheme: 'minder', // Add this line - forces auth proxy usage

    web: {
      favicon: './assets/favicon.png',
    },

    experiments: {
      tsconfigPaths: true,
    },

    plugins: ['expo-secure-store', 'expo-web-browser'],

    orientation: 'portrait',
    icon: './assets/icon.png',

    userInterfaceStyle: 'light',

    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },

    extra: {
      googleExpoClientId: process.env.GOOGLE_EXPO_CLIENT_ID,
      googleIosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
      // googleAndroidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
      googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    },
  },
};
