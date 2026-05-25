import React, { FC, memo, useState, useRef, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import UserMsg from './component/UserMsg';
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
    const flatListRef = useRef<FlatList>(null);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const loadingRef = useRef(false);
    const lockLoadMore = useRef<boolean>(true);
    const firstLoadedRef = useRef(false);
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
        if (firstLoadedRef.current) return;
        getMessages({ cursor: null, size: size, chatRoomId: Number(id) })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData.data) {
                    // xep lai du lieu
                    const mesArray: MessageV1Field<ZaloMessageType>[] = [];
                    for (let i: number = 0; i < resData.data.items.length; i++) {
                        mesArray.unshift(resData.data.items[i]);
                    }
                    setMessages(mesArray);
                    setCursor(resData.data.cursor);
                    setHasMore(resData.data?.items.length === size);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => (lockLoadMore.current = false));
    }, [getMessages, id]);

    const loadMore = async () => {
        if (lockLoadMore.current) return;
        if (loadingRef.current) return;
        if (!hasMore) return;
        if (!cursor) return;

        try {
            loadingRef.current = true;
            setLoadingMore(true);

            const res = await getMessages({
                cursor,
                size: size,
                chatRoomId: id,
            });

            const resData = res.data;

            if (resData?.isSuccess && resData.data) {
                const oldMessages = resData.data.items || [];

                // xep lai du lieu
                const mesArray: MessageV1Field<ZaloMessageType>[] = [];
                for (let i: number = 0; i < oldMessages.length; i++) {
                    mesArray.unshift(resData.data.items[i]);
                }

                setMessages((prev) => [...prev, ...mesArray]);
                // setMessages((pre) => [...(resData.data?.items || []), ...pre]);

                setCursor(resData.data.cursor);

                if (oldMessages.length < size) {
                    setHasMore(false);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            loadingRef.current = false;
            setLoadingMore(false);
        }
    };

    return (
        <View style={styles.parent}>
            <FlatList
                style={styles.list}
                ref={flatListRef}
                data={messages}
                inverted
                keyExtractor={(item) => item.message_id}
                renderItem={({ item }) => {
                    const eventName = item.event_name;

                    const isUserSend = eventName.startsWith('user_send');
                    const isOaSend = eventName.startsWith('oa_send');

                    if (isUserSend) {
                        return <UserMsg key={item.message_id} data={item} messages={messages} />;
                    }

                    if (isOaSend) {
                        return <MyMsg key={item.message_id} data={item} messages={messages} />;
                    }

                    return null;
                }}
                onEndReached={loadMore}
                onEndReachedThreshold={0.2}
                ListFooterComponent={loadingMore ? <ActivityIndicator size="small" /> : null}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default memo(MsgList);
