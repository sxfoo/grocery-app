import {removeItem} from '../utilityFunctions/asyncStorageUtils'

const removeItemData = async ( storageKeyID ) => {
    await removeItem(storageKeyID);
}

// Function to run upon click x button on chip
// Removes local data currently, to implement online removal soon
export const removeChip = (keyID, addedItems, setAddedItems) => {
    const updatedItems = addedItems.filter(item => item.itemID !== keyID);
    setAddedItems(updatedItems);

    // Replace listID with current **listID**.
    // IMPORTANT!! Use context or pass down as prop in future.
    const listId = "-Mk29uV8ULSgYp2s1";

    // Removes local storage data
    removeItemData(listId + '/' + keyID);
}