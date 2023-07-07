import { useState, useRef, useEffect, useMemo } from 'react';
import { Text, Searchbar, List, Divider, useTheme } from 'react-native-paper'
import { View, StyleSheet, Animated, KeyboardAvoidingView, FlatList, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import groceryListItem from '../../../assets/mockDataResource/listOfGroceryItems'
import { AccordionCardItem } from '../../components/AccordionCardItem';
import { ScrollChipView } from '../../components/ScrollChipView';

// renderItem function is used to describe the rendering of each item in the Flat list
const renderItem = ({ item, theme, searchQuery, setSearchQuery, setAddedItems, listMetaData }) => {

    // For animation stuff, bolds the matching letters,
    // sets the color for the rest of the letters to be onSurfaceDisabled (react paper theme)
    const inputTextLength = searchQuery.length;

    const front = item.name.slice(0, inputTextLength);
    const back = item.name.slice(inputTextLength);

    const textTitle = (
        <Text variant='bodyLarge'>
            <Text style={{ fontWeight: 'bold' }}>{front}</Text>
            <Text style={{ color: theme.colors.onSurfaceDisabled }}>{back}</Text>
        </Text>
    );

    // How each item in flatlist is rendered: 
    return (
        <AccordionCardItem
            item={item}
            textTitle={textTitle}
            theme={theme}
            setSearchQuery={setSearchQuery}
            setAddedItems={setAddedItems} 
            listMetaData={listMetaData}
        />
    );
};

/* Renders the search item bar + Flat List */
const SearchItemsBar = () => {

    /* Using react native paper theme */
    const theme = useTheme();

    /* Get listmetaData through navigation */
    const route = useRoute();
    const { listMetaData } = route.params;

    /* Search logic + Animations */
    // searchQuery holds the input value of searchbar
    const [searchQuery, setSearchQuery] = useState('');

    // onChangeSearch triggers when input value changes
    const onChangeSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setAnimationPlayed(false);
            setDelayedRendering(false);
        }
    };

    const [addedItems, setAddedItems] = useState([]);

    // filteredItems is a letter filter (based on searchQuery) of groceryListItem array.
    // returns an array that matches the front few characters of searchQuery
    const filteredItems = useMemo(() => {
        if (searchQuery === '') {
            return [];
        }

        // Filter items in groceryListItem (mock data resource) based on searchQuery
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        const matchedItems = groceryListItem.filter((item) =>
            item.name.toLowerCase().startsWith(lowerCaseSearchQuery)
        );

        // If searchQuery exist in list, do not include user search inside
        const lowerCaseMatchedItems = matchedItems.map((item) => item.name.toLowerCase());
        const searchQueryExists = lowerCaseMatchedItems.includes(lowerCaseSearchQuery);

        if (searchQueryExists) {
            return matchedItems;
        }

        return [...matchedItems, { id: "userInput", name: searchQuery, category: "Uncategorised" }];
    }, [groceryListItem, searchQuery]);

    // Animation state variables
    const animationVariable = useRef(new Animated.Value(-40)).current;
    const opacityVariable = useRef(new Animated.Value(0)).current;

    const [animationPlayed, setAnimationPlayed] = useState(false);
    const [delayedRendering, setDelayedRendering] = useState(false);

    // Sliding animation function, slides downwards and fade in
    const SlidingAnimation = () => {
        animationVariable.setValue(-40);
        opacityVariable.setValue(0);
        Animated.parallel([
            Animated.timing(animationVariable, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacityVariable, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }

    // Used for delayedRendering of Flatlist
    useEffect(() => {
        if (searchQuery.length === 1 && !animationPlayed) {
            SlidingAnimation();
            setAnimationPlayed(true);
            setTimeout(() => {
                setDelayedRendering(true);
            }, 200);
        }
    }, [searchQuery]);


    const searchInputRef = useRef(null);

    return (

        // Renders the search bar, and the flat list.
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "padding"}
            style={styles.searchContainer}
            keyboardVerticalOffset={Platform.OS == "ios" ? 100 : 150} // Adjust the offset as needed
        >

            <View style={{ paddingHorizontal: 10, gap: 10 }}>
                <Searchbar
                    ref={searchInputRef}
                    style={{ borderRadius: 10 }}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <ScrollChipView addedItems={addedItems} setAddedItems={setAddedItems} theme={theme} />
            </View>

            {/* if searchinput value is empty, do not render Flat List */}
            {searchQuery !== '' && (
                <View style={{ flex: 1 }}>
                    <Animated.View style={{ opacity: opacityVariable, transform: [{ translateY: animationVariable }] }}>
                        <List.Item
                            title={searchQuery}
                            left={(props) => <List.Icon {...props} icon="text-box-search" />}
                        />
                    </Animated.View>
                    <Divider />

                    {/* Animation purposes - delayedRendering of Flat List */}
                    {delayedRendering && (
                        <FlatList
                            data={filteredItems}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={(props) => renderItem({ ...props, theme, searchQuery, setSearchQuery, setAddedItems, listMetaData })}
                            keyboardShouldPersistTaps='handled'
                        />
                    )}
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

/* The Overall Screen */
const SimpleScreen = () => {

    {/* Disabled animations on android */}
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
          UIManager.setLayoutAnimationEnabledExperimental(false);
        }
      }

    return (
        <SafeAreaProvider>
            <SearchItemsBar />
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    searchContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingTop: 16
    }

});

export default SimpleScreen;