import { db } from "../../firebaseConfig";
import { ref, set, get, remove, runTransaction } from "firebase/database";

export const onlineRemoveItemsfromList = async ({ listID, itemID }) => {
    try {
        const listRef = ref(db, `list_node/lists/List_ID: ${listID}/items/${itemID}`);
        const numItemsRef = ref(db, `list_node/lists/List_ID: ${listID}/NumItems`);

        await remove(listRef); // removes the node if the list is empty

        await runTransaction(numItemsRef, (currentNumItems) => {
            const newNumItems = (currentNumItems || 0) - 1;
            return newNumItems;
        });

        console.log('Item removed successfully.');
    } catch (error) {
        console.error('Error removing item:', error);
    }
};                    //adds back the node if the user adds something else