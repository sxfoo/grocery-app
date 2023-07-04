import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/forSignInProcess/forSignIn/SignInScreen";
import SignUpScreen from "../screens/forSignInProcess/forSignUp/SignUpScreen";
import ConfirmEmailScreen from "../screens/forSignInProcess/forConfirmEmail/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/forSignInProcess/forForgotPassword/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/forSignInProcess/forResetPassword/ResetPasswordScreen";
import HomeScreen from "../screens/forGroceryListStack/AllLists";

const SignIn = createNativeStackNavigator()

const SignInStack = () => {
    return (
        <SignIn.Navigator screenOptions={{ headerShown: false }} >
            <SignIn.Screen name="SignIn" component={SignInScreen} />
            <SignIn.Screen name="SignUp" component={SignUpScreen} />
            <SignIn.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <SignIn.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <SignIn.Screen name="ResetPassword" component={ResetPasswordScreen} />

            {/*Need to figure out a way to link it to homescreen stack, probably by using nested screen navigators*/}
            {/*<SignIn.Screen name="HomeScreen" component={HomeScreen}/>*/}
        </SignIn.Navigator>
        )}

export default SignInStack;
