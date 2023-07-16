import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, LayoutAnimation, UIManager } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { initialiseAllListsIDsData } from '../../utilityFunctions/initialisationData';
import { getItemData, storeItemData } from '../../utilityFunctions/asyncStorageUtils';
import { auth } from '../../../firebaseConfig';
import { GroceryCardComponent } from '../../components/GroceryCardComponent';
import { NewListComponent } from '../../components/AddNewListComponent';
import { onlineEditList } from '../../utilityFunctions/onlineCreateList';

import PressableOpacity from '../../components/PressableOpacity'
import { initialiseFirebaseListItems, initialiseFirebaseListsIDs } from '../../utilityFunctions/firebaseUtils';

/* The overall Screen to be displayed. Shows all the user's created grocery lists */
const AllListsScreen = ({ navigation, route }) => {

    // allListsData is an array that contains list data as objects to be displayed => { "title": "Home" ... } etc
    const [allListsData, setAllListsData] = React.useState([]);

    // Retrieve from async Storage alllistsID data (existing if have)
    useFocusEffect(
        React.useCallback(() => {
            const fetchAllListsIDs = async () => {
                //const data = await initialiseAllListsIDsData();
                //Async storage "Home", no longer here

                //For firebase storage 
                const data = await initialiseFirebaseListsIDs();
                setAllListsData(data);
            };
            fetchAllListsIDs();
        }, [])
    );

    // For editing an existing list:
    // isEditing a boolean to keep track if user is in Editing State
    const [isEditing, setIsEditing] = React.useState(false);

    // Header options. Set isEditing true when user press "edit" on header
    // useEffect => triggers everytime navigation or isEditing changes
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <PressableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        //LayoutAnimation.configureNext({
                        //    duration: 200,
                        //    create: { type: 'linear', property: 'opacity' },
                        //    update: { type: 'spring', springDamping: 1 },
                        //    delete: { type: 'linear', property: 'opacity' },
                        //});
                        setIsEditing((prev) => !prev)
                    }}>
                    <Text variant='titleMedium' style={{ marginRight: 20, fontWeight: '500' }}>
                        {isEditing ? 'Done' : 'Edit'}
                    </Text>
                </PressableOpacity>
            ),
        });
    }, [navigation, isEditing]);

    // Update the list item if it has been edited in the ListSettings screen
    // To be updated properly to use key values instead of matching and replacing by previous list titles
    //useeffect only runs when route.params changes and action == TitleEdit 
    React.useEffect(() => {
        const { action, listKey, updatedItem, oldTitle } = route.params;
        console.log('route:', route)
        console.log(route.params);
        if (action == 'TitleEdit') {
            if (updatedItem) {
                const newListsData = allListsData.map((item) =>
                    item.key === listKey ? updatedItem : item
                ) //updates the oldlist, if item.key is = to suppose to edit listKey, it sets it to the new updatedItem, rewrite its data
                storeItemData('AllListsID', newListsData);
                setAllListsData(newListsData);
                if (auth.currentUser) {
                    onlineEditList({ oldTitle: oldTitle, newListName: updatedItem.title, ListUID: updatedItem.key });
                }
            }
        }
    }, [route.params]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                keyboardShouldPersistTaps='handled'
            >
                {/* Renders all available grocery lists */}
                {allListsData.map((item) => (
                    <GroceryCardComponent key={item.key} listData={item} isEditing={isEditing} />
                ))}

                {/* If editing, do not render NewListComponent */}
                {isEditing ? null : <NewListComponent setAllListsData={setAllListsData} />}
                    <Button onPress={() => initialiseFirebaseListsIDs()}> Initialise Firebase all list data</Button>

                    <Button 
                        onPress = {async () => {
                            const result = await initialiseFirebaseListsIDs();
                            initialiseFirebaseListItems(result);
                        }}> 
                        Initialise all items data in the list
                    </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },

    scrollView: {
        flex: 1,
    },

    card: {
        marginHorizontal: 10,
        marginTop: 16,
        borderRadius: 15
    },
});

export default AllListsScreen;
