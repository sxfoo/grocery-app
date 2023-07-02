import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-ui-lib";
import { View, TouchableOpacity, Icon } from "react-native-ui-lib";
import { IconButton, Text, useTheme} from "react-native-paper";
import { FlatList, ScrollView, Switch } from "react-native-gesture-handler";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";

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
    {
        header: 'Account',
        items:[
            {id: 'Username', icon: 'account-box', label: 'Change Username', type:'link'},
            {id: 'Email', icon: 'email', label: 'Change Email', type: 'link'},
            {id: 'Password', icon: 'lock', label: 'Change Password', type:'link', nav:"ResetPassword"},
            {id: 'Delete', icon: 'delete', label:'Delete account', type: 'link'},
        ],
    },

    {
        header: 'Log out',
        items: [
            {id: 'logout', icon:'logout', label: 'Log out', type: 'link', nav:"SignIn"},
        ]
    }
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
/*temp profile pic from Monsters Inc */
const PROFILE_PIC = "https://static.wikia.nocookie.net/disney/images/3/3c/Profile_-_Sulley.jpg/revision/latest?cb=20200817112818";

const Settings = () => {
    const Navigation = useNavigation();

    const [form, setForm] = React.useState({
        darkMode: true,
        Notification: true,
        location: true,
    });
    const theme = useTheme()
    const insets = useSafeAreaInsets();
    return(
        <SafeAreaProvider>
            <ScrollView>
                <View style = {[styles.profile, {        
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right}]}>

                {/* Profile picture*/}
                <TouchableOpacity onPress = {() => {}}>
                    <View style = {styles.avatar}>
                        <Image
                            alt = "Profile Picture"
                            source={{ uri: PROFILE_PIC}}
                            style = {styles.profile_avatar}
                        />
                    </View>

                    <View style = {styles.profile_write}>
                        <FeatherIcon name="edit-3" size={15} color="#fff" />
                    </View>
                    
                </TouchableOpacity>

                <Text style = {styles.profile_name}> Sally Wong</Text>
                <Text style = {styles.profile_email}> sallywong@gmail.com</Text>
            </View>
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
                            <View style = {[styles.row, {backgroundColor: theme.colors.inverseOnSurface,}]}>
                                <View style = {styles.icon}> 
                                    <IconButton icon = {icon} />
                                </View>
                                <Text style = {styles.label}>{label}</Text>
                                <View style = {{flex: 1,}}/> 
                                {/*takes up the available space*/}
                                {type === 'toggle' && 
                                (<Switch 
                                    value = {form[id]}
                                    onValueChange = {value => setForm({ ...form, [id]: value})}
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



export default Settings;