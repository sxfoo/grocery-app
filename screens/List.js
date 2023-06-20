import { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import BottomSheet, { BottomSheetTextInput, BottomSheetBackdrop, BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { IconButton, Switch } from 'react-native-paper';

const App = () => {

  const { colors } = useTheme();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['15%', '90%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={'collapse'} />
    ),
    []
  );

  const [categorySwitch, setCategorySwitch] = useState(false);
  const [quantitySwitch, setQuantitySwitch] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.body(colors)}>
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
    padding: 24,
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