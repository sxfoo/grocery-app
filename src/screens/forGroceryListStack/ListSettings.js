import { update } from 'firebase/database';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { onlineRemoveList } from '../../utilityFunctions/firebaseUtils';
import { getItemData } from '../../utilityFunctions/asyncStorageUtils';
import { useState } from 'react';
import { useEffect } from 'react';

// TO BE UPDATED and organised properly
const ListSettingsScreen = ({ navigation, route }) => {

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

  //const isHomeList = listMetaData.key == tmp[0].key;
  //console.log(tmp);
  const oldTitle = listMetaData.title
  // Function to handle on Save button Press
  const handleSave = () => {
    //trim removes leading or trailing whitespace
    if (title.trim() !== '') {
      // Use list key value
      // To compare and replace the new title name
      const listKey = listMetaData.key
      // Save the updated title, navigate back to the AllListScreen.
      const updatedItem = { ...listMetaData, title: title };
      navigation.navigate('All Lists', { action: 'TitleEdit', listKey: listKey, updatedItem: updatedItem, oldTitle: oldTitle });
    }

  };

  const handleDelete = async () => {
    await onlineRemoveList(listMetaData.key, listMetaData.title);
    navigation.navigate('All Lists');
  };

  return (
    <View style = {{rowGap: 50}}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          label="List Title"
          value={title}
          onChangeText={setTitle}
          style={{ width: '50%', marginRight: 10 }}
        />

        <Button
          mode="contained"
          onPress={handleSave}
        >
          Save
        </Button>
      </View>
      <View style = {{justifyContent: 'center', alignItems: 'center'}}>
        {!isHome ? <Button
          mode = "contained"
          style = {{backgroundColor: 'red', width: '70%'}}
          onPress={handleDelete}
        >
          Delete
        </Button> : null}
      </View>
    </View>
  );
};

export default ListSettingsScreen;