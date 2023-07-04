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

export const SettingsStack = () => {
  return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Settings">
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
		</Stack.Navigator>
	);
};

export default SettingsStack;
