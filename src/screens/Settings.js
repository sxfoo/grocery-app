import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity, Icon } from "react-native-ui-lib";
import { Card, Divider, IconButton} from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const customisation = [
    {
        header: 'General',
        items: [
            { id: 'Language', icon: 'translate', label: 'Change Language', type: 'select'},
            { id: 'darkMode', icon: 'theme-light-dark', label: 'Dark Mode', type: 'toggle'},
        ],
    },
    {
        header: 'Notification',
        items:[
            {id: 'Notification', icon: 'bell-alert', label: 'Enable push-notification', type: 'toggle'},

        ],
    },
    {
        header: 'Account',
        items:[
            {id: 'Username', icon: 'account-box', label: 'Change Username', type:'link'},
            {id: 'Email', icon: 'email', label: 'Change Email', type: 'link'},
            {id: 'Password', icon: 'lock', label: 'Change Password', type:'link'},
            {id: 'Delete', icon: 'delete', label:'Delete account', type: 'link'},
        ],
    },

    {
        header: 'Log out',
        items: [
            {id: 'logout', icon:'logout', label: 'Log out', type: 'link'},
        ]
    }
];

const styles = StyleSheet.create({
    headertext: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },
    header: {
        marginBottom: 12,
        paddingHorizontal: 12,
    },
})



const Settings = () => {
    return(
        <SafeAreaView>
            <ScrollView> 
        {/* it's basically a loop*/}
            {customisation.map(({header, items}) => (
                <View key={header} style = {styles.header}>
                    <Text style = {styles.headertext}>{header} </Text>        
                <View>
                {/* Another loop*/}
                    {items.map(({label, id, type, icon}) => (
                        <View key={id}>
                        <TouchableOpacity onPress ={() => {}}>
                            <View>
                                <IconButton icon = {icon} />
                                <Text>{label}</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    ))}
                </View>
                </View>
            ))}
            </ScrollView>
        </SafeAreaView>
    )
};

export default Settings;