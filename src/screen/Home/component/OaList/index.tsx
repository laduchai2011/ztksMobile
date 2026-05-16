import React, { memo, useState, useRef, useEffect } from 'react';
import { Animated, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Entypo from 'react-native-vector-icons/Entypo';

const OaList = () => {
    const [isShow, setIsShow] = useState(false);
    const maxHeightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(maxHeightAnim, {
            toValue: isShow ? 300 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isShow]);

    const handleIsShow = () => {
        setIsShow(!isShow);
    };

    const handleSelect = () => {};

    return (
        <View style={styles.parent}>
            <View style={styles.selected}>
                <View style={styles.selectedText}>
                    <Text>sdfsdf</Text>
                </View>
                {!isShow && (
                    <TouchableOpacity onPress={() => handleIsShow()}>
                        <Entypo name="chevron-small-down" size={28} color="black" />
                    </TouchableOpacity>
                )}
                {isShow && (
                    <TouchableOpacity onPress={() => handleIsShow()}>
                        <Entypo name="chevron-small-up" size={28} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <Animated.View
                style={[
                    styles.list,
                    {
                        maxHeight: maxHeightAnim,
                    },
                ]}
            >
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7]}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.oneOa} onPress={() => handleSelect()}>
                            <Text>Bấm</Text>
                        </TouchableOpacity>
                    )}
                />
            </Animated.View>
        </View>
    );
};

export default memo(OaList);
