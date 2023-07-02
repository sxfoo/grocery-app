import AllListsScreen from '../screens/forGroceryListStack/AllLists';
import ListScreen from '../screens/forGroceryListStack/List';
import SearchItems from '../screens/forGroceryListStack/SearchItems';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useTheme, IconButton } from 'react-native-paper'
import { Pressable } from 'react-native';

const Stack = createStackNavigator();

/* Stack for displaying Grocery List. Refer to screens directory */
export default function ListStack() {

    const theme = useTheme();

    return (

        <Stack.Navigator
            initialRouteName='List'
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.background,
                    borderWidth: 0
                },
                headerTitleAlign: 'center',
                presentation: 'card',
                headerMode: 'screen',
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >

            <Stack.Screen
                name="All Lists"
                component={AllListsScreen}
                options={() => ({
                    gestureDirection: 'horizontal-inverted',
                    headerLeft: null,
                })}
            />

            <Stack.Screen
                name="List"
                component={ListScreen}
                initialParams={{ title: 'Home' }}
                options={({ route, navigation }) => ({
                    title: route.params.title,
                    headerLeft: () => (
                        <IconButton
                            icon="view-list"
                            size={24}
                            onPress={() => navigation.navigate('All Lists')}
                        />
                    ),
                    
                })}
            />

            <Stack.Screen
                name="Search Items"
                component={SearchItems}
            />
        </Stack.Navigator>

    );
}