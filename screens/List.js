import { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Pressable, Switch, Touchable } from 'react-native';
import BottomSheet, { BottomSheetTextInput, BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { IconButton, Divider } from 'react-native-paper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

/* Displays Title of the List + User's Location */
const ListHeader = () => {

  return (
    <View style={{ flexDirection: 'column', gap: 20 }}>

      <Text style={[styles.headerText, { fontSize: 28 }]}> Home </Text>

      <Pressable onPress={() => console.log('location pressed')} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton
          icon='map-marker-radius'
          iconColor='#3E4C59'
          containerColor='#E4E7EB'
          mode='contained'
          size={32}
        />

        <View style={{ flexDirection: 'column' }}>
          <Text style={[styles.textOptions, { fontSize: 14, color: 'rgb(199, 199, 204)' }]}> Nearest Supermarket </Text>
          <Text style={styles.textOptions}> Fairprice Xtra @ Ang Mo Kio Street.. </Text>
        </View>

      </Pressable>

      <Divider />

    </View>
  )
}

/* Renders List Items. No logic currently */
const ListOfItems = () => {

  return (
    <View style={{ marginTop: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
      <Text style={styles.textOptions}> You haven’t added any items. </Text>
      <Text style={[styles.textOptions, { textAlign: 'center' }]}> Tap to add items that you need from your vendor </Text>
    </View>
  )
}

/* The overall Screen to be displayed. */
const App = () => {

  const { colors } = useTheme();
  const bottomSheetRef = useRef(null);

  const bottomTabHeight = useBottomTabBarHeight();

  /* The % of screen the bottom Sheet should snap to */
  const snapPoints = useMemo(() => [bottomTabHeight + 100, '90%'], []);

  /* This is not needed. Currently logs the position which the bottomSheet snaps */
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  /* Callback function to render only once.
     Currently only used for => tapping the backdrop will close keyboard */
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={'collapse'}
      />
    ),
    []
  );

  /* Toggle states for the switches in the bottom sheet. To be changed */
  const [categorySwitch, setCategorySwitch] = useState(false);
  const [quantitySwitch, setQuantitySwitch] = useState(false);

  return (

    /* Used for react native gesture handler */
    <GestureHandlerRootView style={{ flex: 1 }}>

      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

          {/* The overall screen. */}
          <View style={styles.body(colors)}>

            <ListHeader />
            <ListOfItems />

            {/* The Bottom Sheet. */}
            <BottomSheet
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              backgroundStyle={styles.sheetBg(colors)}
              backdropComponent={renderBackdrop}
              keyboardBehavior='extend'
            >

              <BottomSheetView style={styles.contentContainer}>

                {/* The row containing the text input */}
                <BottomSheetView style={styles.row}>
                  <BottomSheetTextInput
                    style={styles.searchbar}
                    placeholder='e.g. Milk'
                    placeholderTextColor='rgba(199, 199, 204, 0.4)' />
                  <IconButton
                    icon='plus-thick'
                    iconColor='#3E4C59'
                    containerColor='#E4E7EB'
                    mode='contained'
                    size={28}
                  />
                </BottomSheetView>

                {/* The additional options to be carried out. Currently no logic.*/}
                <BottomSheetView style={[styles.row, { marginTop: 60, justifyContent: 'space-between' }]}>
                  <Text style={styles.headerText}> Additional Item Details </Text>
                </BottomSheetView>

                <BottomSheetView style={[styles.row, { marginTop: 32, justifyContent: 'space-between' }]}>
                  <Text style={styles.textOptions}> Category </Text>
                  <Switch
                    trackColor={{ false: '#767577', true: 'green' }}
                    thumbColor={'#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => { setCategorySwitch(!categorySwitch) }}
                    value={categorySwitch}
                  />
                </BottomSheetView>

                <BottomSheetView style={[styles.row, { marginTop: 32, justifyContent: 'space-between' }]}>
                  <Text style={styles.textOptions}> Quantity </Text>
                  <Switch
                    trackColor={{ false: '#767577', true: 'green' }}
                    thumbColor={'#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => { setQuantitySwitch(!quantitySwitch) }}
                    value={quantitySwitch}
                  />
                </BottomSheetView>

              </BottomSheetView>

            </BottomSheet>

          </View>

      </TouchableWithoutFeedback>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  body: (theme) => ({
    flex: 1,
    padding: 16,
    backgroundColor: theme.background,
  }),

  sheetBg: (theme) => ({
    backgroundColor: theme.card
  }),

  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  searchbar: {
    flex: 1,
    marginTop: 0,
    marginRight: 8,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    height: 50,
    backgroundColor: '#1f2933',
    color: '#f5f7fa',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  textOptions: {
    fontSize: 18,
    color: '#f5f7fa',
  },

  headerText: {
    fontSize: 22,
    color: '#f5f7fa',
    fontWeight: 'bold'
  }

});

export default App;