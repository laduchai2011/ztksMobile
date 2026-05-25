import React, { FC, memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { MessageVideoField } from '@src/dataStruct/zalo/hookData';

const ReplyVideo: FC<{ data: MessageV1Field<MessageVideoField> }> = ({ data }) => {
    return (
        <View style={styles.parent}>
            <Text>Thước phim</Text>
        </View>
    );
};

export default memo(ReplyVideo);
