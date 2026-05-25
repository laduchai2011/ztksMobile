import React, { FC, memo, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { styles } from './styles';
import { MessageImageField, MessageMultiImageField } from '@src/dataStruct/zalo/hookData';
import { MessageV1Field } from '@src/dataStruct/message_v1';

const MsgImage: FC<{ data?: MessageV1Field<MessageImageField | MessageMultiImageField> }> = ({ data }) => {
    const url = data?.message.attachments[0].payload.url;

    const [size, setSize] = useState({ width: 0, height: 0 });

    const MAX_WIDTH = 250;
    const MAX_HEIGHT = 250;

    useEffect(() => {
        if (!url) return;

        Image.getSize(url, (w, h) => {
            const ratio = Math.min(MAX_WIDTH / w, MAX_HEIGHT / h);

            setSize({
                width: w * ratio,
                height: h * ratio,
            });
        });
    }, []);

    return (
        <View style={styles.parent}>
            <Image
                style={{
                    width: size.width,
                    height: size.height,
                }}
                source={{ uri: url }}
            />
        </View>
    );
};

export default memo(MsgImage);
