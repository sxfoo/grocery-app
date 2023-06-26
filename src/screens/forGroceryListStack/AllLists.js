import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button, IconButton, Card, Text, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

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

    return (
        <Card
            style={[styles.card, { backgroundColor: theme.colors.elevation.level3 }]}
            onPress={() => { navigation.navigate('List') }}
        >
            <Card.Content style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text variant="titleMedium"> Add new list</Text>
                <IconButton
                    icon='plus-thick'
                    mode='contained'
                    size={12}
                />
            </Card.Content>
        </Card >
    )
}

/* The overall Screen to be displayed. Shows all the user's created grocery lists */
const HomeScreen = () => {

    const navigation = useNavigation();
    const theme = useTheme();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <GroceryCardComponent navigation={navigation} theme={theme} />
                <NewListComponent navigation={navigation} theme={theme} />
                <Button title="This is the button title"
                    onPress={() => navigation.navigate('Trial')}> Click me to navigate to the profile</Button>
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