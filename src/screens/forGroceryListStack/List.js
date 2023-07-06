import { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, Divider, Card, Text, useTheme, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';
import { printAllData, removeAllData } from '../../utilityFunctions/asyncStorageUtils';

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
    <View style={styles.container}>
      <Button
        style={styles.addButton}
        icon='plus-thick'
        mode='outlined'
        onPress={() => navigation.navigate('Search Items')}
      >
        Add Items
      </Button>

      <ScrollView>
        <View style={styles2.itemsContainer}>
          <View style={{ marginBottom: 10 }}>
            <View style={styles2.categoryContainer}>
              <MaterialCommunityIcons name="bread-slice-outline" size={24} color="#FFd3E1" />
              <Text style={{ color: '#FFd3E1', fontSize: 26, marginLeft: 10 }}>Bakery & Bread</Text>

              <View style={styles2.arrowContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#FFd3E1', fontSize: 18, marginRight: 20 }}>$14.50</Text>
                  <IconButton
                    icon="chevron-down"
                    size={24}
                    color="grey"
                  />
                </View>

              </View>
            </View>

            <View style={[styles2.subCategoryRow, styles2.subCategoryBorder, { borderColor: '#FFd3E1' }]}>
              <View style={styles2.circleContainer}>
                <IconButton
                  icon="checkbox-blank-circle-outline"
                  size={24}
                  color="grey"
                />
                <Text style={styles2.subCategoryText}>Flour</Text>
              </View>

            </View>

            <View style={[styles2.subCategoryRow, styles2.subCategoryBorder, { borderColor: '#FFd3E1' }]}>
              <View style={styles2.circleContainer}>
                <IconButton
                  icon="checkbox-marked-circle-outline"
                  size={24}
                  color="grey"
                />
                <Text style={styles2.subCategoryText}>Yeast</Text>
              </View>
            </View>

          </View>

          <View style={{ marginBottom: 10 }}>
            <View style={styles2.categoryContainer}>
              <MaterialCommunityIcons name="food-apple" size={24} color="#E0C3FC" />
              <Text style={{ color: '#E0C3FC', fontSize: 26, marginLeft: 10 }}>Produce</Text>
              <View style={styles2.arrowContainer}>
                <View style={styles2.arrowContainer}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#E0C3FC', fontSize: 18, marginRight: 20 }}>$1.35</Text>
                    <IconButton
                      icon="chevron-down"
                      size={24}
                      color="grey"
                    />
                  </View>

                </View>
              </View>
            </View>
            <View style={[styles2.subCategoryRow, styles2.subCategoryBorder, { borderColor: '#E0C3FC' }]}>
              <View style={styles2.circleContainer}>
                <IconButton
                  icon="checkbox-marked-circle-outline"
                  size={24}
                  color="grey"
                />
                <Text style={styles2.subCategoryText}>Vege</Text>
              </View>
            </View>

            <View style={[styles2.subCategoryRow, styles2.subCategoryBorder, { borderColor: '#E0C3FC' }]}>
              <View style={styles2.circleContainer}>
                <IconButton
                  icon="checkbox-marked-circle-outline"
                  size={24}
                  color="grey"

                />
                <Text style={styles2.subCategoryText}>Apple</Text>
              </View>
            </View>

          </View>

          <View style={{ marginBottom: 10 }}>
            <View style={styles2.categoryContainer}>
              <MaterialCommunityIcons name="coffee-outline" size={24} color="#A6C1EE" />
              <Text style={{ color: '#A6C1EE', fontSize: 26, marginLeft: 10 }}>Beverages</Text>
              <View style={styles2.arrowContainer}>
                <View style={styles2.arrowContainer}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#A6C1EE', fontSize: 18, marginRight: 20 }}>$9.65</Text>
                    <IconButton
                      icon="chevron-down"
                      size={24}
                      color="grey"
                    />
                  </View>

                </View>
              </View>
            </View>

            <View style={[styles2.subCategoryRow, styles2.subCategoryBorder, { borderColor: '#A6C1EE' }]}>

              <View style={styles2.circleContainer}>
                <IconButton
                  icon="checkbox-marked-circle-outline"
                  size={24}
                  color="grey"
                />

                <Text style={styles2.subCategoryText}>Lots of coffee</Text>
              </View>

            </View>

            <View style={[styles2.subCategoryRow, styles2.subCategoryBorder, { borderColor: '#A6C1EE' }]}>
              <View style={styles2.circleContainer}>
                <IconButton
                  icon="checkbox-marked-circle-outline"
                  size={24}
                  color="#007AFF"
                />
                <Text style={styles2.subCategoryText}>Black tea</Text>
              </View>
            </View>

          </View>

        </View>

        <View style={styles2.categoryContainer}>
          <Text style={{ color: '#f2b8b5', fontSize: 28, justifyContent: 'flex-end' }}>Final Cost: </Text>
        </View>


      </ScrollView>
    </View >

  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOptions: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  addButton: {
    borderRadius: 5,
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  itemsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 25,
    width: '100%',
  },
  categoryText: {
    fontSize: 26,
    fontWeight: '400',
    marginLeft: 10,
  },
  arrowContainer: {
    marginLeft: 'auto',
  },

  subCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  circleIcon: {
    marginRight: 10,
  },
  subCategoryText: {
    fontSize: 16,
    fontWeight: '400',
  },
  dottedBorder: {
    borderWidth: 4,
    borderStyle: 'dotted',
    borderColor: 'gray',
  },

  subCategoryBorder: {

    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 20,
    marginRight: 20,
  },


});


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
