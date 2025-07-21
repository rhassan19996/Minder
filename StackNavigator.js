import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/HomeScreen';
import ChatScreen from 'screens/ChatScreen';
import LoginScreen from 'screens/LoginScreen'; // Assuming you have a LoginScreen component
import { use } from 'react';
import useAuth from 'hooks/useAuth'; // Assuming useAuth is imported from hooks/useAuth

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { user } = useAuth(); // Assuming useAuth returns the user object

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
