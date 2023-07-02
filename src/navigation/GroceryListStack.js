import AllListsScreen from '../screens/forGroceryListStack/AllLists';
import ListScreen from '../screens/forGroceryListStack/List';
import SearchItems from '../screens/forGroceryListStack/SearchItems';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper'

const Stack = createNativeStackNavigator();

/* Stack for displaying Grocery List. Refer to screens directory */
export default function ListStack() {

    const theme = useTheme();

    return (

        <Stack.Navigator 
            initialRouteName='All Lists'
            screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
                headerTitleAlign: 'center'
            }}
            >

            <Stack.Screen
                name="All Lists"
                component={AllListsScreen}
            />

            <Stack.Screen
                name="List"
                component={ListScreen}
                initialParams={{ title: 'New list' }}
                options={({ route }) => ({
                    title: route.params.title
                })}
            />

            <Stack.Screen
                name="Search Items"
                component={SearchItems}
            />

        </Stack.Navigator>

    );
}