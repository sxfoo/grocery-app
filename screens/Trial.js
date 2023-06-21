import React from "react"
import {Image, View, Text, StyleSheet} from 'react-native'
import { BorderRadiuses } from "react-native-ui-lib";

const style = StyleSheet.create({
    greeting: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
},
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 0,
        position: 'absolute',
        left: 14,
        top: 32
    }
});

const avatar = {
    uri: 'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg',
    width: 60,
    height: 60,
};

const Profile = () => {
    return(
        <View style={style.container}>
            <Text style={style.greeting}> Good Morning </Text>
            <Image style = {{borderRadius: 50}} source = {avatar}/>
        </View>
    )
};


const TrialScreen = () => {
    return(
        <View>
            <Profile/>
        </View>
    )
};

export default TrialScreen;