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
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../firebaseConfig';
import SignInStack from './Unverified_Settings_Stack';
import checkifauth from '../utilityFunctions/checkifauth';


/* Bottom Tab Navigation. */
export default function MainBottomTabStack() {
    //This part of the code checks if an user has been authenticated or not
    const BottomTab = createBottomTabNavigator();
    /*const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        const unsubscribeAuthStateChanged = onAuthStateChanged(
            auth, (authenticatedUser) => {
                if (authenticatedUser) {
                    setIsAuth(true); //If a user has logged in, it's set to true
                }
                else{
                    setIsAuth(false); //otherwise set to false
                }
            }
        );
        //!CheckLater
        return () => unsubscribeAuthStateChanged();
    }, []);*/

    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarStyle: {
                    borderTopWidth: 0,
                }
            }}
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
                options={{
                    headerShown: false, /*used to be true*/
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="settings" color={color} size={size} />
                    ),
                }}
            />

        </BottomTab.Navigator>
    );
}
