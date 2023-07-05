import AllListsScreen from '../screens/forGroceryListStack/AllLists';
import ListScreen from '../screens/forGroceryListStack/List';
import SearchItems from '../screens/forGroceryListStack/SearchItems';
import ListSettings from '../screens/forGroceryListStack/ListSettings';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useTheme, IconButton } from 'react-native-paper'

import { auth } from '../../firebaseConfig'

const Stack = createStackNavigator();

/* Stack for displaying Grocery List. Refer to screens directory */
export default function ListStack() {

    const theme = useTheme();

    return (

        <Stack.Navigator
            initialRouteName='All Lists'
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
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >

            {/* 
                AllLists.js is the screen that shows all of the 
                separated grocery lists the user has created
            */}
            <Stack.Screen
                name="All Lists"
                component={AllListsScreen}
                initialParams={{}}
                options={() => ({
                    gestureDirection: 'horizontal-inverted',
                    headerLeft: null,
                })}
            />

            {/*
                ListSettings.js is a screen where the user 
                can edit the configuration of the created list.
            */}
            <Stack.Screen
                name="List Settings"
                component={ListSettings}
                options={() => ({
                    ...TransitionPresets.ModalPresentationIOS,
                })}
            />

            {/* 
                List.js is the screen which contains a list of all placed grocery items 
                in the single grocery list
            */}
            <Stack.Screen
                name="List"
                component={ListScreen}
                initialParams={{ title: 'Home' }}
                options={({ route, navigation }) => ({
                    title: route.params.listMetaData.title,
                    headerLeft: () => (
                        <IconButton
                            icon="view-list"
                            size={24}
                            onPress={() => navigation.navigate('All Lists')}
                        />
                    ),

                })}
            />

            {/* 
                SearchItems.js is the screen which 
                allows users to search for their items to be 
                placed in their grocery list
            */}
            <Stack.Screen
                name="Search Items"
                component={SearchItems}
            />

        </Stack.Navigator>

    );
}