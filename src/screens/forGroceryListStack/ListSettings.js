import { update } from 'firebase/database';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper'
import { onlineRemoveList } from '../../utilityFunctions/firebaseUtils';
import { getItemData, storeItemData } from '../../utilityFunctions/asyncStorageUtils';
import { useState } from 'react';
import { useEffect } from 'react';
import { onlineEditList } from '../../utilityFunctions/onlineCreateList';

// TO BE UPDATED and organised properly
const ListSettingsScreen = ({ navigation, route }) => {

  const theme = useTheme();

  const { listMetaData } = route.params;
  const [title, setTitle] = React.useState(listMetaData.title);

  const [isHome, setisHome] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItemData('AllListsID');
      if (data[0].key == listMetaData.key) {
        setisHome(true);
      }
      else {
        setisHome(false);
      }
    };
    fetchData();
  }, []);

  // Function to handle onSave button press
  const handleSave = async () => {
    // Trim removes leading or trailing whitespace
    if (title.trim() !== '') {
      // Use list key value to compare and replace the new title name
      const listKey = listMetaData.key;
      const listData = await getItemData('AllListsID');
      const modifiedData = listData.map(item => {
        return {
          ...item,
          title: title
        };
      });

      try {
        if (listKey === listData[0].key) {
          await storeItemData('AllListsID', modifiedData);
        } else {
          await onlineEditList({oldTitle: listMetaData.title, newListName: title, ListUID: listMetaData.key});
        }
        navigation.goBack();
      } catch (error) {
        throw error;
      }
    }
  };

  const handleDelete = async () => {
    await onlineRemoveList(listMetaData.key, listMetaData.title);
    navigation.navigate('All Lists');
  };

  return (
    <View style={{ rowGap: 50 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          label="List Title"
          value={title}
          onChangeText={setTitle}
          style={{ width: '50%', marginRight: 10 }}
        />

        <Button
          mode="contained"
          onPress={async () => {
            try {
              await handleSave();
            } catch (error) {
              console.error("Unable to save edited list Data: ", error);
            }
          }}
        >
          Save
        </Button>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {!isHome ? <Button
          mode="contained"
          style={{ backgroundColor: theme.colors.error, width: '70%' }}
          onPress={handleDelete}
        >
          Delete List
        </Button> : null}
      </View>
    </View>
  );
};

export default ListSettingsScreen;