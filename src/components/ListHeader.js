// Imports from components
import { View } from 'react-native';
import { Button, Divider } from 'react-native-paper';

// Imports for functions
import { useNavigation, useRoute } from '@react-navigation/native';
import { printAllData, removeAllData } from '../utilityFunctions/asyncStorageUtils';

// The stuff displayed at the top of the list screen
// Currently just add items button and 2 debug buttons (Check storage, remove local storage)
export const ListHeader = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { listMetaData } = route.params;

    return (
        <View style={{ flexDirection: 'column', gap: 20 }}>

            {/* <Card>
          <Card.Title
            title="Nearest Supermarket"
            subtitle="Fairprice Xtra @ Ang Mo Kio Street.."
            left={(props) => <IconButton {...props} icon="map-marker-radius" />}
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
          />
        </Card> */}

            {/* Debug purposes. Remove if necessary*/}
            <View>
                <Button
                    style={{ borderRadius: 5, width: '100%', height: 50, justifyContent: 'center' }}
                    icon='plus-thick'
                    mode='outlined'
                    onPress={() => navigation.navigate('Search Items', { listMetaData: listMetaData })} //passed in as props
                >
                    Add Items
                </Button>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 10 }}>
                <Button
                    mode='outlined'
                    onPress={() => { printAllData() }}>
                    Check storage
                </Button>

                <Button
                    mode='outlined'
                    onPress={() => { removeAllData() }}>
                    Remove local storage
                </Button>
            </View>
            <Divider />
        </View>
    )
}