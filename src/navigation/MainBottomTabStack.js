import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListStack from './GroceryListStack'
import Trial from '../screens/Trial'

const BottomTab = createBottomTabNavigator();

/* Bottom Tab Navigation. */
export default function MainBottomTabStack() {
    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: Platform.OS !== 'ios',
                tabBarStyle: {
                    borderTopWidth: 0,
                },
            }}
        >

            {/* Grocery List Tab. Goes to ListStack (see navigation/ListStack.js) */}
            <BottomTab.Screen
                name="Grocery List"
                component={ListStack}
                options={{
                    headerShown: false,
                    title: 'Grocery List',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="view-list" color={color} size={size} />
                    ),
                }}
            />

            <BottomTab.Screen
                name="Profile"
                component={Trial}
                options={{
                    headerShown: true,
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-outline" color={color} size={size} />
                    ),
                }}
            />

        </BottomTab.Navigator>
    );
}