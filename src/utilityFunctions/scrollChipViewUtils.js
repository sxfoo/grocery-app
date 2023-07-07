import object from 'react-native-ui-lib/src/style/colorName';
import { storeItemData, getItemData } from '../utilityFunctions/asyncStorageUtils'

// Function to run upon click x button on chip
// Removes local data currently, to implement online removal soon
export const removeChip = async (keyID, addedItems, setAddedItems, listMetaData) => {
    
    try {
        // Replace listID with current **listID**.
        // IMPORTANT!! Use context or pass down as prop in future.
        const listID = listMetaData.key;

        // Async Storage removal
        const currentStorageItems = await getItemData(listID + '/items');
        const newStorageItems = currentStorageItems.filter(object => object.itemID !== keyID);
        await storeItemData(listID + '/items', newStorageItems)

        // Remove the chip rendering
        const updatedItems = addedItems.filter(item => item.itemID !== keyID);
        setAddedItems(updatedItems);

    } catch (error) {
        console.error('Error Removing Items', error);
    }
}