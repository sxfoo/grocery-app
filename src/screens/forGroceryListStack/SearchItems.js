import { useState, useRef, useEffect, useMemo } from 'react';
import { Text, Searchbar, List, Divider, useTheme, Card, IconButton, Button, TextInput, Chip, TouchableRipple } from 'react-native-paper'
import { View, StyleSheet, Animated, KeyboardAvoidingView, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import groceryListItem from '../../../assets/mockDataResource/listOfGroceryItems'

import { db, collection, addDoc } from '../../../firebaseConfig'

{/* Send item details to server */}
const TestingAdd = async ( { item, values } ) => {

    const data = {
        itemID: item.id, 
        itemName: item.name,
        category: item.category,
        quantity: values.quantity,
        unitPrice: values.unitValue,
        totalPrice: values.totalValue,
    }

    console.log("Document written: ", data)

    try {
        const docRef = await addDoc(collection(db, "/users/LJoaz5f58mqE5X6TyO21/Home"), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    } 
}

// A singular accordion Card item (used in renderItem in the FlatList)
const AccordionCardItem = ({ item, textTitle, theme }) => {

    // Used to set the card expanded state
    const [isOpen, setIsOpen] = useState(false);

    // States to keep track of unitValue, totalValue, and quantity
    const [values, setValues] = useState({
        unitValue: '0.00',
        totalValue: '0.00',
        quantity: '1'
    });

    // Function to handle onPressoftheCard.
    const handleOpenCloseCard = () => {

        setIsOpen(!isOpen);

        // If card is closed (not expanded)
        if (!isOpen) {

            // If invalid values such as empty string, or quantity 0 - set values to default
            if (values.unitValue === '') {
                setValues(prevValues => ({
                    ...prevValues,
                    unitValue: '0.00',
                    totalValue: '0.00'
                }));
            }

            if (values.quantity === '' || values.quantity === '0') {
                setValues(prevValues => ({
                    ...prevValues,
                    quantity: '1'
                }));
            }
        }
    };

    // Function to handle onChange of unitValue or totalValue text input
    const handleValueChange = (text, inputName) => {

        // numericValue to replace text with decimal only numbers (including decimal point)
        const numericValue = text.replace(/[^0-9.]/g, '');

        /* To limit the text to 2 decimal points. */
        // Split string by the first decimal point if present
        // Take 2 digits to form decimal part.
        const parts = numericValue.split('.');
        let limitedValue = numericValue;
        if (parts.length > 1) {
            const decimalPart = parts[1].slice(0, 2);
            limitedValue = `${parts[0]}.${decimalPart}`;
        }

        // Calculate unit value from total value / quantity if the changed input is totalValue
        // Calculate total value from unit value * quantity if the changed input is unitValue
        const newOtherValue = inputName === 'totalValue'
            ? parseFloat(limitedValue) / parseInt(values.quantity)
            : parseFloat(limitedValue) * parseInt(values.quantity);

        // Check if newOtherValue is NaN
        const isOtherValueNaN = isNaN(newOtherValue);

        // Set values of unit value and total value accordingly
        setValues(prevValues => ({
            ...prevValues,
            unitValue: inputName === 'totalValue' ? (isOtherValueNaN ? '0.00' : newOtherValue.toFixed(2)) : limitedValue,
            totalValue: inputName === 'totalValue' ? limitedValue : (isOtherValueNaN ? '0.00' : newOtherValue.toFixed(2))
        }));
    };

    // Function to handle onChange of quantityValue text input
    const handleQuantityValueChange = (text) => {

        const textValue = text.replace(/\D/g, '');

        // Set total Value with a change in quantity
        const multipliedValue = parseFloat(values.unitValue) * parseInt(text);

        setValues(prevValues => ({
            ...prevValues,
            quantity: textValue,
            totalValue: isNaN(multipliedValue) ? prevValues.unitValue : multipliedValue.toFixed(2)
        }));
    };

    // Function to handle what happens when the value input is focused or blurred
    const handleValueInputFocusBlur = (inputName) => {

        const value = values[inputName];

        if (value === '0.00') {
            setValues(prevValues => ({
                ...prevValues,
                [inputName]: ''
            }));

        } else if (value === '') {
            setValues(prevValues => ({
                ...prevValues,
                [inputName]: '0.00'
            }));
        }
    };

    // Function to handle what happens when the quantity input is focused or blurred
    const handleQuantityInputFocusBlur = () => {
        if (values.quantity === '1') {
            setValues(prevValues => ({
                ...prevValues,
                quantity: ''
            }));
        } else if (values.quantity === '' || values.quantity === '0') {
            setValues(prevValues => ({
                ...prevValues,
                quantity: '1'
            }));
        }
    };

    return (
        // An item is a card 
        <Card
            mode="elevated"
            elevation={3}
            style={{
                borderRadius: 5,
                backgroundColor: isOpen ? theme.colors.elevation.level1 : theme.colors.background,
                marginBottom: 15
            }}
        >
            <TouchableRipple onPress={handleOpenCloseCard}>
                <Card.Title
                    title={textTitle}
                    titleVariant={'bodyLarge'}
                    right={(props) => (
                        <IconButton
                            {...props}
                            size={24}
                            icon={isOpen ? 'minus-thick' : 'plus-thick'}
                        />
                    )}
                />
            </TouchableRipple>

            {/* Only render user's additional options if card is expanded */}
            {isOpen && (
                <Card.Content style={{ flexDirection: 'column', gap: 40 }}>

                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>

                        {/* Unit Value Text Input */}
                        <TextInput
                            style={{ flex: 1 }}
                            mode="outlined"
                            label="Unit Value"
                            value={values.unitValue}
                            onChangeText={(text) => handleValueChange(text, 'unitValue')}
                            onFocus={() => handleValueInputFocusBlur('unitValue')}
                            onBlur={() => handleValueInputFocusBlur('unitValue')}
                            left={<TextInput.Affix text="$" />}
                            keyboardAppearance="dark"
                            keyboardType="decimal-pad"
                        />

                        {/* Total Value Text Input */}
                        <TextInput
                            style={{ flex: 1 }}
                            mode="outlined"
                            label="Total Value"
                            value={values.totalValue}
                            onChangeText={(text) => handleValueChange(text, 'totalValue')}
                            onFocus={() => handleValueInputFocusBlur('totalValue')}
                            onBlur={() => handleValueInputFocusBlur('totalValue')}
                            left={<TextInput.Affix text="$" />}
                            keyboardAppearance="dark"
                            keyboardType="decimal-pad"
                        />

                        {/* Quantity amount Text Input. Caret placement have issues on android (empty string) */}
                        <TextInput
                            style={{ flex: 1, textAlign: 'center' }}
                            mode="outlined"
                            label="Quantity"
                            value={values.quantity}
                            onChangeText={handleQuantityValueChange}
                            onFocus={handleQuantityInputFocusBlur}
                            onBlur={handleQuantityInputFocusBlur}
                            keyboardAppearance="dark"
                            keyboardType="number-pad"
                        />
                    </View>

                    {/* Not working buttons */}

                    <Card.Actions>
                        <Button onPress={handleOpenCloseCard}>Cancel</Button>
                        <View style={{ flex: 1 }} />
                        <Button onPress={() => {TestingAdd({item: item, values: values})}}>Add to list</Button>
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

    const front = item.name.slice(0, inputTextLength);
    const back = item.name.slice(inputTextLength);

    const textTitle = (
        <Text>
            <Text style={{ fontWeight: 'bold' }}>{front}</Text>
            <Text style={{ color: theme.colors.onSurfaceDisabled }}>{back}</Text>
        </Text>
    );

    // How each item in flatlist is rendered: 
    return (
        <AccordionCardItem item={item} textTitle={textTitle} theme={theme} />
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
    const filteredItems = useMemo(() => {
        if (searchQuery === '') {
            return [];
        }
        const matchedItems = groceryListItem.filter((item) =>
            item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
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

    return (

        // Renders the search bar, and the flat list.
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "padding"}
            style={styles.searchContainer}
            keyboardVerticalOffset={Platform.OS == "ios" ? 100 : 150} // Adjust the offset as needed
        >

            <View style={{ paddingHorizontal: 10, gap: 10 }}>
                <Searchbar
                    style={{ borderRadius: 10 }}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />

                <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
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