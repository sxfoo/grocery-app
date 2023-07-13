import { useState } from 'react';
import { Card, IconButton, Button, TextInput, TouchableRipple, HelperText } from 'react-native-paper'
import { View } from 'react-native';
import Animated, { Easing, FadeInUp, FadeOutDown, FadeInDown, FadeOutUp, SlideInUp, SlideOutDown } from 'react-native-reanimated'
import {
    handleOpenCloseCard,
    handleValueChange,
    handleQuantityValueChange,
    handleValueInputFocusBlur,
    handleQuantityInputFocus,
    handleQuantityInputBlur,
    validInputSubmit,
    AddToList
} from '../utilityFunctions/accordianCardUtils';
import { checkifauth, useAuthStatus } from '../utilityFunctions/checkifauth';

// A singular accordion Card item (used in renderItem in the FlatList)
export const AccordionCardItem = ({ item, textTitle, theme, setSearchQuery, setAddedItems, listMetaData }) => {

    // Used to set the card expanded state
    const [isOpen, setIsOpen] = useState(false);

    // States to keep track of unitValue, totalValue, and quantity
    const [values, setValues] = useState({
        unitValue: '0.00',
        totalValue: '0.00',
        quantity: '1'
    });

    // Helper Text object if invalid
    const [validInputs, setValidInputs] = useState({
        quantity: true,
        totalValue: true,
        unitValue: true,
    })

    return (
        // An item is a card
        <Animated.View entering={FadeInUp.duration(100)} exiting={FadeOutDown.duration(300)}>
            <Card
                mode="elevated"
                elevation={3}
                style={{
                    borderRadius: 5,
                    backgroundColor: isOpen ? theme.colors.elevation.level1 : theme.colors.background,
                    marginBottom: 15
                }}
            >
                <TouchableRipple onPress={() => handleOpenCloseCard(isOpen, setIsOpen, values, setValues)}>
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
                    <Card.Content style={{ flexDirection: 'column' }}>

                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>

                            {/* Unit Value Text Input */}
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    mode="outlined"
                                    label="Unit Value"
                                    error={!validInputs.unitValue}
                                    value={values.unitValue}
                                    onChangeText={(text) => handleValueChange(text, 'unitValue', values, setValues)}
                                    onFocus={() => handleValueInputFocusBlur('unitValue', values, setValues)}
                                    onBlur={() => handleValueInputFocusBlur('unitValue', values, setValues)}
                                    left={<TextInput.Affix text="$" />}
                                    keyboardAppearance="dark"
                                    keyboardType="decimal-pad"
                                />
                                <HelperText type="error" visible={!validInputs.unitValue}>
                                    Invalid input
                                </HelperText>
                            </View>

                            {/* Total Value Text Input */}
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    mode="outlined"
                                    label="Total Value"
                                    error={!validInputs.totalValue}
                                    value={values.totalValue}
                                    onChangeText={(text) => handleValueChange(text, 'totalValue', values, setValues)}
                                    onFocus={() => handleValueInputFocusBlur('totalValue', values, setValues)}
                                    onBlur={() => handleValueInputFocusBlur('totalValue', values, setValues)}
                                    left={<TextInput.Affix text="$" />}
                                    keyboardAppearance="dark"
                                    keyboardType="decimal-pad"
                                />
                                <HelperText type="error" visible={!validInputs.totalValue}>
                                    Invalid input
                                </HelperText>
                            </View>

                            {/* Quantity amount Text Input. Caret placement have issues on android (empty string) */}
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={{ textAlign: 'center' }}
                                    mode="outlined"
                                    label="Quantity"
                                    error={!validInputs.quantity}
                                    value={values.quantity}
                                    onChangeText={(text) => handleQuantityValueChange(text, values, setValues)}
                                    onFocus={() => handleQuantityInputFocus(values, setValues)}
                                    onBlur={() => handleQuantityInputBlur(values, setValues)}
                                    keyboardAppearance="dark"
                                    keyboardType="number-pad"
                                />
                                <HelperText type="error" visible={!validInputs.quantity}>
                                    Invalid input
                                </HelperText>
                            </View>
                        </View>

                        <Card.Actions>
                            <Button onPress={() => handleOpenCloseCard(isOpen, setIsOpen, values, setValues)}>Cancel</Button>
                            <View style={{ flex: 1 }} />
                            <Button onPress={() => {
                                setValidInputs(() => {
                                    const updatedValidInputs = validInputSubmit(values);
                                    if (updatedValidInputs.quantity && updatedValidInputs.totalValue && updatedValidInputs.unitValue) {
                                        AddToList({ item, values, setSearchQuery, setAddedItems, listMetaData });
                                    }
                                    return updatedValidInputs;
                                });
                            }}>Add to list</Button>
                        </Card.Actions>
                    </Card.Content>
                )}
            </Card>
        </Animated.View>
    );
};