import { randomUUID } from "expo-crypto";
import { getUserId } from "./checkifauth";
import { ref, set, update, get, remove } from "firebase/database";
import { db } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";

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
    const userRef = ref(db, (`user_node/UID: ${userId}/lists/${ListName}`));

    const data = {
        ListUID : listId
    };
    await set(userRef, data);
    console.log('New list added to firebase with listname: '  + ListName + 'listid: '  + listId);

    //Plans to check if duplicated list next time through their uid. 
    //const userListUidRef = ref(db, `user_node/${userId}/lists/${ListName}`);
    //await set(userListUidRef, listId);
};

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
};
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
