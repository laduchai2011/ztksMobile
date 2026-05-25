import React, { FC, memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { MessageVideoField } from '@src/dataStruct/zalo/hookData';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import Video from 'react-native-video';

const MsgVideo: FC<{ data?: MessageV1Field<MessageVideoField> }> = ({ data }) => {
    const url = data?.message.attachments[0].payload.url;

    return (
        <View style={styles.parent}>
            <Video
                source={{ uri: url }}
                style={{
                    width: 250,
                    height: 250,
                    borderRadius: 10,
                }}
                resizeMode="contain"
                controls
                paused={true}
            />
        </View>
    );
};

export default memo(MsgVideo);
