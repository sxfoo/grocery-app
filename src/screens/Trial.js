import React, {useState, useEffect} from "react";
import {View, ScrollView, SafeAreaView, Text, StyleSheet, TouchableOpacity} from "react-native";
import {FontAwesome} from '@expo/vector-icons';
import {Dropdown} from 'react-native-element-dropdown'
import { StatusBar, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Card, Divider, IconButton} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: '4%',
        paddingRight: '4%',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    user: {
        fontWeight:'medium',
        color: 'grey',
        fontSize: 18,
    },

    items: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    itemstitle:{
        fontWeight: 'medium',
        color: 'white',
        fontSize: 16,
        width: '70%',
    },

    itemprice:{
        color: '#FDB2AD',
        fontSize: 18,
        fontWeight: 'medium',
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
    const navigation = useNavigation()
    return(
        <View style = {[styles.container, {paddingTop: 4}]}> 
            <Card onPress={() => {navigation.navigate('Settings')}} >
                <Card.Title
                    title="Hello"
                    subtitle="User"
                    right={(props) => <IconButton {...props} icon="account-circle" size={40}/>}
                    titleStyle = {styles.title}
                    titleVariant="titleLarge"
                    subtitleStyle = {styles.user}
                />
            </Card>
            
        </View>
    )
};

const Recent_expense = () =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const url = "https://fakestoreapi.com/products";

    useEffect(() => {
        fetch(url)
        .then((response) => response.json()) /*sucessful response in json format*/
        
        .then((json) => setData(json)) /*Convert response to json format in data*/
        .catch((error) => console.error(error)) /*fails to fetch*/
        .finally(()=> setLoading(false)); /*Regardless whether it fails or not*/
        
    },[])

    const renderItem = ({item}) => (
        <View key={item.id} style={{ marginTop: '2%' }}>
        <View style={styles.items}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemstitle}>
            {item.title}
          </Text>
          <Text style={styles.itemprice}>-${item.price}</Text>
        </View>
        <View>
          <Text style={{ color: 'grey' }}>04 Nov 2022</Text>
        </View>
      </View>
    );

    return(
        <View style = {styles.container}>
        <Card>
            <View style = {styles.container}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}> 
                    <Text style = {[styles.title, {marginBottom:'auto', marginTop: 'auto'}]}>Expenses </Text>
                    <TouchableOpacity>
                        <IconButton icon = "filter-outline" iconColor='white' onPress = {() => {}}/>
                    </TouchableOpacity>
                </View>
            {
                loading? <Text> Loading...</Text>: (
                    <FlatList
                        data={data}
                        renderItem={renderItem} /*will be called each item in the array*/
                        keyExtractor={(item) => item.id.toString()}
                        style = {{height: 200}}
                        showsVerticalScrollIndicator = {false}
                    />
                    )
                /*
                   data.map((post) =>
                    (
                      <View key = {post.id} style = {{marginTop: '2%'}}>
                            <View style = {styles.items}> 
                                <Text numberOfLines={1} ellipsizeMode="tail" style = {styles.itemstitle}>
                                    {post.title}
                                </Text>
                                <Text style = {styles.itemprice}> -${post.price}</Text>
                            </View>
                            <View>
                                <Text style = {{color: 'grey',}}> 04 Nov 2022</Text>
                            </View>
                        </View>
                    ))
                */
            }       
            </View>

        </Card>
        </View>
    );
}

const TrialScreen = () => {
    return(
        <SafeAreaView style = {[{marginTop: StatusBar.currentHeight}]}>
            <Profile/>
            <Text style = {{fontSize: 48}}>Insert graph here </Text>
            <Recent_expense/>
        </SafeAreaView>

        
    )
};

export default TrialScreen;