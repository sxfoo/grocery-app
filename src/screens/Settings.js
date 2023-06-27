import React from "react";
import { View, Text, TouchableOpacity } from "react-native-ui-lib";
import { Card, Divider, IconButton} from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const customisation = [
    {
        header: 'General',
        items: [
            { id: 'Language', icon: 'globe', label: 'Language', type: 'select'},
            { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle'},
        ],
    },
    {
        header: 'Notification',
        items:[
            {id: 'Notification', icon: 'notification', label: 'Enable push-notification', type: 'toggle'},

        ],
    },
    {
        header: 'Account',
        items:[
            {id: 'Username', icon: 'name', label: 'Change Username', type:'link'},
            {id: 'Email', icon: 'email', label: 'Change Email', type: 'link'},
            {id: 'Password', icon: 'password', label: 'Change Password', type:'link'},
            {id: 'Delete', icon: 'data', label:'Delete account', type: 'link'},
        ],
    },

    {
        header: 'Log out',
        items: [
            {id: 'logout', icon:'logout', label: 'Log out', type: 'link'},
        ]
    }
];

const Settings = () => {
    return(
        <SafeAreaView>
            {customisation.map(({header, items}) => (
                <View key={header}>
                    <Text> {header} </Text>
                </View>
            
                <View>
                    {items.map(({label}) => (
                        <View>
                        <TouchableOpacity> 
                            <Text>{label}</Text>
                    
                        </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ))}
        </SafeAreaView>
    )
};

export default Settings;