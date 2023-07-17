import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { useState } from 'react';
import { LogBox } from 'react-native';
import MainBottomTabStack from './src/navigation/MainBottomTabStack';
import ThemeContext from './src/themeContext';

LogBox.ignoreLogs(['Overriding previous layout animation']);

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

  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkTheme(!isDarkTheme);
    console.log(isDarkTheme);
  }

  const theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme
  const containerTheme = isDarkTheme ? DarkTheme : LightTheme;

  return (
		<ThemeContext.Provider value={{ isDarkTheme, toggleDarkMode }}>
			<PaperProvider theme={theme}>
				<NavigationContainer theme={containerTheme}>
					<MainBottomTabStack />
				</NavigationContainer>
			</PaperProvider>
		</ThemeContext.Provider>
	);
}
