import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper'

// TO BE UPDATED and organised properly
const ListSettingsScreen = ({ navigation, route }) => {

  const { item } = route.params;
  const [title, setTitle] = React.useState(item.title);

  // Function to handle on Save button Press
  const handleSave = () => {

    if (title.trim() !== '') {

      // Need to use a key value for this instead of previous title.
      // To compare and replace the new title name
      const previousItemTitle = item.title

      // Save the updated title, navigate back to the AllListScreen.
      const updatedItem = { ...item, title: title };
      navigation.navigate('All Lists', { action: 'TitleEdit', prevTitle: previousItemTitle, updatedItem: updatedItem });
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