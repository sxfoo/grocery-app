import AsyncStorage from '@react-native-async-storage/async-storage';


export const printAllData = async () => {
    try {
        // Get all keys from AsyncStorage
        const keys = await AsyncStorage.getAllKeys();

        // Get the corresponding values for the keys
        const result = await AsyncStorage.multiGet(keys);

        // Print key-value pairs
        result.forEach(([key, value]) => {
            console.log(`Key: ${key}, Value: ${value}`);
        });
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
};

export const removeAllData = async () => {
    try {
        // Get all keys from AsyncStorage
        const keys = await AsyncStorage.getAllKeys();

        // Remove all keys
        await AsyncStorage.multiRemove(keys);

        console.log('All keys removed successfully.');
    } catch (error) {
        console.error('Error removing keys:', error);
    }
};

// For Search Items List, store an item on list ID
export const storeItemData = async (listId, value, key) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(listId + '/' + key, jsonValue);

        console.log('New item added successfully to Async Storage:', key);

    } catch (e) {
        // Display Error
        console.log('Failed to add to Async storage', e)
    }
};

// Get item at specified key
export const getItemData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;

        console.log(`Retrieved data for key '${key}':`, parsedValue);

        return parsedValue;
    } catch (error) {
        console.error('Failed to retrieve from AsyncStorage:', error);
    }
};

// Remove Item at specified key
export const removeItem = async (key) => {
    try {
        // Remove the item with the specified key from AsyncStorage
        await AsyncStorage.removeItem(key);

        console.log(`Item with key '${key}' removed successfully.`);
    } catch (error) {
        console.error(`Error removing item with key '${key}':`, error);
    }
};