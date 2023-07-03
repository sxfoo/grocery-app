import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Unv_setting from "../screens/Unv_setting";
import Settings from "../screens/Settings";
import SignInScreen from "../screens/forSignInProcess/forSignIn/SignInScreen";
import ResetPasswordScreen from "../screens/forSignInProcess/forResetPassword/ResetPasswordScreen";
import { createAnimatedPropAdapter } from "react-native-reanimated";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ForgotPasswordScreen from "../screens/forSignInProcess/forForgotPassword/ForgotPasswordScreen";
import SignUpScreen from "../screens/forSignInProcess/forSignUp/SignUpScreen";
import ConfirmEmailScreen from "../screens/forSignInProcess/forConfirmEmail/ConfirmEmailScreen";


const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const SignInStack2 = () => {
	return(
		<Drawer.Navigator useLegacyImplementation screenOptions={{headerShown: false}}>
			<Drawer.Screen name = "SignInScreen" component = {SignInScreen}/>
			<Drawer.Screen name = "ResetPassword" component={ResetPasswordScreen}/>
			<Drawer.Screen name = "ForgotPassword" component = {ForgotPasswordScreen}/>
			<Drawer.Screen name = "SignUp" component={SignUpScreen}/>
			<Drawer.Screen name = "ConfirmEmail" component={ConfirmEmailScreen}/>
		</Drawer.Navigator>
	)
}

const SettingsStack = () => {
  return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Unv_setting">
			<Stack.Screen name="Unv_setting" component={Unv_setting}/>
			<Stack.Screen name="Settings" component={Settings} />
			{/*<Stack.Screen name="SignIn" component={SignInScreen} /> <Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />*/}
			<Stack.Screen name = "SignIn" component={SignInStack2}/>
		</Stack.Navigator>
	);
};

export default SettingsStack;
