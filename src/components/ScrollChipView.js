import React, { useRef, useEffect } from 'react';
import { ScrollView, Animated, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

export const ScrollChipView = ({ addedItems, theme }) => {

    const popAnim = useRef(new Animated.Value(0)).current;
    const previousAddedItemsCount = useRef(addedItems.length);

    useEffect(() => {
        if (addedItems.length > previousAddedItemsCount.current) {
            animateChips();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        previousAddedItemsCount.current = addedItems.length;
    }, [addedItems]);

    const animateChips = () => {
        // Reset the animation
        popAnim.setValue(0);

        // Start the pop-out animation for the last chip
        Animated.spring(popAnim, {
            toValue: 1,
            friction: 15,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };

    return addedItems.length !== 0 ? (
        <View>
            <Text variant="bodyMedium" style={{ fontWeight: '500', color: theme.colors.primary, marginBottom: 5 }}> Added Items: </Text>
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
            >
                {addedItems.map((item, index) => (
                    <Animated.View
                        key={item.itemID}
                        style={[
                            index === addedItems.length - 1 && {
                                transform: [{ scale: popAnim }],
                            },
                        ]}
                    >
                        <Chip onClose={() => { }}>{`${item.itemName} qty:${item.quantity}`}</Chip>
                    </Animated.View>
                ))}
            </ScrollView>
        </View>
    ) : null;
};