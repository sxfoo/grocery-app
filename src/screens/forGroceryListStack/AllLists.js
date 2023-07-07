import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { initialiseAllListsIDsData } from '../../utilityFunctions/initialisationData';
import { getItemData, storeItemData } from '../../utilityFunctions/asyncStorageUtils';

import { GroceryCardComponent } from '../../components/GroceryCardComponent';
import { NewListComponent } from '../../components/AddNewListComponent';

/* The overall Screen to be displayed. Shows all the user's created grocery lists */
const AllListsScreen = ({ navigation, route }) => {

    // allListsData is an array that contains list data as objects to be displayed => { "title": "Home" ... } etc
    const [allListsData, setAllListsData] = React.useState([]);

    // Retrieve from async Storage alllistsID data (existing if have)
    useFocusEffect(
        React.useCallback(() => {
            const fetchAllListsIDs = async () => {
                const data = await initialiseAllListsIDsData();
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
                <Pressable onPress={() => setIsEditing((prev) => !prev)}>
                    <Text variant='titleMedium' style={{ marginRight: 20, fontWeight: '500' }}>
                        {isEditing ? 'Done' : 'Edit'}
                    </Text>
                </Pressable>
            ),
        });
    }, [navigation, isEditing]);

    // Update the list item if it has been edited in the ListSettings screen
    // To be updated properly to use key values instead of matching and replacing by previous list titles 
    React.useEffect(() => {
        const { action, listKey, updatedItem } = route.params;

        if (action == 'TitleEdit') {
            if (updatedItem) {
                const newListsData = allListsData.map((item) => (item.key === listKey ? updatedItem : item))

                storeItemData('listsID', newListsData);
                setAllListsData(newListsData);
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
