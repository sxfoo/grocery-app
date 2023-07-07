import React, { useRef, useEffect } from 'react';
import { ScrollView, Animated, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

// Utility function for this component
import { removeChip } from '../utilityFunctions/scrollChipViewUtils'

export const ScrollChipView = ({ addedItems, setAddedItems, theme, listMetaData }) => {

    // Animation effects, currently only on expand
    const popAnim = useRef(new Animated.Value(0)).current;
    const previousAddedItemsCount = useRef(addedItems.length);

    useEffect(() => {
        if (addedItems.length > previousAddedItemsCount.current) {
            animateChips('expand');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else if (addedItems.length < previousAddedItemsCount.current) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        previousAddedItemsCount.current = addedItems.length;
    }, [addedItems]);

    const animateChips = (popDirection) => {
        // Reset the animation
        popDirection === 'expand' ? popAnim.setValue(0) : popAnim.setValue(1);

        // Start the pop-out animation for the last chip
        Animated.spring(popAnim, {
            toValue: popDirection === 'expand' ? 1 : 0,
            friction: 15,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };

    // Render only when addedItems array have something in it
    return addedItems.length !== 0 ? (
        <View>
            <Text variant="bodyMedium" style={{ fontWeight: '500', color: theme.colors.primary, marginBottom: 5 }}> Added Items: </Text>
            {/* Horizontal scroll view to hold chip items */}
            <ScrollView
                ref={ref => {
                    this.scrollView = ref;
                }}
                onContentSizeChange={() =>
                    this.scrollView.scrollToEnd({ animated: true })
                }
                horizontal={true}
                contentContainerStyle={{ gap: 10 }}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
            >
                {/* Individual Chip Items */}
                {addedItems.map((item, index) => (
                    <Animated.View
                        key={item.itemID}
                        style={[
                            index === addedItems.length - 1 && {
                                transform: [{ scale: popAnim }],
                            },
                        ]}
                    >
                        <Chip onClose={() => {
                            removeChip(item.itemID, addedItems, setAddedItems, listMetaData)
                        }}>
                            {`${item.itemName} qty:${item.quantity}`}
                        </Chip>
                    </Animated.View>
                ))}
            </ScrollView>
        </View>
    ) : null;
};