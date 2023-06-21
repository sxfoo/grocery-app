import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {FontAwesome} from '@expo/vector-icons';
import {Dropdown} from 'react-native-element-dropdown'

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#161818',
        borderColor: 'green',
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    user: {
        fontWeight:'medium',
        color: 'grey',
        fontSize: 20,
    },
    recent_exp: {
        fontWeight: 'medium',
        color: 'white',
        fontSize: 28,
    },
    dropdown: {
        margin: 16,
        height: 50,
        width: 150,
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 8,
      },
      imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
      },
    
});


const Profile = () => {
    return(
        <View style = {style.header}> 
            <View> 
                <Text style={style.title}>Hello, </Text>
                <Text style = {style.user}>User </Text>
            </View>
            <FontAwesome name="user-circle" size = {45} color='gray'/>    
        </View>
    )
};

const Recent_expense = () =>{
    const [selected, setSelected] = useState(""); /* default select is None*/

    const data = [
        {label:'Recent', value: '1'},
        {label:'Ascending order', value: '2'},
        {label:'Descending order', value: '3'},
    ];

    return(
        <Dropdown
            data = {data}
            style = {style.dropdown}
            selectedTextStyle = {style.selectedTextStyle}
            placeholderStyle = {style.placeholderStyle}
            maxHeight={200}
            value = "selected"
            valueField="value"
            labelField="label"
            placeholder="Recent"
            onChange={item => {setSelected(item.value)}}

        />
    )
};


const TrialScreen = () => {
    return(
        <View style = {style.container}>
            <Profile/>
            <Text style = {{fontSize: 48}}>Insert graph here </Text>
            <Recent_expense/> 
        </View>

        
    )
};

export default TrialScreen;