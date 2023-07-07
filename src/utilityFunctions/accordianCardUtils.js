import { getItemData, storeItemData } from './asyncStorageUtils';
import { randomUUID } from 'expo-crypto';
import { auth, db, ref, set } from '../../firebaseConfig'
import { LayoutAnimation } from 'react-native';
import { getUserId } from './checkifauth';
import { fetchlistUID } from './onlineCreateList';

/* For Accordian Card Item */

// Function to occur on adding to list
export const AddToList = ({ item, values, setSearchQuery, setAddedItems, listMetaData }) => {

    // Random unique ID for item:
    const itemUUID = randomUUID();

    // Data of the item to be added to server
    const data = {
        itemID: itemUUID,
        itemName: item.name,
        category: item.category,
        quantity: values.quantity,
        unitPrice: values.unitValue,
        totalPrice: values.totalValue,
        timeStamp: Date.now(),
        completed: false
    }

    const addDataToStorage = async () => {

        try {
            //getUserId is an asynchronous function (take some time)
            //it causes listId to be assigned the promise object instead of the actual value
            //await can onlyn be used in an async function
            const listId = listMetaData.key; //This retrieves the user data, according to the device / authenticated user account
            
            // Offline Storage
            let currentListItems = (await getItemData(listId + '/items')) ?? [];
            const updatedListItems = [...currentListItems, data];
            await storeItemData(listId + '/items', updatedListItems); // Wait for offline storage to complete

            // To add as chip items on search screen
            setAddedItems(prevValues => {
                return (
                    [...prevValues, data]
                )
            })

            } 
            catch (error) {
                console.error('Error adding new item:', error);
            }

            // If logged in, store online
            if (auth.currentUser) {
                // Online Storage
                const listId = await getUserId(); //to be changed in the future
                const userId = await getUserId();
                const itemRef = ref(db, `list_node/${listId}/items/` + itemUUID);
                await set(itemRef, data); // Wait for online storage to complete


                const userRef = ref(db, `user_node/${userId}/lists/` );
                await set(userRef, listId);

                console.log('New item added successfully to Realtime Database:', itemUUID);
                console.log(data);
            } else {
                console.log('Not logged in!')
            }

        };

    addDataToStorage();
    setSearchQuery('');
}

// Function to handle onPressoftheCard.
export const handleOpenCloseCard = (isOpen, setIsOpen, values, setValues) => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);

    // If card is closed (not expanded)
    if (!isOpen) {

        // If invalid values such as empty string, or quantity 0 - set values to default
        if (values.unitValue === '') {
            setValues(prevValues => ({
                ...prevValues,
                unitValue: '0.00',
                totalValue: '0.00'
            }));
        }

        if (values.quantity === '' || values.quantity === '0') {
            setValues(prevValues => ({
                ...prevValues,
                quantity: '1'
            }));
        }
    }
};

// Function to handle onChange of unitValue or totalValue text input
export const handleValueChange = (text, inputName, values, setValues) => {

    // numericValue to replace text with decimal only numbers (including decimal point)
    const numericValue = text.replace(/[^0-9.]/g, '');

    /* To limit the text to 2 decimal points. */
    // Split string by the first decimal point if present
    // Take 2 digits to form decimal part.
    const parts = numericValue.split('.');
    let limitedValue = numericValue;
    if (parts.length > 1) {
        const decimalPart = parts[1].slice(0, 2);
        limitedValue = `${parts[0]}.${decimalPart}`;
    }

    // Calculate unit value from total value / quantity if the changed input is totalValue
    // Calculate total value from unit value * quantity if the changed input is unitValue
    const newOtherValue = inputName === 'totalValue'
        ? parseFloat(limitedValue) / parseInt(values.quantity)
        : parseFloat(limitedValue) * parseInt(values.quantity);

    // Check if newOtherValue is NaN
    const isOtherValueNaN = isNaN(newOtherValue);

    // Set values of unit value and total value accordingly
    setValues(prevValues => ({
        ...prevValues,
        unitValue: inputName === 'totalValue' ? (isOtherValueNaN ? '0.00' : newOtherValue.toFixed(2)) : limitedValue,
        totalValue: inputName === 'totalValue' ? limitedValue : (isOtherValueNaN ? '0.00' : newOtherValue.toFixed(2))
    }));
};


// Function to handle onChange of quantityValue text input
export const handleQuantityValueChange = (text, values, setValues) => {

    const textValue = text.replace(/\D/g, '');

    // Set total Value with a change in quantity
    const multipliedValue = parseFloat(values.unitValue) * parseInt(text);

    setValues(prevValues => ({
        ...prevValues,
        quantity: textValue,
        totalValue: isNaN(multipliedValue) ? prevValues.unitValue : multipliedValue.toFixed(2)
    }));
};


// Function to handle what happens when the value input is focused or blurred
export const handleValueInputFocusBlur = (inputName, values, setValues) => {

    const value = values[inputName];

    if (value === '0.00') {
        setValues(prevValues => ({
            ...prevValues,
            [inputName]: ''
        }));

    } else if (value === '') {
        setValues(prevValues => ({
            ...prevValues,
            [inputName]: '0.00'
        }));
    }
};

// Function to handle what happens when the quantity input is focused or blurred
export const handleQuantityInputFocusBlur = (values, setValues) => {
    if (values.quantity === '1') {
        setValues(prevValues => ({
            ...prevValues,
            quantity: ''
        }));
    } else if (values.quantity === '' || values.quantity === '0') {
        setValues(prevValues => ({
            ...prevValues,
            quantity: '1'
        }));
    }
};

// Function to check if input is valid
const isValidInput = (value) => {
    return !isNaN(value) && value >= 0;
};

// Function to check All Valid Input Submit before storing as data
export const validInputSubmit = (values) => {
    const quantity = parseInt(values.quantity);
    const totalValue = parseFloat(values.totalValue);
    const unitValue = parseFloat(values.unitValue);

    const isQuantityValid = isValidInput(quantity);
    const isTotalValueValid = isValidInput(totalValue);
    const isUnitValueValid = isValidInput(unitValue);

    return {
        quantity: isQuantityValid,
        totalValue: isTotalValueValid,
        unitValue: isUnitValueValid,
    };
};