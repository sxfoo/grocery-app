import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from 'react-native-paper'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/forSignInProcess/forSignIn/SignInScreen";
import SignUpScreen from "../screens/forSignInProcess/forSignUp/SignUpScreen";
import ConfirmEmailScreen from "../screens/forSignInProcess/forConfirmEmail/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/forSignInProcess/forForgotPassword/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/forSignInProcess/forResetPassword/ResetPasswordScreen";
import HomeScreen from "../screens/forGroceryListStack/AllLists";
import Unv_setting from "../screens/Unv_setting";

const SignIn = createStackNavigator()

const SignInStack = () => {

    const theme = useTheme();

    return (
        <SignIn.Navigator
            initialRouteName="Unv_setting"
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.background,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0
                },
                headerTitleAlign: 'center',
                presentation: 'card',
                headerMode: 'screen',
                title: 'Settings',
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            <SignIn.Screen
                name="Unv_setting"
                component={Unv_setting}
            />

            <SignIn.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                   ...TransitionPresets.ScaleFromCenterAndroid
                }}
            />

            <SignIn.Screen
                name="SignUp"
                component={SignUpScreen}
            />

            <SignIn.Screen
                name="ConfirmEmail"
                component={ConfirmEmailScreen}
            />

            <SignIn.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
            />

            <SignIn.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
            />

        </SignIn.Navigator>
    )
}

export default SignInStack;
