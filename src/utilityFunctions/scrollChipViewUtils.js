import object from 'react-native-ui-lib/src/style/colorName';
import { storeItemData, getItemData } from '../utilityFunctions/asyncStorageUtils'
import { onlineRemoveItemsfromList } from './onlineModifyItemsList';
// Function to run upon click x button on chip
// Removes local data currently, to implement online removal soon
export const removeChip = async (keyID, addedItems, setAddedItems, listMetaData) => {

    // Replace listID with current **listID**.
    // IMPORTANT!! Use context or pass down as prop in future.
    const tmp = await getItemData('AllListsID');
    const listID = listMetaData.key;

    try {

        if (listMetaData.key == tmp[0].key) {

            // Async Storage removal
            const currentStorageItems = await getItemData(listID + '/items');
            const newStorageItems = currentStorageItems.filter(object => object.itemID !== keyID);

            const updatedListMetaData = tmp.map(listObject => {

                const updatedNumItems = listObject.numItems - 1 >= 0 ? listObject.numItems - 1 : 0;
                if (listObject.key === listMetaData.key) {
                    return {
                        ...listObject,
                        numItems: updatedNumItems,
                    };
                }
                return listObject;
            });

            await storeItemData(listID + '/items', newStorageItems)
            await storeItemData('AllListsID', updatedListMetaData)

        } else {
            // Online Storage removal
            await onlineRemoveItemsfromList({ listID: listMetaData.key, itemID: keyID });
        }

        // Remove the chip rendering
        const updatedItems = addedItems.filter(item => item.itemID !== keyID);
        setAddedItems(updatedItems);

    } catch (error) {
        console.error('Error Removing Items', error);
    }
}