import React, { FC, memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { MessageStickerField } from '@src/dataStruct/zalo/hookData';

const ReplySticker: FC<{ data: MessageV1Field<MessageStickerField> }> = ({ data }) => {
    return (
        <View style={styles.parent}>
            <Text>Sticker</Text>
        </View>
    );
};

export default memo(ReplySticker);
