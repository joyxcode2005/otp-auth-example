import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import './global.css';

export default function App() {
  return (
    <SafeAreaView>
      <Text className='text-red font-semibold text-5xl'>Hello, Expo!</Text>
    </SafeAreaView>
  );
}
