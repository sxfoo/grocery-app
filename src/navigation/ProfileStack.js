import Trial from '../screens/Trial';
import Settings from '../screens/Settings';
import SearchItems from '../screens/forGroceryListStack/SearchItems';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

/* Stack for displaying Profile Screens */
export default function ProfileStack() {

    const theme = useTheme();

    return (
        <Stack.Navigator
            initialRouteName='Trial'
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.background,
                    elevation: 0,
                    shadowOpacity : 0,
                    borderBottomWidth: 0
                }
            }}
        >

            <Stack.Screen
                name="Trial"
                component={Trial}
                options={{ 
                    title: null,
                }}
            />

        </Stack.Navigator>

    );
}