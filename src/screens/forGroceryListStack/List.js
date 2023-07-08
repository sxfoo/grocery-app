import { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, SectionList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, Divider, Card, Text, useTheme, Button } from 'react-native-paper';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';
import { printAllData, removeAllData } from '../../utilityFunctions/asyncStorageUtils';
import { initialiseListItems } from '../../utilityFunctions/initialisationData';
import { categoryStylesData } from '../../../assets/mockDataResource/listOfGroceryItems';

/* Displays User's Location at the top of the screen*/
const ListHeader = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const { listMetaData } = route.params;

  return (
    <View style={{ flexDirection: 'column', gap: 20 }}>

      {/* <Card>
        <Card.Title
          title="Nearest Supermarket"
          subtitle="Fairprice Xtra @ Ang Mo Kio Street.."
          left={(props) => <IconButton {...props} icon="map-marker-radius" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
        />
      </Card> */}

      {/* Debug purposes. Remove if necessary*/}
      <View>
        <Button
          style={styles2.addButton}
          icon='plus-thick'
          mode='outlined'
          onPress={() => navigation.navigate('Search Items', { listMetaData: listMetaData })} //passed in as props
        >
          Add Items
        </Button>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 10 }}>
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
      <Divider />
    </View>
  )
}

// Component to display the category name, v1.0 without accordion
const CategoryHeader = ({ categoryName, categoryCost }) => {

  const categoryStyleInfo = categoryStylesData[categoryName];
  const iconName = categoryStyleInfo.icon;
  const categoryColor = categoryStyleInfo.color;

  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center',
      marginTop: 10,
    }}>

      <MaterialCommunityIcons name={iconName} size={30} color={categoryColor} />

      <Text style={{ color: categoryColor, flex: 1, marginStart: 10 }} variant="titleSmall">{categoryName}</Text>

      <Text style={{ color: categoryColor }} variant="labelLarge" >
        {categoryCost}
      </Text>

      <IconButton
        icon={'chevron-down'}
        size={24}
        iconColor={categoryColor}
      />

    </View>
  )
};

// Component to display the item in the list
const ItemComponent = ({ item }) => {
  const [isChecked, setIsChecked] = useState(item.completed);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  const categoryStyleInfo = categoryStylesData[item.category];
  const categoryColor = categoryStyleInfo.color;

  return (
    <View style={{
      flex: 1, flexDirection: 'row', alignItems: 'center',
      marginTop: 10,
      borderWidth: 1, borderRadius: 5, borderColor: categoryColor
    }}>

      <IconButton
        icon={isChecked ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
        size={24}
        iconColor={categoryColor}
        onPress={toggleCheck}
      />

      <Text style={{ flex: 2 }} variant="bodyMedium">{item.itemName}</Text>

      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <Text variant='bodyMedium'>{item.quantity} unit</Text>
        <Text variant='labelSmall'>${item.unitPrice} x {item.quantity} unit</Text>
      </View>

    </View>

  )
}

const TransformDataForSectionList = (dataArray) => {

  // Group the data by category
  const transformedDataArray = dataArray.reduce((acc, item) => {
    const { category } = item;
    const sectionIndex = acc.findIndex(section => section.category === category);

    if (sectionIndex !== -1) {
      acc[sectionIndex].data.push(item);
    } else {
      acc.push({ category: category, data: [item] });
    }

    return acc;
  }, []);

  return transformedDataArray;
}

// Render each section header
const renderSectionHeader = ({ section: { category } }) => (
  <CategoryHeader categoryName={category} categoryCost={'0.00'} />
);

// Render each item within a section
const renderItem = ({ item }) => (
  <ItemComponent item={item} />
);

/* The overall Screen to be displayed. */
const ListScreen = ({ route }) => {

  const { listMetaData } = route.params
  const [sections, setSections] = useState([]);

  // Retrieve from async Storage listItems given listID
  useFocusEffect(
    useCallback(() => {
      const fetchItemsData = async () => {
        const data = await initialiseListItems(listMetaData.key);

        // Transform the data gotten from AsyncStorage
        const transformedData = TransformDataForSectionList(data);
        setSections(transformedData);
      };
      fetchItemsData();
    }, [])
  );
  
  return (

    /* Used for react native gesture handler */
    <GestureHandlerRootView style={{ flex: 1 }}>

      {/* The overall screen. */}
      <View style={styles.body}>

        <ListHeader />

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.itemID}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          initialNumToRender={20}
        />

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
    // flexShrink: '1',
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

export default ListScreen;
