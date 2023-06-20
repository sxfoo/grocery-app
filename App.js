import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/AllLists';
import ListScreen from './screens/List';

const Stack = createNativeStackNavigator();

export default function App() {

  const CustomTheme = {
    dark: false,
    colors: {
      primary: '#f5f7fa',
      background: '#1f2933',
      card: '#3e4c59',
      text: '#f5f7fa',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  }

  return (
    <PaperProvider>
      <NavigationContainer theme={CustomTheme}>
        <Stack.Navigator>
          <Stack.Screen name="All Lists" component={HomeScreen} />
          <Stack.Screen name="List" component={ListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
