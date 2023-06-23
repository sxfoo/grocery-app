import { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import BottomSheet, { BottomSheetTextInput, BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, Divider, Card, Text, useTheme } from 'react-native-paper';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

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

  const bottomSheetRef = useRef(null);
  const theme = useTheme();

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

  return (

    /* Used for react native gesture handler */
    <GestureHandlerRootView style={{ flex: 1 }}>

      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

        {/* The overall screen. */}
        <View style={styles.body}>

          <ListHeader />
          <ListOfItems />

          {/* The Bottom Sheet. */}
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={{backgroundColor: theme.colors.surfaceVariant}}
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
                  iconColor={theme.colors.inverseOnSurface}
                  containerColor={theme.colors.onSurfaceVariant}
                  mode='contained'
                  size={28}
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
  body: {
    flex: 1,
    padding: 16,
  },

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
    fontSize: 18
  },

});

export default App;