import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { styles } from './styles';

const Dot = ({ delay }: { delay: number }) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();

        return () => animation.stop();
    }, [delay, opacity]);

    return (
        <Animated.View
            style={[
                styles.dot,
                {
                    opacity,
                    transform: [
                        {
                            scale: opacity.interpolate({
                                inputRange: [0.3, 1],
                                outputRange: [1, 1.3],
                            }),
                        },
                    ],
                },
            ]}
        />
    );
};

export default Dot;
