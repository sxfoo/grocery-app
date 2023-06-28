import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import ProfileStack from './ProfileStack';
import ListStack from './GroceryListStack'


const BottomTab = createMaterialBottomTabNavigator();

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
                    tabBarIcon: 'view-list'
                }}
            />

            <BottomTab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    headerShown: false, /*used to be true*/
                    title: 'Profile',
                    tabBarIcon: 'account-outline'
                }}
            />

        </BottomTab.Navigator>
    );
}