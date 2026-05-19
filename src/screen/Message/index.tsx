import React, { useCallback } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigateEnum } from '@src/navigation/type';
import { isSignin } from '@src/utility/checkSignin';
import ReplyMember from './component/ReplyMember';
import ColorPickerDialog from './component/ColorPickerDialog';

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
            <ColorPickerDialog />
        </View>
    );
};

export default Message;
