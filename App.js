import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from 'hooks/useAuth';

export default function App() {
  return (
    <>
      <NavigationContainer>
        {/* HOC -  Higher Order Component */}
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}
