import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Card, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Used in AllLists.js
/* A Card that shows each individual grocery list the user created
// Displays Title of the list, no. of items, and users */

// listData => metadata of the list, { key: ..., title: ..., numItems: ... }
// isEditing => boolean to keep track when user press "edit" on header, for changing the state of this card
export const GroceryCardComponent = ({ listData, isEditing }) => {

    const navigation = useNavigation();
    const theme = useTheme();

    // Function to handle on press of Card
    // If isEditing state > Navigate to ListSettings.js else if not, Navigates to List.js
    // To move to utility functions
    const handleCardNavigation = () => {
        if (isEditing) {
            navigation.navigate('List Settings', { listMetaData: listData })
        }
        else if (!isEditing) {
            navigation.navigate('List', { listMetaData: listData })
        }
    }

    return (
        <Card
            style={styles.card}
            onPress={handleCardNavigation}
            contentStyle={{ flexDirection: 'column' }}
        >
            <Card.Content
                style={{ paddingStart: 16, paddingEnd: 0, marginTop: 8 }}
            >
                <View style={{ flexDirection: 'row' }}>

                    <View style={{ flexDirection: 'column' }}>
                        <Text variant="headlineMedium">{listData.title}</Text>
                        <Text variant="bodyMedium">{listData.numItems} items</Text>
                    </View>

                    <View style={{ flex: 1 }}></View>

                    <IconButton icon={isEditing ? "pencil" : "chevron-right"} size={40} />

                </View>
            </Card.Content>

            {/* If not inEditing State, Render account + icon */}
            <Card.Actions style={{ flexDirection: 'row-reverse' }}>

                {isEditing ? null : (
                    <IconButton
                        icon="account-plus"
                        iconColor={theme.colors.onSurfaceVariant}
                        containerColor={theme.colors.surfaceVariant}
                        mode="contained"
                        size={24}
                    />
                )}

                <IconButton
                    icon="account"
                    iconColor={theme.colors.inverseOnSurface}
                    containerColor={theme.colors.inverseSurface}
                    mode="contained"
                    size={24}
                />
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({

    card: {
        marginHorizontal: 10,
        marginTop: 16,
        borderRadius: 15
    },

});
