import React, { FC, memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { MessageImageField, MessageMultiImageField } from '@src/dataStruct/zalo/hookData';

const ReplyImage: FC<{ data: MessageV1Field<MessageImageField | MessageMultiImageField> }> = ({ data }) => {
    return (
        <View style={styles.parent}>
            <Text>Hình ảnh</Text>
        </View>
    );
};

export default memo(ReplyImage);
