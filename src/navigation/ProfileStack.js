
import Trial from '../screens/Trial';
import Settings from '../screens/Settings';
import SearchItems from '../screens/forGroceryListStack/SearchItems';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

/* Stack for displaying Profile Screens */
export default function ProfileStack() {

    const theme = useTheme();

    return (

        <Stack.Navigator
            initialRouteName='Trial'
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.background,
                }
            }}
        >

            <Stack.Screen
                name="Trial"
                component={Trial}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Settings"
                component={Settings}
            />

        </Stack.Navigator>

    );
}