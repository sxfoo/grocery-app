import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, IconButton, Card, Text, TextInput, useTheme } from 'react-native-paper';
import { randomUUID } from 'expo-crypto';
import { onlineCreateList } from '../utilityFunctions/onlineCreateList';
import { getItemData, storeItemData } from '../utilityFunctions/asyncStorageUtils'
import { auth } from '../../firebaseConfig'

// Used in AllLists.js
// A Card component to guide users to create a new list 

// setAllListsData => a function handed down to change allListsData on the main screen.
export const NewListComponent = ({ setAllListsData }) => {

    const theme = useTheme();

    const [isCreatingList, setIsCreatingList] = React.useState(false);
    const [newListName, setNewListName] = React.useState('');

    // Function to occur when create new list button is pressed
    // newList is an object to be placed in allListsData (in main body function)
    // To move to Utility functions for this component
    const handleCreateList = async () => {

        if (newListName.trim() !== '') {
            const key = randomUUID()
            const newList = {
                "key": key,
                "numItems": 0,
                "title": newListName,
            };
            
            // State to render list data
            setAllListsData(prevData => [...prevData, newList])

            // Async Storage to append the list data
            const prevData = await getItemData('AllListsID');
            const newData = [...prevData, newList];
            await storeItemData('AllListsID', newData);
            console.log('Offline create listUID: ' ,key)
            // Firebase online storage to set new list at `user_node/UID: ${userId}/lists/${ListName}`
            if (auth.currentUser) { //checkifauth
                await onlineCreateList({ ListName: newListName, ListUID: key }); //May return listId in the future to sync the list
            }

            setIsCreatingList(false);
        }
    };

    return (
        // Component has 2 states, (2 different appearances).
        // 1. isCreatingList true => When creating new list 
        // 2. isCreatingList false => The default state

        <Card
            style={[styles.card, { backgroundColor: isCreatingList ? '#918CA8' : theme.colors.elevation.level3 }]}
            onPress={() => setIsCreatingList(true)}
        >
            <Card.Content style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>

                {isCreatingList ? (
                    <>
                        <TextInput
                            label="New List Name"
                            value={newListName}
                            onChangeText={text => setNewListName(text)}
                            style={{ flex: 1, marginRight: 10 }}
                        />

                        <Button
                            mode="contained"
                            onPress={async () => {
                                handleCreateList(newListName);
                                setNewListName('');
                            }}
                        >
                            Create new list
                        </Button>
                    </>
                ) : (
                    <>
                        <Text variant="titleMedium">Add New List</Text>

                        <IconButton
                            icon='plus-thick'
                            mode='contained'
                            size={12}
                        />
                    </>
                )}

            </Card.Content>
        </Card>
    )
};

const styles = StyleSheet.create({

    card: {
        marginHorizontal: 10,
        marginTop: 16,
        borderRadius: 15
    },

});