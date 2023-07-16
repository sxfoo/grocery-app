import React from "react";
import {View, StyleSheet, Text} from 'react-native';
import { TextInput, Button, Divider } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {handleQuantityValueChange, 
        handleValueChange, 
        handleValueInputFocusBlur,
        handleQuantityInputFocus,
        handleQuantityInputBlur,
        } from "../../utilityFunctions/accordianCardUtils";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";

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

const EditItems = ({navigation,route}) => {
    console.log(route)
    console.log(route.params.item)
    
    const item = route.params.item
    const listMetaData = route.params.listMetaData
    const theme = useTheme()
    //set values update the values
    const [values, setValues] = useState({
        unitValue: item.unitPrice,
        totalValue: item.totalPrice,
        quantity: item.quantity,
    });

    const categoryOptions = [
        {label: 'Bakery & Bread', value: 'Bakery & Bread'},
        {label: 'Beverages', value: 'Beverages'},
        {label: 'Produce', value: 'Produce'},
        {label: 'Stationery', value: 'Stationery'},
        {label: 'Uncategorised', value: 'Uncategorised'},
    ];
    const [category, setCategory] = useState(item.category);
    const [itemName, setItemName] = useState(item.itemName);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const handleSave = () => {
        if (itemName.trim() !== ''){
            const updatedItem = {...route.params.item, itemName: itemName}
            console.log('UpdatedItem: ', updatedItem)
            console.log('Route.Params: ' ,route.params)
            navigation.navigate('List', {action: 'ItemEdit', listMetaData, updatedItem})
        }
    };
    //on text change, call set title, set title updates the state variable of title, and change title
    return (
        <View>
            <Divider
                style = {[styles.divider, {borderColor: theme.colors.outline}]}
            />
            <View style = {styles.container}> 
                <TextInput
                    disabled = {isFocus}
                    style = {{flex: 1}}
                    mode = "outlined"
                    label = "Item: "
                    value = {itemName}
                    onChangeText={setItemName}
                    keyboardAppearance="dark"
                />
            </View>

            <View style={styles.container}>
                <View style = {{flex: 1}}>
                <TextInput
                    mode = "outlined"
                    label = "Unit Value: "
                    value = {values.unitValue}
                    disabled = {isFocus}
                    //text comes with onChangeText, it represents the most updated text. 
                    onChangeText={(text) => handleValueChange(text, 'unitValue', values, setValues)}
                    onFocus={() => handleValueInputFocusBlur('unitValue', values, setValues)}
                    onBlur={() => handleValueInputFocusBlur('unitValue', values, setValues)}
                    keyboardAppearance="dark"
                    keyboardType="decimal-pad"
                />
                </View>

                <View style = {{flex: 1}}>
                    <TextInput
                        mode = "outlined"
                        label= "Total Value: "
                        value={values.totalValue}
                        disabled = {isFocus}
                        onChangeText={(text) => handleValueChange(text, 'totalValue', values, setValues)}
                        onFocus={() => handleValueInputFocusBlur('totalValue', values, setValues)}
                        onBlur={() => handleValueInputFocusBlur('totalValue', values, setValues)}
                        keyboardAppearance="dark"
                        keyboardType="decimal-pad"
                    />
                </View>

                <View style = {{flex:1}}>
                <TextInput
                    mode="outlined"
                    label = "Quantity: "
                    value = {values.quantity}
                    disabled = {isFocus}
                    onChangeText={(text) => handleQuantityValueChange(text, values, setValues)}
                    onFocus={() => handleQuantityInputFocus(values, setValues)}
                    onBlur={() => handleQuantityInputBlur(values, setValues)}
                    keyboardAppearance="dark"
                    keyboardType="decimal-pad"
                />
                </View>
            </View>





            <View style = {[styles.dropdowncontainer]}>
                <Text style = {[styles.label, {backgroundColor: theme.colors.background, color: theme.colors.onBackground}]}> Category: </Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: theme.colors.primary }]}
                        placeholderStyle={[styles.placeholderStyle, {color: theme.colors.onBackground}]}
                        selectedTextStyle={[styles.selectedTextStyle, {color: theme.colors.onBackground}]}
                        containerStyle={[styles.dropdownBox, 
                        {borderColor: theme.colors.primary, backgroundColor: theme.colors.secondary}]}
                        activeColor={theme.colors.onBackground}
                        iconStyle={styles.iconStyle}
                        data={categoryOptions}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={item.category}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
            </View>

            <Divider
                style = {[styles.divider, {borderColor: theme.colors.outline}]}
            />

            <Button
                mode = "contained"
                onPress={() => {
                    handleSave()
                }}
            >
                Save
            </Button>
        </View>
    )
};

export default EditItems;