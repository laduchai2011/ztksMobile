import React, { memo, FC } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import { Zalo_Event_Name_Enum } from '@src/dataStruct/zalo/hookData/common';
import {
    ZaloMessageType,
    MessageTextField,
    MessageImageField,
    MessageMultiImageField,
    MessageVideoField,
    MessageAudioField,
    MessageFileField,
    MessageStickerField,
} from '@src/dataStruct/zalo/hookData';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import MsgText from './MsgText';
import MsgImage from './MsgImage';
import MsgVideo from './MsgVideo';
import MsgSticker from './MsgSticker';

const UserMsg: FC<{
    data: MessageV1Field<ZaloMessageType>;
    messages: MessageV1Field<ZaloMessageType>[];
}> = ({ data, messages }) => {
    const msg = () => {
        const event_name = data.event_name;

        switch (event_name) {
            case Zalo_Event_Name_Enum.user_send_text: {
                const data_t = data as MessageV1Field<MessageTextField>;
                return <MsgText data={data_t} />;
            }
            case Zalo_Event_Name_Enum.user_send_image: {
                const data_t = data as MessageV1Field<MessageImageField | MessageMultiImageField>;
                return <MsgImage data={data_t} />;
            }
            case Zalo_Event_Name_Enum.user_send_video: {
                const data_t = data as MessageV1Field<MessageVideoField>;
                return <MsgVideo data={data_t} />;
            }
            // case Zalo_Event_Name_Enum.user_send_audio: {
            //     const data_t = data as MessageV1Field<MessageAudioField>;
            //     return <MsgAudio data={data_t} />;
            // }
            // case Zalo_Event_Name_Enum.user_send_file: {
            //     const data_t = data as MessageV1Field<MessageFileField>;
            //     return <MsgFile data={data_t} />;
            // }
            case Zalo_Event_Name_Enum.user_send_sticker: {
                const data_t = data as MessageV1Field<MessageStickerField>;
                return <MsgSticker data={data_t} />;
            }
            // case Zalo_Event_Name_Enum.user_send_link: {
            //     const data_t = data as MessageV1Field<MessageLinkField>;
            //     return <MsgLink data={data_t} />;
            // }
            default: {
                return;
            }
        }
    };

    return (
        <View style={styles.parent}>
            <View style={styles.main}>
                <View style={styles.avatarContainer}>
                    <FastImage
                        style={styles.avatar}
                        source={{
                            uri: 'https://picsum.photos/300/300',
                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.immutable,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View style={styles.msgContainer}>{msg()}</View>
                <View>
                    <Entypo name="reply" size={22} color="gray" />
                </View>
            </View>
        </View>
    );
};

export default memo(UserMsg);
