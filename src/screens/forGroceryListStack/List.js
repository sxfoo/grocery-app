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

// Function to display the category name, v1.0 without accordion
const CategoryHeader = ({ categoryName, categoryCost, collapseCheck }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapseCheck);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles2.categoryContainer}>

        <MaterialCommunityIcons name="bread-slice-outline" size={24} color="#FFd3E1" />

        <View style={{ flexShrink: '1' }}>
          <Text style={{ color: '#FFd3E1', marginLeft: 10, flexShrink: '1' }} variant="titleSmall">{categoryName}</Text>
        </View>

        <View style={styles2.arrowContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#FFd3E1' }} variant="bodySmall" >
              {categoryCost}
            </Text>

            <IconButton
              icon={isCollapsed ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="grey"
              onPress={toggleCollapse}
            />
          </View>

        </View>
    </View>
  )
};



// Function to display the list of item for each category
const SubCategoryList = ({ listName, checklistCheck }) => {
  const [isChecked, setIsChecked] = useState(checklistCheck);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <View style={[styles2.subCategoryRow, styles2.subCategoryBorder, { borderColor: '#FFd3E1' }]}>
      <View style={styles2.circleContainer}>
        <IconButton
          icon={isChecked ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
          size={24}
          color="grey"
          onPress={toggleCheck}
        />
        <View style={{ flexShrink: 1 }}>
          <Text style={{ flexShrink: 1 }} variant="bodyMedium">{listName}</Text>
        </View>

      </View>
    </View>
  )
}

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
    </View>

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
    //justifyContent: 'space-between',
    marginTop: 10,
    //width: '100%',
    flexShrink: '1',
  },

  arrowContainer: {
    marginLeft: 'auto',
    //flexShrink: '1',
  },

  subCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },

  circleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: '1',
  },

  circleIcon: {
    marginRight: 10,
  },

  subCategoryBorder: {
    borderWidth: 1,
    borderRadius: 5
  },

  textContainer: {
    flexGrow: 1,
    flex: 1,
  }


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

        <ScrollView>
          <CategoryHeader categoryName="Bakery a really long name to see if it works Bakery hopefully it works now  " categoryCost="$14.50" />
          <SubCategoryList listName="apple this is a bunch to text to show the flexShrink actually works after so long" />
          <SubCategoryList listName="bingo sheet" />
          <CategoryHeader categoryName="Produce" />


        </ScrollView>


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
