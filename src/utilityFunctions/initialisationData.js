import { randomUUID } from 'expo-crypto';
import { getItemData, storeItemData } from '../utilityFunctions/asyncStorageUtils'

// Functions that should be run every first open of the app

// At least one list ID should always be present at all times in async storage
// Default title for that one list ID list is "Home"
export const initialiseAllListsIDsData = async () => {
    try {
        const listsID = await getItemData('listsID');

        if (listsID !== null) {
            return listsID;
        }
        else {
            const newListID = randomUUID();
            const newListArray = [{ key: newListID, title: 'Home', numItems: 0 }];
            
            await storeItemData('listsID', newListArray)

            console.log('Successful initialization of listData:', newListArray);
            return newListArray;
        }
    } catch (error) {
        console.error('Error initializing listID Data:', error);
        throw error;
    }
};
