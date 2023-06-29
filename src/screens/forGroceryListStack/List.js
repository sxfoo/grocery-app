import { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, Divider, Card, Text, useTheme, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { printAllData, removeAllData } from '../../usefulFunctions/asyncStorageUtils';

/* Displays User's Location at the top*/
const ListHeader = () => {
  return (
    <View style={{ flexDirection: 'column', gap: 20 }}>
      <Card>
        <Card.Title
          title="Nearest Supermarket"
          subtitle="Fairprice Xtra @ Ang Mo Kio Street.."
          left={(props) => <IconButton {...props} icon="map-marker-radius" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
        />
      </Card>
      <Divider />
    </View>
  )
}

/* Renders List Items. No logic currently. Clean up the styles */
const ListOfItems = ({ navigation }) => {

  return (
    <View style={{ flex: 1, marginBottom: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 70 }}>
      <Text style={styles.textOptions}> You haven’t added any items. </Text>
      <Text style={[styles.textOptions, { textAlign: 'center' }]}> Tap to add items that you need from your vendor </Text>
      <Button
        style={{ borderRadius: 5, width: '100%', height: 50, justifyContent: 'center' }}
        icon='plus-thick'
        mode='outlined'
        onPress={() => navigation.navigate('Search Items')}>
        Add Items
      </Button>

      {/* Debug purposes. Remove if necessary*/}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button
          mode='outlined'
          onPress={() => { printAllData() }}>
          Check storage
        </Button>

        <Button
          mode='outlined'
          onPress={() => { removeAllData() }}>
          Remove local storage
        </Button>
        
      </View>
    </View>
  )
}

/* The overall Screen to be displayed. */
const ListScreen = () => {

  const navigation = useNavigation();

  return (

    /* Used for react native gesture handler */
    <GestureHandlerRootView style={{ flex: 1 }}>

      {/* The overall screen. */}
      <View style={styles.body}>

        <ListHeader />
        <ListOfItems navigation={navigation} />

      </View>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 16,
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  textOptions: {
    fontSize: 18
  },

});

export default ListScreen;