import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Settings from "../screens/Settings";
import SignInScreen from "../screens/forSignInProcess/forSignIn/SignInScreen";
import ResetPasswordScreen from "../screens/forSignInProcess/forResetPassword/ResetPasswordScreen";
import { createAnimatedPropAdapter } from "react-native-reanimated";

const Stack = createNativeStackNavigator()

const SettingsStack = () => {
  return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="SignIn" component={SignInScreen} />
			<Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
		</Stack.Navigator>
	);
};

export default SettingsStack;
