import { auth, db } from "../../firebaseConfig";
import { ref, set, get, remove } from "firebase/database";
import { getUserId } from "./checkifauth";
import { randomUUID } from "expo-crypto";
import { getItemData, storeItemData } from "./asyncStorageUtils";

const intialiseInArray = async (data) => {
    const result = [] //Array that contains the title and uid in key:value pairs
    for (const key in data) {
        const listRef = ref(db, `list_node/lists/List_ID: ${key}/NumItems`)
        const snapshot = await get(listRef);
        obj = {
            "key": key,
            "numItems": snapshot.exists() ? snapshot.val() : 0,
            "title": data[key].ListName,
        }
        result.push(obj)
    }
    return result;
}

export const initialiseFirebaseListsIDs = async () => {

    let listsID = await getItemData('AllListsID');
    if (listsID == null) {
        //This part is copied from initialise all list id data from utility functions
        const newListID = randomUUID();
        const newListArray = [{ key: newListID, title: 'Home', numItems: 0 }];

        await storeItemData('AllListsID', newListArray);
        console.log('Default home initialised');
        listsID = newListArray;
    }


    if (auth.currentUser) {
        const userId = await getUserId();
        const userRef = ref(db, `user_node/User UID: ${userId}/lists`)

        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const result = await intialiseInArray(data);
                return [...listsID, ...result];
            }
            else {
                console.log('No data in firebase.');
                try { return [...listsID]; }
                catch {
                    console.error('Fail');
                }
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    else { //user is logged off
        return [...listsID];
    }
};

const intialiseInArray2 = (data) => {
    const result = []

    for (const key in data) {
        result.push(data[key]);
    }
    return result;
};

export const getItemDatafromList = async (listid) => {
    //gets all the item in 1 list
    const listRef = ref(db, `list_node/lists/List_ID: ${listid}/items`)
    try {
        const snapshot = await get(listRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const result = intialiseInArray2(data);
            return result;
        }
        else { //items dont exists, aka is empty
            console.log('List: ' + listid + ' is empty');
            return [];
        }
    }
    catch (error) {
        console.error("Error fetching items", error);
    }
};

export const initialiseFirebaseListItems = async (data) => {
    //data is now an array of all the lists, forEach iterates over the array
    /*data.forEach(element => {
        for (const key in element){
            const listid = element[key];     
            getItemDatafromList(key, listid);
        }
    });*/
    const items = data.map(obj => {
        return { key: obj.key, title: obj.title };
    });

    items.forEach(element => {
        const item = getItemDatafromList(element.key);
    });
};

export const onlineRemoveList = async (listID, listName) => {
    const userID = auth.currentUser.uid;
    const listRef = ref(db, (`list_node/lists/List_ID: ${listID}`));
    await remove(listRef);
    const userRef = ref(db, (`user_node/User UID: ${userID}/lists/${listID}`));
    await remove(userRef);
}