import React, { FC, useCallback } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigateEnum } from '@src/navigation/type';
import { isSignin } from '@src/utility/checkSignin';
import ReplyMember from './component/ReplyMember';
import MsgList from './component/MsgList';
import ColorPickerDialog from './component/ColorPickerDialog';

const Message: FC<{ route: any }> = ({ route }) => {
    const navigation = useNavigation<any>();
    const { id } = route.params;

    useFocusEffect(
        useCallback(() => {
            isSignin().then((result) => {
                if (!result) {
                    navigation.navigate(NavigateEnum.SIGNIN);
                }
            });
        }, [])
    );

    if (!id) {
        return null;
    }

    return (
        <View style={styles.parent}>
            <ReplyMember />
            <MsgList id={Number(id)} />
            <ColorPickerDialog />
        </View>
    );
};

export default Message;
