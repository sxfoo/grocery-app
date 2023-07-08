import React, { useCallback } from 'react';
import { Pressable as RNPressable } from 'react-native';

const PressableOpacity = ({ children, style, activeOpacity, ...otherProps }) => {
    const _style = useCallback(
        ({ pressed }) => [{ opacity: pressed ? activeOpacity : 1 }, style && style],
        [style]
    );

    return (
        <RNPressable style={_style} {...otherProps}>
            {children}
        </RNPressable>
    );
}

export default PressableOpacity;