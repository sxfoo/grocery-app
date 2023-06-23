import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import {NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/AllLists';
import ListScreen from './screens/List';
import Trial from './screens/Trial';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ListStack() {
  return (
    /* Stack Navigation for displaying Grocery List. Refer to screens directory */
    <Stack.Navigator>
      <Stack.Screen name="All Lists" component={HomeScreen} />
      <Stack.Screen name="List" component={ListScreen} initialParams={{ title: 'New list' }} options={({ route }) => ({ title: route.params.title })} />
      <Stack.Screen name="Trial" component={Trial} />
    </Stack.Navigator>
  );
}

export default function App() {

  /* Placeholder custom theme using react native paper
     In the future we can use other libraries 
     for theming as well? */
     
  /* const CustomTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      primary: '#f5f7fa',
      background: '#121212',
      card: '#121212',
      border: 'rgb(199, 199, 204)',
    },
  } */

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  return (
    /* React Native Paper requirements */
    <PaperProvider theme={MD3DarkTheme}>

      {/* React Native Navigation container. For Stack, Tabs, Drawer navigation */}
      <NavigationContainer theme={DarkTheme}>

        {/* Bottom Tab Navigation */}
        <Tab.Navigator
          screenOptions={{
            tabBarHideOnKeyboard: Platform.OS !== 'ios',
            tabBarStyle: {
              backgroundColor: '#2d2d2d',
              position: 'absolute',
              borderTopWidth: 0
            }
          }}>

          {/* Grocery List Tab. Goes to ListStack (see function above) */}
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

    </PaperProvider>
  );
}
