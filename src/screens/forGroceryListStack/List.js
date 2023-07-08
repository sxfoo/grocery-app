import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, SectionList, LayoutAnimation, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, Divider, Card, Text, useTheme, Button } from 'react-native-paper';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';
import { printAllData, removeAllData, storeItemData } from '../../utilityFunctions/asyncStorageUtils';
import { initialiseListItems } from '../../utilityFunctions/initialisationData';
import { categoryStylesData } from '../../../assets/mockDataResource/listOfGroceryItems';
import PressableOpacity from '../../components/PressableOpacity'
import Animated, { FadeInLeft, FadeInRight, FadeOutLeft } from "react-native-reanimated";

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
const CategoryHeader = ({ categoryName, categoryCost, isEditing }) => {

  const categoryStyleInfo = categoryStylesData[categoryName];
  const iconName = categoryStyleInfo.icon;
  const categoryColor = categoryStyleInfo.color;

  return (
    <View
      style={{
        flexDirection: 'row', alignItems: 'center',
        marginTop: 10,
      }}>

      {isEditing ? null : <MaterialCommunityIcons name={iconName} size={30} color={categoryColor} />}

      <Text style={{ color: categoryColor, flex: 1, marginStart: 10 }} variant="titleSmall">{categoryName}</Text>
      <Text style={{ color: categoryColor }} variant="labelLarge">{categoryCost}</Text>

      <IconButton
        icon={'chevron-down'}
        size={24}
        iconColor={categoryColor}
      />

    </View>
  )
};

// Component to display the item in the list
const ItemComponent = ({ item, index, isEditing, sections, setSections }) => {
  const [isChecked, setIsChecked] = useState(item.completed);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  const theme = useTheme();
  const route = useRoute();
  const { listMetaData } = route.params;

  const categoryStyleInfo = categoryStylesData[item.category];
  const categoryColor = categoryStyleInfo.color;

  const handleDeletingData = async () => {
    try {

      // TO CLEAN UP THIS STUFF V MESSY
      const data = await initialiseListItems(listMetaData.key);
      const updatedArray = data.filter(object => object.itemID !== item.itemID);
      await storeItemData(listMetaData.key + '/items', updatedArray)

      const updatedRenderedArray = sections.filter(categoryData => {
        if (categoryData.category === item.category) {
          categoryData.data.splice(index, 1);
          return categoryData.data.length > 0; // Keep the object only if the data array is not empty
        }
        return true;
      });

      setSections(updatedRenderedArray);

    } catch (error) {
      console.log('Failed to delete item data:', error)
    }
  }

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      style={{ flexDirection: 'row', marginTop: 10 }}
    >

      {isEditing ? (
        <Animated.View
          entering={FadeInLeft.duration(150)}
          exiting={FadeOutLeft.duration(150)}
          style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}
        >
          <PressableOpacity
            activeOpacity={0.5}
            onPress={async () => {
              await handleDeletingData();
            }}
          >
            <MaterialCommunityIcons
              name={'delete'}
              size={30}
              color={theme.colors.error}
            />
          </PressableOpacity>
        </Animated.View>
      ) : null}

      <PressableOpacity
        style={{
          flex: 8, flexDirection: 'row', alignItems: 'center',
          borderWidth: 1, borderRadius: 5, borderColor: categoryColor,
        }}
        activeOpacity={0.5}
        onPress={() => { isEditing ? null : toggleCheck() }}
      >
        <IconButton
          icon={isEditing ? '' : (isChecked ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline')}
          size={24}
          iconColor={categoryColor}
        />

        <Text style={{ flex: 3 }} numberOfLines={1} variant="bodyLarge">{item.itemName}</Text>

        {item.unitPrice !== '0.00' ? (
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'flex-end' }}>
            <Text variant='labelSmall' style={{ fontSize: 10 }} numberOfLines={1}>U:${item.unitPrice}</Text>
            <Text variant='labelSmall' style={{ fontSize: 10 }} numberOfLines={1}>T:${item.totalPrice}</Text>
          </View>
        ) : (
          <View style={{ flex: 1 }} />
        )}

        <Text style={{ flex: 1, textAlign: 'center' }} numberOfLines={1} variant='bodyMedium'>{item.quantity} unit</Text>

      </PressableOpacity>

    </Animated.View>
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
const renderSectionHeader = ({ section: { category }, isEditing }) => (
  <CategoryHeader categoryName={category} categoryCost={'0.00'} isEditing={isEditing} />
);

// Render each item within a section
const renderItem = ({ item, index, isEditing, sections, setSections }) => (
  <ItemComponent {...{ item, index, isEditing, sections, setSections }} />
);

/* The overall Screen to be displayed. */
const ListScreen = ({ navigation, route }) => {

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

  // For editing an existing list item:
  // isEditing a boolean to keep track if user is in Editing State
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIsEditing(false);
    });

    return unsubscribe;
  }, [navigation]);

  // Header options. Set isEditing true when user press "edit" on header
  // useEffect => triggers everytime navigation or isEditing changes
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableOpacity
          activeOpacity={0.5}
          onPress={() => {
            LayoutAnimation.configureNext({ // Adjust the duration value to make the animation faster
              update: { duration: 150, type: 'linear' }
            });
            setIsEditing((prev) => !prev)
          }}>

          <Text variant='titleMedium' style={{ marginRight: 20, fontWeight: '500' }}>
            {isEditing ? 'Done' : 'Edit'}
          </Text>

        </PressableOpacity>
      ),
    });
  }, [navigation, isEditing]);

  return (

    /* Used for react native gesture handler */
    <GestureHandlerRootView style={{ flex: 1 }}>

      {/* The overall screen. */}
      <View style={styles.body}>

        <ListHeader />

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.itemID}
          renderItem={({ item, index }) => renderItem({ item, index, isEditing, sections, setSections })}
          renderSectionHeader={({ section }) => renderSectionHeader({ section, isEditing })}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
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
