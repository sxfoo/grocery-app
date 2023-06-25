import { useState, useRef, useEffect } from 'react';
import { Text, Searchbar, List, Divider, useTheme, Card, IconButton, Button, TextInput, SegmentedButtons } from 'react-native-paper'
import { View, StyleSheet, Animated, KeyboardAvoidingView, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import groceryListItem from '../assets/mockDataResource/listOfGroceryItems'

// A singular accordian Card item (used in renderItem in the FlatList)
const AccordionCardItem = ({ textTitle, theme }) => {

    // Used to set the card expanded state
    const [isOpen, setIsOpen] = useState(false);

    // States to keep track of unitValue, totalValue and quantity
    const [unitValue, setUnitValue] = useState('0.00')
    const [totalValue, setTotalValue] = useState('0.00')
    const [quantity, setQuantity] = useState('1');

    // Function to handle onPress of Card
    const handleOpenCloseCard = () => {
        setIsOpen(!isOpen)
        if (unitValue === '') {
            setUnitValue('0.00')
            setTotalValue('0.00')
        }
        if (quantity === '' || '0') {
            setQuantity('1')
        }
    }
    
    // Function to handle onChange of quantityValue text input
    const handleQuantityValueChange = (text) => {
        setQuantity(text);
    }
    

    // Function to handle onChange of unitValue text input
    // Function used with TotalValue also for now
    const handleUnitValueChange = (text) => {

        // Remove any non-numeric characters from the input
        const numericValue = text.replace(/[^0-9.]/g, '');

        // Split the value by the decimal point
        const parts = numericValue.split('.');

        // Keep only the first two decimal places, if present
        let limitedValue = numericValue;
        if (parts.length > 1) {
            const decimalPart = parts[1].slice(0, 2);
            limitedValue = `${parts[0]}.${decimalPart}`;
        }

        // Convert limitedValue to a number and multiply it by quantity
        const multipliedValue = parseFloat(limitedValue) * parseInt(quantity);

        // Set the value to string value or empty string if it's empty
        setUnitValue(limitedValue || '');
        setTotalValue(multipliedValue.toFixed(2) || '');
    };

    // Function to handle what happens when textinput is not focused
    // Used with both unitValue and totalValue text input for now.
    const handleInputBlur = () => {
        if (unitValue === '') {
            // Set the value to '0.00' if it's empty and loses focus
            setUnitValue('0.00');
            setTotalValue('0.00');
        }
    };

    // Function to handle what happens when textinput is focused
    // Used with both unitValue and totalValue text input for now.
    const handleInputFocus = () => {
        if (unitValue === '0.00') {
            // Set the value to '0.00' if it's empty and loses focus
            setUnitValue('');
            setTotalValue('');
        }
    };

    return (

        // React native paper card component
        <Card
            mode='elevated'
            elevation={3}
            style={{
                borderRadius: 5,
                backgroundColor: isOpen ? theme.colors.elevation.level1 : theme.colors.background,
                marginBottom: 15,
            }}
            onPress={handleOpenCloseCard}
        >

            {/* List item name */}
            <Card.Title
                title={textTitle}
                right={(props) => <IconButton {...props} icon={isOpen ? "minus-thick" : "plus-thick"} />}
            />

            {/* Render only if card is expanded */}
            {isOpen && (
                <Card.Content style={{ flexDirection: 'column', gap: 20, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1 }}
                            mode='outlined'
                            label="Unit Value"
                            value={unitValue}
                            onChangeText={handleUnitValueChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            left={<TextInput.Affix text='$' />}
                            keyboardAppearance='dark'
                            keyboardType='decimal-pad'
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            mode='outlined'
                            label="Total Value"
                            value={totalValue}
                            left={<TextInput.Affix text='$' />}
                            keyboardAppearance='dark'
                            keyboardType='decimal-pad'
                        />
                        <TextInput
                            style={{ flex: 1, textAlign: 'center' }}
                            mode='outlined'
                            label="Quantity"
                            value={quantity}
                            onChangeText={handleQuantityValueChange}
                            keyboardAppearance='dark'
                            keyboardType='number-pad'
                        />
                    </View>

                    {/* Button actions for adding item to list. Does not work for now */}
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Add to list</Button>
                    </Card.Actions>
                </Card.Content>
            )}
        </Card>
    );
};

// renderItem function is used to describe the rendering of each item in the Flat list
const renderItem = ({ item, theme, searchQuery }) => {

    // For animation stuff, bolds the matching letters,
    // sets the color for the rest of the letters to be onSurfaceDisabled (react paper theme)
    const inputTextLength = searchQuery.length;

    const front = item.slice(0, inputTextLength);
    const back = item.slice(inputTextLength);

    const textTitle = (
        <Text>
            <Text style={{ fontWeight: 'bold' }}>{front}</Text>
            <Text style={{ color: theme.colors.onSurfaceDisabled }}>{back}</Text>
        </Text>
    );

    // How each item in flatlist is rendered: 
    return (
        <AccordionCardItem textTitle={textTitle} theme={theme} />
    );
};

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
    const filteredItems = [...groceryListItem.filter((item) => {
        return (
            item.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
    }), searchQuery];

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
                    {delayedRendering && (
                        <FlatList
                            data={filteredItems}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={(props) => renderItem({ ...props, theme, searchQuery })}
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