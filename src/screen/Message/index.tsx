import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigateEnum } from '@src/navigation/type';
import { isSignin } from '@src/utility/checkSignin';

const Message = () => {
    const navigation = useNavigation<any>();

    useFocusEffect(
        useCallback(() => {
            isSignin().then((result) => {
                if (!result) {
                    navigation.navigate(NavigateEnum.SIGNIN);
                }
            });
        }, [])
    );

    return (
        <View style={styles.parent}>
            <Text>Message</Text>
        </View>
    );
};

export default Message;
