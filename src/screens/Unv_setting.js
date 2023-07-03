import React from "react";
import { Alert, StyleSheet } from "react-native";
import { Image } from "react-native-ui-lib";
import { View, TouchableOpacity, Icon } from "react-native-ui-lib";
import { Divider, IconButton, Text, useTheme} from "react-native-paper";
import { FlatList, ScrollView, Switch } from "react-native-gesture-handler";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import {Card} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from 'react-native-vector-icons/Feather';

/* Settings page, specify the individual settings, icons and type of change*/
const customisation = [
    {
        header: 'General',
        items: [
            { id: 'Language', icon: 'translate', label: 'Change Language', type: 'link'},
            { id: 'Budget', icon: 'hand-coin', label: 'Set budget', type: 'link'},
            { id: 'darkMode', icon: 'theme-light-dark', label: 'Dark Mode', type: 'toggle'},
            { id: 'Location', icon: 'navigation-variant', label: 'Sync location', type: 'toggle'},
        ],
    },
    {
        header: 'Notification',
        items:[
            {id: 'Notification', icon: 'bell-alert', label: 'Enable push-notification', type: 'toggle'},

        ],
    },
];
/* CSS used to style the page */
const styles = StyleSheet.create({
    
    headertext: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
        marginBottom: 4,
    },
    header: {
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    profile: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        position: 'relative',
    },
    profile_write:{
        width: 30,
        height: 30,
        borderRadius: 9999,
        backgroundColor: "#4080ed",
        position: 'absolute', /*refer to parent element*/
        alignItems: 'center',
        justifyContent: 'center',
        right: -4,
        bottom: -10,

    },
    profile_avatar:{
        width: 72,
        height: 72,
        borderRadius: 9999,
    },
    profile_name:{
        fontSize: 20,
        marginTop: 15,
        fontWeight: '600',
    },

    profile_email: {
        fontSize: 16,
        fontWeight: '500',
        color: 'grey',
        marginBottom: 15,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center', /*items in this view container will be aligned in center vertically*/
        justifyContent: 'flex-start',
        /*backgroundColor: '#6b7a87',*/
        height: 60,
        marginBottom: 10,
        paddingHorizontal: 6,
        borderRadius: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export const toggledark = (dark) => {
    var d_value = dark
    console.log('Dark is' + d_value)
}

const Unv_setting = () => {
    const Navigation = useNavigation();
    const [form, setForm] = React.useState({
        darkMode: true,
        Notification: true,
        location: true,
    });
    const themes = useTheme();
    const insets = useSafeAreaInsets();
    
    const imagePick = () => {
        console.log('Image pick pressed');

    };

    return(
        <SafeAreaProvider>
            <ScrollView>
                <TouchableOpacity style = {[styles.profile, {        
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right
                }]}
                onPress = {() => {Navigation.navigate("SignIn", {screen: 'SignInScreen'})}}
                >
                <TouchableOpacity>
                    <View style = {styles.avatar}>
                        <Image
                            alt = "Profile Picture"
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'}}
                            style = {styles.profile_avatar}
                        />
                    </View>

                    <View style = {[styles.profile_write, {backgroundColor: themes.colors.inverseOnSurface}]}>
                        <FeatherIcon name="alert-triangle" size={15} style={{color: themes.colors.inverseSurface}} />
                    </View>
                </TouchableOpacity> 
                <Text style={styles.profile_name}>You are not signed in</Text>
                <Text style={styles.profile_email}>Sign in to gain access to full features</Text>
            
                {/* Profile picture*/}
                </TouchableOpacity>
                <Divider style = {{marginBottom: 15}}/> 
        {/* it's basically a loop to map the header and the text*/}
            {customisation.map(({header, items}) => (
                <View key={header} style = {styles.header}>
                    <Text style = {styles.headertext}>{header} </Text>        
                <View>
                {/* Another loop, in the row, continue to load the icon and the chevron/toggle*/}
                    {items.map(({label, id, type, icon, nav}) => (
                        <View key={id}>
                        <TouchableOpacity onPress ={() => {
                                if (nav) 
                                {Navigation.navigate(nav)}
                        }}>
                            <View style = {[styles.row, {backgroundColor: themes.colors.inverseOnSurface,}]}>
                                <View style = {styles.icon}> 
                                    <IconButton icon = {icon} />
                                </View>
                                <Text style = {styles.label}>{label}</Text>
                                <View style = {{flex: 1,}}/> 
                                {/*takes up the available space*/}
                                {type === 'toggle' && id ==='darkMode' &&
                                (<Switch 
                                    value = {form[id]}
                                    onValueChange = {value => {setForm({ ...form, [id]: value});
                                    toggledark(value);
                                    }}
                                />)}
                                {type === 'link' && <IconButton icon = "chevron-right"/>}
                            </View>
                        </TouchableOpacity>
                        </View>
                    ))}
                </View>
                </View>
            ))}
            </ScrollView>
        </SafeAreaProvider>
    )

};



export default Unv_setting;