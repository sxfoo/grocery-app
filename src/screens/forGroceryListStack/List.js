import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useState, useContext } from 'react';
import { LayoutAnimation, SectionList, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, Text, useTheme } from 'react-native-paper';
import Animated, { FadeInLeft, FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { categoryStylesData } from '../../../assets/mockDataResource/listOfGroceryItems';
import PressableOpacity from '../../components/PressableOpacity';
import { storeItemData } from '../../utilityFunctions/asyncStorageUtils';
import { initialiseListItems } from '../../utilityFunctions/initialisationData';
import ThemeContext from '../../themeContext'
import { ListHeader } from '../../components/ListHeader';
import { TransformDataForSectionList } from '../../utilityFunctions/listScreenUtils';
import { auth } from '../../../firebaseConfig';
import { onlineRemoveItemsfromList } from '../../utilityFunctions/onlineModifyItemsList';

// Component to display the category name (Household, Electrical & lifestyle etc...)
const CategoryHeader = ({ categoryName, categoryCost, isEditing, isDarkTheme }) => {

  const categoryStyleInfo = categoryStylesData[categoryName];
  const iconName = categoryStyleInfo.icon;
  const categoryColor = isDarkTheme ? categoryStyleInfo.color : categoryStyleInfo.additionalColor;

  return (
    <View
      style={{
        flexDirection: 'row', alignItems: 'center',
        marginTop: 10,
      }}>

      {isEditing ? null : <MaterialCommunityIcons name={iconName} size={30} color={categoryColor} />}

      <Text style={{ color: categoryColor, flex: 1, marginStart: 10 }} variant="titleMedium">{categoryName}</Text>
      <Text style={{ color: categoryColor }} variant="labelLarge">{categoryCost}</Text>

      <IconButton
        icon={'chevron-down'}
        size={24}
        iconColor={categoryColor}
      />

    </View>
  )
};

// Component that displays the item
const ItemComponent = ({ item, index, isEditing, sections, setSections }) => {
  const [isChecked, setIsChecked] = useState(item.completed);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  const theme = useTheme();
  const route = useRoute();
  const { listMetaData } = route.params;

  const handleDeletingData = async () => {
    try {
      
      // Async storage 
      const data = await initialiseListItems(listMetaData.key);
      const updatedArray = data.filter(object => object.itemID !== item.itemID); //Not equal to item.ID stays
      await storeItemData(listMetaData.key + '/items', updatedArray)

      // For rendering data on screen
      const updatedRenderedArray = sections.filter(categoryData => {
        if (categoryData.category === item.category) {
          categoryData.data.splice(index, 1);
          return categoryData.data.length > 0;
        }
        return true;
      });
      
      // ADD firebase storage code here:
      if (auth.currentUser){
        onlineRemoveItemsfromList({listID: listMetaData.key, itemID: item.itemID});
      }
      // Return rendered data on screen
      return updatedRenderedArray;

    } catch (error) {

      console.log('Failed to delete item data:', error)
      throw error;

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
              try {
                const updatedRenderedArray = await handleDeletingData();
                setSections(updatedRenderedArray);
              } catch (error) {
                console.log('Failed to delete item:', error);
              }
            }}
          >
            <MaterialCommunityIcons
              name={'delete'}
              size={30}
              color={theme.colors.error}
            />
          </PressableOpacity>
        </Animated.View>
      ) : null
      }

      <PressableOpacity
        style={{
          flex: 8, flexDirection: 'row', alignItems: 'center',
          borderWidth: 1, borderRadius: 5, borderColor: theme.colors.elevation.level5,
        }}
        activeOpacity={0.5}
        onPress={() => { isEditing ? null : toggleCheck() }}
      >
        <IconButton
          icon={isEditing ? 'dots-horizontal' : (isChecked ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline')}
          iconColor={isChecked ? theme.colors.primary : theme.colors.onSurfaceVariant}
          size={24}
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

// Render each section header
const renderSectionHeader = ({ section: { category }, isEditing, isDarkTheme}) => (
  <CategoryHeader categoryName={category} categoryCost={'0.00'} isEditing={isEditing} isDarkTheme={isDarkTheme}/>
);

// Render each item within a section
const renderItem = ({ item, index, isEditing, sections, setSections }) => (
  <ItemComponent {...{ item, index, isEditing, sections, setSections }} />
);

/* The overall Screen to be displayed. */
const ListScreen = ({ navigation, route }) => {

  // Check for dark mode, to alter colors for header.
  const { isDarkTheme } = useContext(ThemeContext);

  // listMetaData contains current list metadata => { "title": "Home" ... }
  // For list rendering => sections, an array for putting in the data used for sectionlist
  const { listMetaData } = route.params
  const [sections, setSections] = useState([]);

  // Retrieve from async Storage listItems given listID
  // transform the data and setSections
  useFocusEffect(
    useCallback(() => {
      const fetchItemsData = async () => {

        // get list items data from async storage
        const data = await initialiseListItems(listMetaData.key);

        // Transform the data gotten from AsyncStorage for usage in section list
        const transformedData = TransformDataForSectionList(data);
        setSections(transformedData);
      };
      fetchItemsData();
    }, [])
  );

  // For editing an existing list item:
  // isEditing a boolean to keep track if user is in Editing State
  const [isEditing, setIsEditing] = useState(false);

  // On screen blur (meaning, when user is not on this screen), set isEditing to false
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

            // Animation for next layout change
            LayoutAnimation.configureNext({
              update: { duration: 150, type: 'linear' }
            });

            // Set isEditing true/false
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
    // No longer necessary
    <GestureHandlerRootView style={{ flex: 1 }}>

      {/* The overall screen. */}
      <View style={{
        flex: 1,
        padding: 16,
      }}>

        <ListHeader />

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.itemID}
          renderItem={({ item, index }) => renderItem({ item, index, isEditing, sections, setSections })}
          renderSectionHeader={({ section }) => renderSectionHeader({ section, isEditing, isDarkTheme})}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
        />

      </View>

    </GestureHandlerRootView>
  );
};

export default ListScreen;
