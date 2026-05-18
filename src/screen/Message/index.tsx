import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigateEnum } from '@src/navigation/type';
import { isSignin } from '@src/utility/checkSignin';
import ReplyMember from './component/ReplyMember';

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
            <ReplyMember />
        </View>
    );
};

export default Message;
