import { useState, useRef, useEffect } from 'react';
import { Text, Searchbar, List, Divider, useTheme} from 'react-native-paper'
import { View, StyleSheet, FlatList, Animated, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import groceryListItem from '../assets/mockDataResource/listOfGroceryItems'

/* Renders the search item bar + Flat List */
const SearchItemsBar = () => {

    /* Using react native paper theme */
    const theme = useTheme();

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
    
    // filteredItems is a letter filter (based on searchQuery) of groceryListItem array.
    // returns an array that matches the front few characters of searchQuery
    const filteredItems = groceryListItem.filter((item) => {
        return (
            item.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
    });

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
    
    // renderItem function is used to describe the rendering of each item in the Flat list
    const renderItem = ({ item }) => {
        
        // For animation stuff, bolds the matching letters,
        // sets the color for the rest of the letters to be onSurfaceDisabled (react paper theme)
        const inputTextLength = searchQuery.length;

        const front = item.slice(0, inputTextLength);
        const back = item.slice(inputTextLength);

        const boldTitle = (
            <Text>
                <Text style={{ fontWeight: 'bold' }}>{front}</Text>
                <Text style={{ color: theme.colors.onSurfaceDisabled }}>{back}</Text>
            </Text>
        );
        
        // How each item in flatlist is rendered: 
        // Currently a list accordian without logic
        return (
            <List.Accordion
                title={boldTitle}
                titleStyle={{ color: 'blue' }}
                right={(props) => <List.Icon {...props} icon="plus-thick" />}
            >
            </List.Accordion>
        );
    };

    return (

        // Renders the search bar, and the flat list.
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "padding"}
            style={styles.searchContainer}
            keyboardVerticalOffset={Platform.OS == "ios" ? 100 : 150} // Adjust the offset as needed
        >
            <Searchbar
                style={{ borderRadius: 10, marginHorizontal: 10 }}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />

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
                    {animationPlayed && delayedRendering && (
                        <FlatList
                            data={filteredItems}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={renderItem}
                        />
                    )}
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

/* The Overall Screen */
const SimpleScreen = () => {

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