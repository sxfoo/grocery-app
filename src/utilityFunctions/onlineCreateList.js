import { randomUUID } from "expo-crypto";
import { getUserId } from "./checkifauth";
import { ref, set, get, remove } from "firebase/database"; 
import { db } from "../../firebaseConfig";
import { List } from "react-native-paper";

export const onlineEditList = async ({oldTitle , newListName, ListUID}) => {
    const userId = await getUserId();
    const olduserRef = ref(db, `user_node/User UID: ${userId}/lists/${oldTitle}`);
    try {
        await remove(olduserRef);
        console.log('Old list removed, title:' ,oldTitle);
    }
    catch (error) {
        console.error('Error deleting online list' ,error);
    }
    const data = {
        ListUID: ListUID
    }
    const userRef = ref(db, `user_node/User UID: ${userId}/lists/${newListName}`);
    await set (userRef, data);
};

export const onlineCreateList = async ({ListName, ListUID}) => {
    const userId =  await getUserId();
    const listId = ListUID; 
    //User Node
    const userRef = ref(db, (`user_node/User UID: ${userId}/lists/${ListName}`));
    //List Node
    const listRef = ref(db, (`list_node/lists/List_ID: ${listId}`));
    ///Creates a new list at the user node
    const data = {
        ListUID : listId
    };

    await set(userRef, data); //if it's 2 add key value
    await set(listRef, listId); //add a new list / if its 1 just add value to key without removing the existing ones
    console.log('New list added to firebase with listname: '  + ListName + ' listid: '  + listId);
    //Plans to check if duplicated list next time through their uid. 
};


/*
export const fetchlistUID = async ({ListName}) => {
    const dataRef = ref(db, `user_node/${auth.currentUser.uid}/lists/${ListName}/ListUID`);
    const snapshot = await get(dataRef);

    if (listUID.exists()) {
        const listUID = snapshot.val();
        console.log('Fetched List UID:' ,listUID); 
    } else {
        console.log('Error @ onlineCreateItemsInList');
    }
    return listUID;
};*/


