import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { PagedMessageV1Field, MessageV1Field, NewMessageV1Field } from '@src/dataStruct/message_v1';
import { MessageV1BodyField, CreateMessageV1BodyField, VideoMessageBodyField } from '@src/dataStruct/message_v1/body';
import { ZaloMessageType } from '@src/dataStruct/zalo/hookData';
import { MESSAGEV1_API } from '@src/const/api/messageV1';
import { MyResponse } from '@src/dataStruct/response';
import { ResultSendToZaloField } from '@src/dataStruct/zalo/hookData';
import { DeviceEnum } from '@src/device/type';
import { setRefreshToken, setAccessToken, getAccessToken, getRefreshToken } from '@src/token';
import { setAccountId, getAccountId } from '@src/utility/checkSignin';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: async (headers) => {
        const accessToken = await getAccessToken();
        const refreshToken = await getRefreshToken();
        const accountId = await getAccountId();

        headers.set('x-device-type', DeviceEnum.MOBILE);
        headers.set('x-access-token', accessToken || '');
        headers.set('x-refresh-token', refreshToken || '');
        headers.set('x-account-id', accountId || '');

        return headers;
    },
});

export const baseQueryWithToken: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    const headers = (result.meta as { response?: Response })?.response?.headers;

    const isRefresh = headers?.get('x-isRefresh');
    const accessToken = headers?.get('x-access-token');
    const refreshToken = headers?.get('x-refresh-token');
    const accountId = headers?.get('x-account-id');

    if (isRefresh === '1') {
        if (accessToken) {
            await setAccessToken(accessToken);
        }

        if (refreshToken) {
            await setRefreshToken(refreshToken);
        }

        if (accountId) {
            await setAccountId(accountId);
        }
    }
    return result;
};

export const messageV1RTK = createApi({
    reducerPath: 'messageV1RTK',
    baseQuery: baseQueryWithToken,
    tagTypes: ['AllNewMessages'],
    endpoints: (builder) => ({
        getMessagesForChatScreen: builder.query<MyResponse<PagedMessageV1Field<ZaloMessageType>>, MessageV1BodyField>({
            query: (body) => ({
                url: MESSAGEV1_API.GET_MESSAGES_FOR_CHAT_SCREEN,
                method: 'POST',
                body,
            }),
        }),
        getLastMessage: builder.query<MyResponse<MessageV1Field<ZaloMessageType>>, { chatRoomId: string }>({
            query: ({ chatRoomId }) => `${MESSAGEV1_API.GET_LAST_MESSAGE}?chatRoomId=${chatRoomId}`,
            keepUnusedDataFor: 0,
        }),
        getMessageWithId: builder.query<MyResponse<MessageV1Field<ZaloMessageType>>, { id: string }>({
            query: ({ id }) => `${MESSAGEV1_API.GET_MESSAGE_WITH_ID}?id=${id}`,
        }),
        getMessageWithMsgId: builder.query<
            MyResponse<MessageV1Field<ZaloMessageType>>,
            { chat_room_id: number; msg_id: string }
        >({
            query: ({ chat_room_id, msg_id }) =>
                `${MESSAGEV1_API.GET_MESSAGE_WITH_MSG_ID}?chat_room_id=${chat_room_id}&msg_id=${msg_id}`,
        }),
        getAllNewMessages: builder.query<MyResponse<NewMessageV1Field<ZaloMessageType>[]>, { chatRoomId: string }>({
            query: ({ chatRoomId }) => `${MESSAGEV1_API.GET_ALL_NEW_MESSAGE}?chatRoomId=${chatRoomId}`,
            keepUnusedDataFor: 0,
        }),
        createMessageV1: builder.mutation<MyResponse<ResultSendToZaloField>, CreateMessageV1BodyField>({
            query: (body) => ({
                url: MESSAGEV1_API.CREATE_MESSAGEV1,
                method: 'POST',
                body,
            }),
        }),
        delAllNewMessages: builder.query<MyResponse<any>, { chatRoomId: string }>({
            query: ({ chatRoomId }) => `${MESSAGEV1_API.DEL_ALL_NEW_MESSAGE}?chatRoomId=${chatRoomId}`,
            keepUnusedDataFor: 0,
        }),
        videoMessage: builder.mutation<MyResponse<any>, VideoMessageBodyField>({
            query: (body) => ({
                url: MESSAGEV1_API.VIDEO_MESSAGE,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useLazyGetMessagesForChatScreenQuery,
    useGetLastMessageQuery,
    useLazyGetLastMessageQuery,
    useLazyGetMessageWithIdQuery,
    useLazyGetMessageWithMsgIdQuery,
    useLazyGetAllNewMessagesQuery,
    useCreateMessageV1Mutation,
    useLazyDelAllNewMessagesQuery,
    useVideoMessageMutation,
} = messageV1RTK;
