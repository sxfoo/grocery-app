import React, {useState, useEffect} from "react";
import {View, ScrollView, SafeAreaView, Text, StyleSheet} from "react-native";
import {FontAwesome} from '@expo/vector-icons';
import {Dropdown} from 'react-native-element-dropdown'
import { StatusBar, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: '4%',
        paddingRight: '4%',
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

    items: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    itemstitle:{
        fontWeight: 'medium',
        color: 'white',
        fontSize: 15,
        width: '70%',
    },

    itemprice:{
        color: '#FDB2AD',
        width: '25%',
        marginTop: 'auto',
        marginBottom: 'auto',
    },

    /*
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
      },*/
    
});


const Profile = () => {
    return(
        <View style = {[styles.container, styles.header, {paddingTop: '2%',}]}> 
            <View> 
                <Text style={styles.title}>Hello, </Text>
                <Text style = {styles.user}>User </Text>
            </View>
            <FontAwesome style={{marginBottom:'auto', marginTop:'auto'}} name="user-circle" size = {42} color='gray'/>    
        </View>
    )
};

const Recent_expense = () =>{
    const [selected, setSelected] = useState(""); /* default select is None*/
/*
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
*/
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const url = "https://fakestoreapi.com/products";

    useEffect(() => {
        fetch(url)
        .then((response) => response.json()) /*sucessful response in json format*/
        
        .then((json) => setData(json)) /*Convert response to json format*/
        .catch((error) => console.error(error)) /*fails to fetch*/
        .finally(()=> setLoading(false)); /*Regardless whether it fails or not*/
        
    },[])

    return(
        <ScrollView style = {styles.container}>
            {
                loading? <Text> Loading...</Text>: (
                    data.map((post) =>
                    (
                        <View style = {{marginTop: '1%'}}>
                            <View style = {styles.items}> 
                                <Text style = {styles.itemstitle}> {post.title}</Text>
                                <Text style = {styles.itemprice}> -{post.price}</Text>
                            </View>
                            <View>
                                <Text style = {{color: 'grey',}}> 04 Nov 2022</Text>
                            </View>
                        </View>
                    ))
                    )
                
            }
        </ScrollView>
    );
}

const TrialScreen = () => {
    return(
        <SafeAreaView style = {[{marginTop: StatusBar.currentHeight}]}>
            <ScrollView> 
            <Profile/>
            <Text style = {{fontSize: 48}}>Insert graph here </Text>
            <Recent_expense/>
            </ScrollView>
        </SafeAreaView>

        
    )
};

export default TrialScreen;