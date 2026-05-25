import React, { FC, memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { MessageTextField } from '@src/dataStruct/zalo/hookData';

const ReplyText: FC<{ data: MessageV1Field<MessageTextField> }> = ({ data }) => {
    return (
        <View style={styles.parent}>
            <Text>ReplyText</Text>
        </View>
    );
};

export default memo(ReplyText);
