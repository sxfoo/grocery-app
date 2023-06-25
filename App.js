import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import MainBottomTabStack from './src/navigation/MainBottomTabStack';

export default function App() {

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  /* PaperProvider => React Native Paper requirements */
  /* NavigationContainer => React Native Navigation container. For Stack, Tabs, Drawer navigation */
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer theme={DarkTheme}>
        <MainBottomTabStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
