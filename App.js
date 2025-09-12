import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from 'hooks/useAuth';
import StackNavigator from './StackNavigator';
import { View, ActivityIndicator } from 'react-native';
import useAuth from 'hooks/useAuth';
import { Provider as PaperProvider } from 'react-native-paper';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <StackNavigator />;
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
