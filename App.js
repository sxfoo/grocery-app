import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/AllLists';
import ListScreen from './screens/List';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ListStack() {
  return (
    /* Stack Navigation for displaying Grocery List. Refer to screens directory */
    <Stack.Navigator>
      <Stack.Screen name="All Lists" component={HomeScreen} />
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator >
  );
}

export default function App() {

  /* Placeholder custom theme using react-navigation
     In the future we can use other libraries (react native paper etc) 
     for theming as well? */
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
    /* React Native Paper requirements */
    <PaperProvider>

      {/* React Native Navigation container. For Stack, Tabs, Drawer navigation */}
      <NavigationContainer theme={CustomTheme}>

          <Tab.Navigator
            screenOptions={{
              tabBarHideOnKeyboard: Platform.OS!== 'ios',
              tabBarStyle: { position: 'absolute' }
            }}>

            <Tab.Screen
              name="Grocery List"
              component={ListStack}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="view-list" color={color} size={size} />
                ),
                title: 'Grocery List'
              }} />

          </Tab.Navigator>

      </NavigationContainer>

    </PaperProvider >
  );
}
