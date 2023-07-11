import React from "react";
import {View, StyleSheet} from 'react-native';
import { TextInput, Button, Divider } from "react-native-paper";
import { useState } from "react";
import {handleQuantityValueChange, 
        handleValueChange, 
        handleValueInputFocusBlur,
        handleQuantityInputFocusBlur 
        } from "../../utilityFunctions/accordianCardUtils";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    divider: {
        paddingHorizontal: 10,
        marginVertical: 14,
    },
});

const handleSave = () => {

};


const EditItems = ({navigation, route}) => {
    console.log(route.params)
    const item = route.params.item
    console.log(item.itemName)
    //set values update the values
    const [values, setValues] = useState({
        unitValue: item.unitPrice,
        totalValue: item.totalPrice,
        quantity: item.quantity,
    });
    const [category, setCategory] = useState(item.category);
    const [itemName, setItemName] = useState(item.itemName);
    //on text change, call set title, set title updates the state variable of title, and change title
    return (
        <View>
            <View style = {styles.container}> 
                <TextInput
                    style = {{flex: 1}}
                    mode = "outlined"
                    label = "Item: "
                    value = {itemName}
                    onChangeText={setItemName}
                    keyboardAppearance="dark"
                />
            </View>

            <View style = {styles.container}>
                <TextInput
                    label="Category: "
                    value= {category}
                />
            </View>
            <Divider
                style = {styles.divider}
            />
            <View style={styles.container}>
                <View style = {{flex: 1}}>
                <TextInput
                    mode = "outlined"
                    label = "Unit Value: "
                    value = {values.unitValue}
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
                    onChangeText={(text) => handleQuantityValueChange(text, values, setValues)}
                    onFocus={() => handleQuantityInputFocusBlur(values, setValues)}
                    onBlur={() => handleQuantityInputFocusBlur(values, setValues)}
                    keyboardAppearance="dark"
                    keyboardType="decimal-pad"
                />
                </View>
            </View>
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