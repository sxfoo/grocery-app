import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button, IconButton, Card, Text, TextInput, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

/* A Card that shows Title of the list, no. of items, and users */
const GroceryCardComponent = ({ navigation, theme }) => (

    <Card
        style={styles.card}
        onPress={() => { navigation.navigate('List', { title: 'Home' }) }}
        contentStyle={{ flexDirection: 'column'}}
    >
        <Card.Content style={{ paddingStart: 16, paddingEnd: 0, marginTop: 8 }}>
            <View style={{ flexDirection: 'row'}}>
                <View style={{ flexDirection: 'column' }}>
                    <Text variant="headlineMedium"> Home </Text>
                    <Text variant="bodyMedium"> 0 items </Text>
                </View>
                <View style={{flex: 1}}></View>
                <IconButton
                    icon="chevron-right"
                    size={40}
                />
            </View>
        </Card.Content>
        <Card.Actions>
            <IconButton
                icon='account'
                iconColor={theme.colors.inverseOnSurface}
                containerColor= {theme.colors.inverseSurface}
                mode='contained'
                size={24}
            />
            <IconButton
                icon='account-plus'
                iconColor={theme.colors.onSurfaceVariant}
                containerColor= {theme.colors.surfaceVariant}
                mode='contained'
                size={24}
            />
        </Card.Actions>
    </Card >
);

/* A Card to navigate users to create a new list */
const NewListComponent = ({ navigation, theme }) => {
    const [isCreatingList, setIsCreatingList] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [lists, setLists] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const handleAddNewList = () => { //check if we are creating a new list
        setIsCreatingList(true); 
    }

    const handleCardPress = () => {
        navigation.navigate('List');
    };

    const handleCreateList = () => { //creating a new container for different gorcery list
        if (newListName.trim() !== '') {
            const newList = {
                name: newListName,
            };
        setLists([...lists, newList]);
        setNewListName('');
        setIsCreatingList(false);
        }
    };

    const handleDeleteList = (index) => { //to delete list
        const updatedLists = [...lists];
        updatedLists.splice(index, 1);
        setLists(updatedLists);
    }

    const handleEditList = (index) => { //editing name of created list
        setEditIndex(index);
    }

    const handleSaveList = (index) => { //to save the new edited name
        const updatedLists = [...lists];
        updatedLists[index].name = newListName;
        setLists(updatedLists);
        setNewListName('');
        setEditIndex(null);
    }
    
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {lists.map((list, index) => (
                <Card
                    key = {index}
                    style={[styles.card, {backgroundColor: '#918CA8', marginTop: 10}]}
                    onPress={handleCardPress}
                >
                    <Card.Content style={{flexDirection: 'row', flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        {editIndex === index? (
                            <TextInput
                                label="Edit your list"
                                value={newListName}
                                onChangeText={(text) => setNewListName(text)}
                                style= {{flex: 1, marginRight: 10}}
                            />
                        ):(
                            <Text>{list.name}</Text>
                        )}
                        {editIndex === index ? (
                            <IconButton
                                icon="content-save"
                                size={20}
                                onPress={() => handleSaveList(index)}
                            />
                        ): (
                            <IconButton
                                icon="pencil"
                                size={20}
                                onPress={() => handleEditList(index)}
                            
                            />
                        )}
                        
                        <IconButton 
                            icon="delete"
                            size={20}
                            onPress={() => handleDeleteList(index)}
                        />
                    </Card.Content>
                </Card>        
            ))}
            

            {isCreatingList ? (
                <Card style = {[styles.card, {backgroundColor: '#918CA8'}]}>
                    <Card.Content style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                        <TextInput 
                            label="New List Name"
                            value={newListName}
                            onChangeText={text => setNewListName(text)}
                            style={{flex: 1, marginRight: 10}}
                        />

                        <Button mode="contained" onPress={handleCreateList}>
                            Create new list
                        </Button>
                    </Card.Content>
                </Card>
                    
            ) : (

                <Card style={[styles.card,{backgroundColor: theme.colors.elevation.level3 }]}>
                    <Card.Content style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <Text variant="titleMedium">Add New List</Text>
                        <IconButton
                             icon='plus-thick'
                             mode='contained'
                             size={12}
                             onPress={handleAddNewList}
                        />
                    </Card.Content>
                </Card>
            )}
        </ScrollView>
    );
};

/* The overall Screen to be displayed. Shows all the user's created grocery lists */
const HomeScreen = () => {

    const navigation = useNavigation();
    const theme = useTheme();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <GroceryCardComponent navigation={navigation} theme={theme} />
                <NewListComponent navigation={navigation} theme={theme} />
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

export default HomeScreen;
