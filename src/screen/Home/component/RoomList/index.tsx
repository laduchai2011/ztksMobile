import React, { memo, useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@src/redux';
import OneRoom from './component/OneRoom';
import { useLazyGetChatRoomsMongoQuery } from '@src/redux/query/chatRoomRTK';
import { setIsShow_messageDialog, setData_messageDialog, set_isLoading } from '@src/redux/slice/Home';
import { MessageDialog_TypeEnum } from '@src/component/MessageDialog/type';
import { AccountField } from '@src/dataStruct/account';
import { ChatRoomRoleSchema } from '@src/dataStruct/chatRoom';
import { ZaloOaField } from '@src/dataStruct/zalo';
import { SEE_MORE } from '@src/const/text';
import { getSocket } from '@src/socketIo';
import { SocketMessageField } from '@src/dataStruct/message_v1';

const RoomList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const account: AccountField | undefined = useSelector((state: RootState) => state.AppSlice.account);
    const selectedOa: ZaloOaField | undefined = useSelector((state: RootState) => state.AppSlice.selectedOa);
    const [chatRoomRoleSchemas, setChatRoomRoleSchemas] = useState<ChatRoomRoleSchema[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const limit = 30;
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [getChatRoomsMongo] = useLazyGetChatRoomsMongoQuery();
    const [socketMsg, setSocketMsg] = useState<SocketMessageField | undefined>(undefined);

    // const [data, setData] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const socket = getSocket();

        const onSocketMessageAllRoom = (socketMsg: SocketMessageField) => {
            const chatRoomId = socketMsg.chatRoomId;

            setTimeout(() => {
                setChatRoomRoleSchemas((prev) => {
                    const index = prev.findIndex((item) => item.chat_room_id === chatRoomId);
                    if (index < 0) {
                        setSocketMsg(socketMsg); // nếu người dùng mới
                        return prev;
                    }

                    if (index === 0) {
                        return prev;
                    }

                    const result = prev.filter((item) => item.chat_room_id !== chatRoomId);

                    const item = prev[index];

                    return [item, ...result];
                });
            }, 10);
        };

        socket.on('socketMessageAllRoom', onSocketMessageAllRoom);

        return () => {
            socket.off('socketMessageAllRoom', onSocketMessageAllRoom);
        };
    }, []);

    useEffect(() => {
        if (!selectedOa || !account) return;
        dispatch(set_isLoading(true));
        getChatRoomsMongo({
            limit: limit,
            cursor: null,
            isMy: true,
            zaloOaId: selectedOa.id,
            accountId: account.id,
        })
            .then((res) => {
                const resData = res.data;
                if (resData?.isSuccess && resData.data) {
                    setChatRoomRoleSchemas(resData.data.items);
                    setCursor(resData.data.cursor);
                    setHasMore(resData.data.items.length === limit);
                }
            })
            .catch((err) => {
                console.error(err);
                dispatch(setIsShow_messageDialog(true));
                dispatch(setData_messageDialog({ type: MessageDialog_TypeEnum.ERROR, message: 'Đã có lỗi xảy ra' }));
            })
            .finally(() => {
                dispatch(set_isLoading(false));
            });
    }, [dispatch, getChatRoomsMongo, selectedOa, account]);

    const loadMore = () => {
        if (loading) return;
        if (!selectedOa || !account) return;
        if (!hasMore) return;

        setLoading(true);

        setTimeout(() => {
            getChatRoomsMongo({
                limit: 30,
                cursor: cursor,
                isMy: true,
                zaloOaId: selectedOa.id,
                accountId: account.id,
            })
                .then((res) => {
                    const resData = res.data;
                    if (resData?.isSuccess && resData.data) {
                        setChatRoomRoleSchemas((prev) => [...prev, ...(resData.data?.items || [])]);
                        setCursor(resData.data.cursor);
                        setHasMore(resData.data.cursor !== cursor);
                        setHasMore(resData.data.items.length === limit);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    dispatch(setIsShow_messageDialog(true));
                    dispatch(
                        setData_messageDialog({ type: MessageDialog_TypeEnum.ERROR, message: 'Đã có lỗi xảy ra' })
                    );
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 1000);
    };

    return (
        <View style={styles.parent}>
            <FlatList
                data={chatRoomRoleSchemas}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <OneRoom chatRoomRoleSchema={item} />
                    </TouchableOpacity>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
            />
        </View>
    );
};

export default memo(RoomList);
