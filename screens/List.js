import { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import BottomSheet, { BottomSheetTextInput, BottomSheetBackdrop, BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { IconButton, Switch } from 'react-native-paper';

/* The overall Screen to be displayed. */
const App = () => {

  const { colors } = useTheme();
  const bottomSheetRef = useRef(null);

  /* The % of screen the bottom Sheet should snap to */
  const snapPoints = useMemo(() => ['15%', '90%'], []);

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
        pressBehavior={'collapse'} />
    ),
    []
  );

  /* Toggle states for the switches in the bottom sheet. To be changed */
  const [categorySwitch, setCategorySwitch] = useState(false);
  const [quantitySwitch, setQuantitySwitch] = useState(false);

  return (

    /* Used for react native gesture handler */
    <GestureHandlerRootView style={{ flex: 1 }}>
    
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        {/* The overall screen. */}
        <View style={styles.body(colors)}>

          <Text style={[styles.headerText, {fontSize: 28}]}> Home </Text>

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
              <BottomSheetView style={[styles.row, {marginTop: 60, justifyContent: 'space-between'}]}>
                <Text style={styles.headerText}> Additional Item Details </Text>
              </BottomSheetView>

              <BottomSheetView style={[styles.row, {marginTop: 32, justifyContent: 'space-between'}]}>
                <Text style={styles.textOptions}> Category </Text>
                <Switch 
                value={categorySwitch} 
                onValueChange={() => {setCategorySwitch(!categorySwitch)}} 
                color='#63c064'
                />
              </BottomSheetView>

              <BottomSheetView style={[styles.row, {marginTop: 32, justifyContent: 'space-between'}]}>
                <Text style={styles.textOptions}> Quantity </Text>
                <Switch 
                value={quantitySwitch} 
                onValueChange={() => {setQuantitySwitch(!quantitySwitch)}} 
                color='#63c064'
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
    padding: 12,
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
    fontSize: 18,
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