import * as React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Pressable, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useTheme } from '@react-navigation/native';


/* A Grocery Card component. Displays the user's existing grocery lists. */
const GroceryCard = () => {

    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        /* Overall, GroceryCard is a pressable container. Currently, onPress goes to 'List' */
        <Pressable onPress={() => {console.log('GroceryCard Pressed'); navigation.navigate('List')}}>

            <View style={styles.card(colors)}>

                <Image source={require('../assets/images/CardBg1.jpg')} style={styles.image} />

                {/* View used for giving transparency to image. To make overlayed text clearer*/}
                <View style={styles.darkenContainer}>

                    <View style={styles.topRowContainer}>
                        <IconButton
                            icon='home'
                            iconColor='#3E4C59'
                            containerColor='#E4E7EB'
                            mode='contained'
                            size={24}
                        />
                        <Text style={styles.title}> Home </Text>
                        <View style={{ flex: 1 }} />
                        <IconButton
                            icon='account'
                            iconColor='#3E4C59'
                            containerColor='#E4E7EB'
                            mode='contained'
                            size={16}
                        />
                        <IconButton
                            icon='account-plus'
                            iconColor='#F5F7FA'
                            containerColor='#323F4B'
                            mode='contained'
                            size={16}
                        />
                    </View>

                    <View style={styles.bottomRowContainer}>
                        <IconButton
                            icon='text-box-plus'
                            iconColor='#F5F7FA'
                            containerColor='#1f2933'
                            size={30}
                        />
                    </View>

                </View>

            </View>

        </Pressable>
    );
}

/* A NewCard component. Meant for the user to create a new List. Displays "Add New List" */
const NewCard = () => {

    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        /* Overall, NewCard is a pressable container. Currently, onPress goes to 'List' */
        <Pressable onPress={() => { navigation.navigate('List') }}>

            <View style={[styles.card(colors), { height: 80, backgroundColor: '#323F4b' }]}>

                <View style={[styles.topRowContainer, { justifyContent: 'center', flex: 1 }]}>
                    <IconButton
                        icon='plus-thick'
                        iconColor='#323F4B'
                        containerColor='#F5F7FA'
                        mode='contained'
                        size={24}
                    />
                    <Text style={[styles.title, {fontSize: 20}]}> New List</Text>

                </View>

            </View>

        </Pressable>
    )
}

/* The overall Screen to be displayed. Shows all the user's created grocery lists */
const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <GroceryCard />
                <NewCard />
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

    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover'
    },

    darkenContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(31, 41, 51, 0.4)'
    },

    card: ( theme ) => ({
        marginHorizontal: 10,
        marginTop: 16,
        borderRadius: 15,
        elevation: 2,
        height: 180,
        overflow: 'hidden',
        borderColor: theme.border,
        borderWidth: 2,
        backgroundColor: theme.card,
    }),

    topRowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16
    },

    bottomRowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 10
    },
});

export default HomeScreen;