import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileStack from './ProfileStack';
import ListStack from './GroceryListStack'
import SettingsStack from './Verified_Settings_Stack';
import SignInStack from './Unverified_Settings_Stack';
import { checkifauth } from '../utilityFunctions/checkifauth';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// function to set bottom tabs visibilty for settings screen
const VisibleBottomTabs = (route) => {
    
    // If the focused route is not found, we need to assume it's the initial screen
    //if undefined, routename = Unv_setting
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Unv_setting";

    if (routeName === "Unv_setting" || routeName === "Settings") {
        return true;
    } else {
        return false;
    }
}

/* Bottom Tab Navigation. */
export default function MainBottomTabStack() {

    //This part of the code checks if an user has been authenticated or not
    const BottomTab = createBottomTabNavigator();
 
    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarStyle: {
                    borderTopWidth: 0,
                }
            }}
            id='BottomTabNav'
        >

            {/* Grocery List Tab. Goes to ListStack (see navigatlsion/ListStack.js) */}
            <BottomTab.Screen
                name="Grocery List"
                component={ListStack}
                options={{
                    headerShown: false,
                    title: 'Grocery List',
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="checklist" color={color} size={size} />
                    ),
                }}
            />

            <BottomTab.Screen
                name="Expenses"
                component={ProfileStack}
                options={{
                    headerShown: false, /*used to be true*/
                    title: 'Expenses',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="back-in-time" color={color} size={size} />
                    ),
                }}
            />

            <BottomTab.Screen
                name="Settings Stack"
                component={checkifauth() ? SettingsStack : SignInStack}
                options={({ route }) => {
                    const bottomTabVisible = VisibleBottomTabs(route);
                    const options = {
                        headerShown: false,
                        title: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="settings" color={color} size={size} />
                        )
                    };
                    if (!bottomTabVisible) {
                        options.tabBarStyle = { display: "none" };
                    }
                    return options;
                }}
            />

        </BottomTab.Navigator>
    );
}
