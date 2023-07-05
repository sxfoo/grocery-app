import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Button, IconButton, Card, Text, TextInput, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import { randomUUID } from 'expo-crypto';
import { useFocusEffect } from '@react-navigation/native';
import { initialiseAllListsIDsData } from '../../utilityFunctions/initialisationData';
import { getItemData, storeItemData } from '../../utilityFunctions/asyncStorageUtils';

/* A Card that shows each individual grocery list the user created
// Displays Title of the list, no. of items, and users */
// To move to Components

// title => title of the Card
// isEditing => boolean to keep track when user press "edit" on header, for changing the state of this card
const GroceryCardComponent = ({ listData, isEditing }) => {

    const navigation = useNavigation();
    const theme = useTheme();

    // Function to handle on press of Card
    // If isEditing state > Navigate to ListSettings.js else if not, Navigates to List.js
    // To move to utility functions
    const handleCardNavigation = () => {
        if (isEditing) {
            navigation.navigate('List Settings', { listMetaData: listData })
        }
        else if (!isEditing) {
            navigation.navigate('List', { listMetaData: listData })
        }
    }

    return (
        <Card
            style={styles.card}
            onPress={handleCardNavigation}
            contentStyle={{ flexDirection: 'column' }}
        >
            <Card.Content
                style={{ paddingStart: 16, paddingEnd: 0, marginTop: 8 }}
            >
                <View style={{ flexDirection: 'row' }}>

                    <View style={{ flexDirection: 'column' }}>
                        <Text variant="headlineMedium">{listData.title}</Text>
                        <Text variant="bodyMedium"> 0 items </Text>
                    </View>

                    <View style={{ flex: 1 }}></View>

                    <IconButton icon={isEditing ? "pencil" : "chevron-right"} size={40} />

                </View>
            </Card.Content>

            {/* If not inEditing State, Render account + icon */}
            <Card.Actions style={{ flexDirection: 'row-reverse' }}>

                {isEditing ? null : (
                    <IconButton
                        icon="account-plus"
                        iconColor={theme.colors.onSurfaceVariant}
                        containerColor={theme.colors.surfaceVariant}
                        mode="contained"
                        size={24}
                    />
                )}

                <IconButton
                    icon="account"
                    iconColor={theme.colors.inverseOnSurface}
                    containerColor={theme.colors.inverseSurface}
                    mode="contained"
                    size={24}
                />
            </Card.Actions>
        </Card>
    );
};

/* A Card to guide users to create a new list */
// To move to Components

// setAllListsData => a function handed down to change allListsData in the main screen.
const NewListComponent = ({ setAllListsData }) => {

    const theme = useTheme();

    const [isCreatingList, setIsCreatingList] = React.useState(false);
    const [newListName, setNewListName] = React.useState('');

    // Function to occur when create new list button is pressed
    // newList is an object to be placed in allListsData (in main body function)
    // To move to Utility functions for this component
    const handleCreateList = async () => {

        if (newListName.trim() !== '') {
            const newList = {
                "key": randomUUID(),
                "numItems": 0,
                "title": newListName,
            };

            // State to render list data
            setAllListsData(prevData => [...prevData, newList])

            // Async Storage to append the list data
            const prevData = await getItemData('listsID');
            const newData = [...prevData, newList];
            await storeItemData('listsID', newData);

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
                            onPress={() => {
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
                {allListsData.map((item, index) => (
                    <GroceryCardComponent key={index} listData={item} isEditing={isEditing} />
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
