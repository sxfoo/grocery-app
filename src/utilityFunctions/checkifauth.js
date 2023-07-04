import { useState, useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../firebaseConfig";
import { randomUUID } from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get the user's unique account data
export const getUserId = async () => {
    if (checkifauth) {
        if (auth.currentUser) { //If user is signed in
            console.log('Authenticated UID: ', auth.currentUser.uid);
            return auth.currentUser.uid;
        } // return UID
    }
    //If user not authenticated
    let userId = null;
    try {
        userId = await AsyncStorage.getItem('userId');
    } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
    }
    if (!userId) {
        userId = randomUUID(); // Generate a random UUID
        try {
            await AsyncStorage.setItem('userId', userId); //store uid
        } catch (error) {
            console.error('Error storing userId in AsyncStorage:', error);
        }
    }
    console.log('Unverified UID: ', userId);
    return userId;
};

export const checkifauth = () => {
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        const unsubscribeAuthStateChanged = onAuthStateChanged(
            auth, (authenticatedUser) => {
                if (authenticatedUser) {
                    setIsAuth(true); //If a user has logged in, it's set to true
                }
                else {
                    setIsAuth(false); //otherwise set to false
                }
            }
        );

        return () => unsubscribeAuthStateChanged();
    }, []);
    console.log('isAuth is', isAuth);
    return isAuth;
}