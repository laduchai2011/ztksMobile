import React, { FC, memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { MessageAudioField } from '@src/dataStruct/zalo/hookData';

const ReplyAudio: FC<{ data: MessageV1Field<MessageAudioField> }> = ({ data }) => {
    return (
        <View style={styles.parent}>
            <Text style={styles.text}>Tin nhắn thoại</Text>
        </View>
    );
};

export default memo(ReplyAudio);
