import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="ChatScreen" onPress={() => navigation.navigate('Chat')} />
      <Button title="LoginScreen" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default HomeScreen;
