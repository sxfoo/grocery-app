import AllListsScreen from '../screens/forGroceryListStack/AllLists';
import ListScreen from '../screens/forGroceryListStack/List';
import Trial from '../screens/Trial';
import Settings from '../screens/Settings';
import SearchItems from '../screens/forGroceryListStack/SearchItems';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();

/* Stack for displaying Grocery List. Refer to screens directory */
export default function ListStack() {
    const theme = useTheme()

    return (

        <Stack.Navigator initialRouteName='All Lists'>

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
                name="Trial"
                component={Trial}
            />

            <Stack.Screen
                name="Search Items"
                component={SearchItems}
            />

            <Stack.Screen
                name = "Settings"
                component={Settings}
            />

        </Stack.Navigator>
    );
}