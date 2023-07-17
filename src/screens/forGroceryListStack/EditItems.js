import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Divider } from "react-native-paper";
import { useState } from "react";
import {
    handleQuantityValueChange,
    handleValueChange,
    handleValueInputFocusBlur,
    handleQuantityInputFocus,
    handleQuantityInputBlur,
} from "../../utilityFunctions/accordianCardUtils";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";
import { ListOfCategories } from "../../../assets/mockDataResource/listOfGroceryItems";
import { ref, update, db } from '../../../firebaseConfig'
import { getItemData, storeItemData } from "../../utilityFunctions/asyncStorageUtils";
import { initialiseListItems } from "../../utilityFunctions/initialisationData";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    dropdowncontainer: {
        padding: 10,
    },
    label: {
        position: 'absolute',
        zIndex: 999,
        paddingRight: 4,
        left: 18,
        top: 10,
    },
    divider: {
        paddingHorizontal: 10,
        marginVertical: 14,
        borderWidth: .5,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1.5,
        marginTop: 10,
        borderRadius: 6,

    },
    placeholderStyle: {
        paddingLeft: 10,
    },
    selectedTextStyle: {
        paddingLeft: 10,
    },
    dropdownBox: {
        borderWidth: '2',
        borderBottomLeftRadius: '8',
        borderBottomRightRadius: '8',
    },
});

const EditItems = ({ navigation, route }) => {

    const item = route.params.item
    const listMetaData = route.params.listMetaData
    const theme = useTheme()

    //set values update the values
    const [values, setValues] = useState({
        unitValue: item.unitPrice || '0.00',
        totalValue: item.totalPrice || '0.00',
        quantity: item.quantity,
    });

    const categoryOptions = ListOfCategories.map((category) => ({
        label: category,
        value: category,
    }));

    const [category, setCategory] = useState(item.category);
    const [itemName, setItemName] = useState(item.itemName);
    const [isFocus, setIsFocus] = useState(false);

    const handleSave = async () => {

        const allListsID = await getItemData('AllListsID')
        const modifiedItemData = {
            category: category,
            itemName: itemName,
            quantity: values.quantity,
            totalPrice: values.totalValue,
            unitPrice: values.unitValue,
        }

        if (itemName.trim() !== '' && values.quantity > 0) {
            try {
                // Async Storage
                if (listMetaData.key == allListsID[0].key) {
                    let itemsArray = await initialiseListItems(listMetaData.key);
                    itemsArray = itemsArray.map((object) =>
                        object.itemID === item.itemID ? { ...object, ...modifiedItemData } : object
                    );
                    await storeItemData(listMetaData.key + '/items', itemsArray)
                    navigation.goBack();
                }

                // Firebase Storage
                else {
                    const itemRef = ref(db, `list_node/lists/List_ID: ${listMetaData.key}/items/${item.itemID}`);
                    await update(itemRef, modifiedItemData)
                    navigation.goBack();
                }
            }
            catch (error) {
                throw error;
            }
        }
    };
    //on text change, call set title, set title updates the state variable of title, and change title
    return (
        <View>
            <Divider
                style={[styles.divider, { borderColor: theme.colors.outline }]}
            />
            <View style={styles.container}>
                <TextInput
                    disabled={isFocus}
                    style={{ flex: 1 }}
                    mode="outlined"
                    label="Item: "
                    value={itemName}
                    onChangeText={setItemName}
                    keyboardAppearance="dark"
                />
            </View>

            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        mode="outlined"
                        label="Unit Value: "
                        value={values.unitValue}
                        disabled={isFocus}
                        onChangeText={(text) => handleValueChange(text, 'unitValue', values, setValues)}
                        onFocus={() => handleValueInputFocusBlur('unitValue', values, setValues)}
                        onBlur={() => handleValueInputFocusBlur('unitValue', values, setValues)}
                        keyboardAppearance="dark"
                        keyboardType="decimal-pad"
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <TextInput
                        mode="outlined"
                        label="Total Value: "
                        value={values.totalValue}
                        disabled={isFocus}
                        onChangeText={(text) => handleValueChange(text, 'totalValue', values, setValues)}
                        onFocus={() => handleValueInputFocusBlur('totalValue', values, setValues)}
                        onBlur={() => handleValueInputFocusBlur('totalValue', values, setValues)}
                        keyboardAppearance="dark"
                        keyboardType="decimal-pad"
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <TextInput
                        mode="outlined"
                        label="Quantity: "
                        value={values.quantity}
                        disabled={isFocus}
                        onChangeText={(text) => handleQuantityValueChange(text, values, setValues)}
                        onFocus={() => handleQuantityInputFocus(values, setValues)}
                        onBlur={() => handleQuantityInputBlur(values, setValues)}
                        keyboardAppearance="dark"
                        keyboardType="number-pad"
                    />
                </View>
            </View>

            <View style={[styles.dropdowncontainer]}>
                <Text style={[styles.label, { backgroundColor: theme.colors.background, color: theme.colors.onBackground }]}> Category: </Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: theme.colors.primary }]}
                    placeholderStyle={[styles.placeholderStyle, { color: theme.colors.onBackground }]}
                    selectedTextStyle={[styles.selectedTextStyle, { color: theme.colors.onBackground }]}
                    containerStyle={[styles.dropdownBox,
                    { borderColor: theme.colors.primary, backgroundColor: theme.colors.inverseOnSurface }]}
                    activeColor={theme.colors.primary}
                    iconStyle={styles.iconStyle}
                    data={categoryOptions}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={item.category}
                    value={category}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setCategory(item.value);
                        setIsFocus(false);
                    }}
                />
            </View>

            <Divider
                style={[styles.divider, { borderColor: theme.colors.outline }]}
            />

            <Button
                mode="contained"
                onPress={async () => {
                    try {
                        await handleSave();
                    } catch (error) {
                        console.log('Error saving item:', error);
                    }
                }}
            >
                Save
            </Button>
        </View>
    )
};

export default EditItems;