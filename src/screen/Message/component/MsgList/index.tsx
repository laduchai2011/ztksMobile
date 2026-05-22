import React, { FC, memo, useState, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import MyMsg from './component/MyMsg';
import {
    useLazyGetMessagesForChatScreenQuery,
    useLazyGetMessageWithIdQuery,
    useLazyDelAllNewMessagesQuery,
} from '@src/redux/query/messageV1RTK';
import { MessageV1Field } from '@src/dataStruct/message_v1';
import { ZaloMessageType } from '@src/dataStruct/zalo/hookData';
import { getSocket } from '@src/socketIo';
import { SocketMessageField } from '@src/dataStruct/message_v1';

const MsgList: FC<{ id: number }> = ({ id }) => {
    const [messages, setMessages] = useState<MessageV1Field<ZaloMessageType>[]>([]);
    const size = 10;
    const lockLoadMore = useRef<boolean>(true);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [getMessageWithId] = useLazyGetMessageWithIdQuery();
    const [delAllNewMessages] = useLazyDelAllNewMessagesQuery();

    useEffect(() => {
        if (!id) return;
        const socket = getSocket();

        const handleDelMsg = () => {
            delAllNewMessages({ chatRoomId: id.toString() })
                .then((res) => {
                    const resData = res.data;
                    console.log('delAllNewMessages', resData);
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        handleDelMsg();

        const scrollToBottom = () => {
            // if (!bottom_element.current) return;
            // const bottomElement = bottom_element.current;
            // bottomElement.scrollIntoView({ behavior: 'auto' });
        };

        const onSocketMessage = (socketMsg: SocketMessageField) => {
            const msgId = socketMsg._id;
            getMessageWithId({ id: msgId })
                .then((res) => {
                    const resData = res.data;
                    console.log('getMessageWithId', resData);
                    if (resData?.isSuccess && resData.data) {
                        const newMsg = resData.data;
                        setMessages((prev) => [...prev, newMsg]);
                        setTimeout(() => {
                            // scrollToBottom();
                            handleDelMsg();
                        }, 10);
                    }
                })
                .catch((err) => console.error(err));
        };

        socket.on('socketMessage', onSocketMessage);

        return () => {
            socket.off('socketMessage', onSocketMessage);
        };
    }, [id, getMessageWithId, delAllNewMessages]);

    const [getMessages] = useLazyGetMessagesForChatScreenQuery();
    useEffect(() => {
        if (!id) return;
        getMessages({ cursor: null, size: size, chatRoomId: Number(id) })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData.data) {
                    setMessages(resData.data?.items);
                    setCursor(resData.data.cursor);
                    setHasMore(resData.data?.items.length === size);
                }
                // requestAnimationFrame(() => {
                //     if (!parent_element.current) return;
                //     const parentElement = parent_element.current;
                //     parentElement.scrollTop = parentElement.scrollHeight;
                // });
            })
            .catch((err) => console.error(err))
            .finally(() => (lockLoadMore.current = false));
    }, [getMessages, id]);

    const list_message = messages.map((item, index) => {
        const eventName = item.event_name;
        const isUserSend = eventName.startsWith('user_send');
        const isOaSend = eventName.startsWith('oa_send');

        // if (isUserSend) {
        //     return <UserMsg key={index} msgList_element={parent_element.current} data={item} messages={messages} />;
        // }

        if (isOaSend) {
            return <MyMsg key={index} data={item} messages={messages} />;
        }

        return;
    });

    return (
        <View style={styles.parent}>
            {/* <MyMsg /> */}
            {list_message}
        </View>
    );
};

export default memo(MsgList);
