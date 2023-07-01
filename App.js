import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import MainBottomTabStack from './src/navigation/MainBottomTabStack';
import SettingsStack from './src/navigation/SettingsStack';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export default function App() {

  /* Use MD3LightTheme && LightTheme together for Light theme 
     Use MD3DarkTheme && DarkTheme together for Dark theme 
     Read more at >> https://callstack.github.io/react-native-paper/docs/guides/theming */

  /* PaperProvider => React Native Paper requirements 
     NavigationContainer => React Native Navigation container. For Stack, Tabs, Drawer navigation etc*/

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer theme={DarkTheme}>
        <MainBottomTabStack />
        {/*<SettingsStack />*/}
      </NavigationContainer>
    </PaperProvider>
  );
}
