import { randomUUID } from "expo-crypto";
import { getUserId } from "./checkifauth";
import { ref, set, update, get, remove } from "firebase/database"; // use Update instead of set (as it will overwrite)
import { db } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";
import { List } from "react-native-paper";

export const onlineEditList = async ({oldTitle , newListName, ListUID}) => {
    const userId = await getUserId();
    const olduserRef = ref(db, `user_node/UID: ${userId}/lists/${oldTitle}`);
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
    const userRef = ref(db, `user_node/UID: ${userId}/lists/${newListName}`);
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
    //Creates a new list at the list node
    //const default_list = {
    //    [ListName]: listId
    //}
    //await set(listRef, default_list);
    
    await set(userRef, data); //if it's 2 add key value
    await set(listRef, listId); //add a new list / if its 1 just add value to key without removing the existing ones
    console.log('New list added to firebase with listname: '  + ListName + 'listid: '  + listId);
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
/*
export const addingItemsToList = async ({listUID}) => {
    
    const itemRef = ref(db, `list_node/${listId}/items/` + itemUUID);
    await set(itemRef, data); // Wait for online storage to complete


    const userRef = ref(db, `user_node/${userId}/lists/` );
    await set(userRef, listId);

    console.log('New item added successfully to Realtime Database:', itemUUID);
    console.log(data);
};*/
/*
    // Online Storage
    const listId = await getUserId(); //to be changed in the future
    
    const itemRef = ref(db, `list_node/${listId}/items/` + itemUUID);
    await set(itemRef, data); // Wait for online storage to complete

    console.log('New item added successfully to Realtime Database:', itemUUID);
    console.log(data);
} else {
    console.log('Not logged in!')
}
*/
