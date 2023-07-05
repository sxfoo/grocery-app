import { randomUUID } from "expo-crypto";
import { getUserId } from "./checkifauth";
import { ref, set, update } from "firebase/database";
import { db } from "../../firebaseConfig";

export const onlineCreateList = async ({ListName}) => {
    const userId =  await getUserId();
    const listId = randomUUID(); 
    const userRef = ref(db, (`user_node/UID: ${userId}/lists/${ListName}`));

    const data = {
        [ListName] : listId
    };
    await set(userRef, data);
    console.log('New list added to firebase with listname: '  + ListName + 'listid: '  + listId);

    //Plans to check if duplicated list next time through their uid. 
    //const userListUidRef = ref(db, `user_node/${userId}/lists/${ListName}`);
    //await set(userListUidRef, listId);
}

