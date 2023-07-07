import { update } from 'firebase/database';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper'

// TO BE UPDATED and organised properly
const ListSettingsScreen = ({ navigation, route }) => {

  const { listMetaData } = route.params;
  const [title, setTitle] = React.useState(listMetaData.title);
  const oldTitle = listMetaData.title
  // Function to handle on Save button Press
  const handleSave = () => {
    
    if (title.trim() !== '') {
      // Use list key value
      // To compare and replace the new title name
      const listKey = listMetaData.key
      // Save the updated title, navigate back to the AllListScreen.
      const updatedItem = { ...listMetaData, title: title };
      navigation.navigate('All Lists', { action: 'TitleEdit', listKey: listKey, updatedItem: updatedItem, oldTitle: oldTitle});
    }

  };

  return (
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
  );
};

export default ListSettingsScreen;