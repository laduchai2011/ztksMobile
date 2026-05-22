import React, { memo, FC } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { ZaloMessageType, MessageTextField } from '@src/dataStruct/zalo/hookData';

const MsgText: FC<{ data: MessageV1Field<MessageTextField> }> = ({ data }) => {
    return (
        <View style={styles.parent}>
            <Text>This is a simple message text.</Text>
        </View>
    );
};

export default memo(MsgText);
