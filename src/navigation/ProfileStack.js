
import Trial from '../screens/Trial';
import Settings from '../screens/Settings';
import SearchItems from '../screens/forGroceryListStack/SearchItems';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();

/* Stack for displaying Grocery List. Refer to screens directory */
export default function ProfileStack() {
    const theme = useTheme()

    return (

        <Stack.Navigator initialRouteName='Profile main'>

            <Stack.Screen
                name = "Trial"
                component={Trial}
                options = {{headerShown: false}}
            />

            <Stack.Screen
                name="Settings"
                component={Settings}
            />

        </Stack.Navigator>

    );
}