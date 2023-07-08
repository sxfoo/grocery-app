import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Unv_setting from "../screens/Unv_setting";
import Settings from "../screens/Settings";
import SignInScreen from "../screens/forSignInProcess/forSignIn/SignInScreen";
import ResetPasswordScreen from "../screens/forSignInProcess/forResetPassword/ResetPasswordScreen";
import { createAnimatedPropAdapter } from "react-native-reanimated";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from "react-native-paper";

import AccountDeletionScreen from "../screens/forSignInProcess/forAccountDeletion/AccountDeletionScreen";

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export const SettingsStack = () => {

	const theme = useTheme();

	return (
		<Stack.Navigator
			initialRouteName="Settings"
			screenOptions={{
				headerShown: true,
                headerStyle: {
                    backgroundColor: theme.colors.background,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0
                },
                headerTitleAlign: 'center',
                presentation: 'card',
                headerMode: 'screen',
                ...TransitionPresets.SlideFromRightIOS
            }}
		>
			<Stack.Screen
				name="Settings"
				component={Settings}
			/>

			<Stack.Screen
				name="Reset Password"
				component={ResetPasswordScreen}
			/>

			<Stack.Screen name="Delete Account" component={AccountDeletionScreen} />

		</Stack.Navigator>
	);
};

export default SettingsStack;
