import { randomUUID } from 'expo-crypto';
import { getItemData, storeItemData } from '../utilityFunctions/asyncStorageUtils'
import { auth } from '../../firebaseConfig';
import { onlineCreateList } from './onlineCreateList';

// Functions that should be run every first open of the screen / app

// At least one list ID should always be present at all times in async storage
// Default title for that one list ID list is "Home"
export const initialiseAllListsIDsData = async () => {
    try {
        const listsID = await getItemData('AllListsID');

        if (listsID !== null) {
            return listsID;
        }
        else {
            const newListID = randomUUID();
            const newListArray = [{ key: newListID, title: 'Home', numItems: 0 }];
            //If the user is logged in, create the Home list online too
            if (auth.currentUser){
                try { await onlineCreateList({ListName: "Home", ListUID: newListID});}
                catch (error) {
                    console.error(error);
                }
            }
            await storeItemData('AllListsID', newListArray)

            console.log('Successful initialization of listData:', newListArray);
            return newListArray;
        }
    } catch (error) {
        console.error('Error initializing listID Data:', error);
        throw error;
    }
};

export const initialiseListItems = async (listID) => {
    try {
        const listItems = await getItemData(listID + '/items');

        if (listItems !== null) {
            return listItems;
        }
        else {
            const setEmptyList = [];
            await storeItemData(listID + '/items', setEmptyList)

            console.log('Successful initialization of listItems:', []);
            return setEmptyList;
        }
    } catch (error) {
        console.error('Error initializing listItems:', error);
        throw error;
    }
};
