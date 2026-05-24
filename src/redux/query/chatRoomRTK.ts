import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {
    ChatRoomField,
    ChatRoomRoleField,
    PagedChatRoomMongoField,
    PagedChatRoomField,
} from '@src/dataStruct/chatRoom';
import {
    GetChatRoomWithIdBodyField,
    ChatRoomRoleWithCridAaidBodyField,
    UpdateSetupChatRoomRoleBodyField,
    ChatRoomsMongoBodyField,
    ChangeChatRoomMasterBodyField,
    GetMyChatRoomsBodyField,
} from '@src/dataStruct/chatRoom/body';
import { CHAT_ROOM_API } from '@src/const/api/chatRoom';
import { MyResponse } from '@src/dataStruct/response';
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

export const chatRoomRTK = createApi({
    reducerPath: 'chatRoomRTK',
    baseQuery: baseQueryWithToken,
    tagTypes: ['ChatRoomRole', 'ChatRoom'],
    endpoints: (builder) => ({
        getMyChatRooms: builder.query<MyResponse<PagedChatRoomField>, GetMyChatRoomsBodyField>({
            query: (body) => ({
                url: CHAT_ROOM_API.GET_MY_CHAT_ROOMS,
                method: 'POST',
                body,
            }),
            keepUnusedDataFor: 0,
        }),
        getChatRoomsWithId: builder.query<MyResponse<ChatRoomField>, GetChatRoomWithIdBodyField>({
            query: (body) => ({
                url: CHAT_ROOM_API.GET_CHAT_ROOM_WITH_ID,
                method: 'POST',
                body,
            }),
        }),
        getChatRoomRoleWithCridAaid: builder.query<MyResponse<ChatRoomRoleField>, ChatRoomRoleWithCridAaidBodyField>({
            query: (body) => ({
                url: CHAT_ROOM_API.GET_CHAT_ROOM_ROLE_WITH_CRID_AAID,
                method: 'POST',
                body,
            }),
            providesTags: (result) => [{ type: 'ChatRoomRole', id: result?.data?.id }],
        }),
        getChatRoomsMongo: builder.query<MyResponse<PagedChatRoomMongoField>, ChatRoomsMongoBodyField>({
            query: (body) => ({
                url: CHAT_ROOM_API.GET_CHAT_ROOMS_MONGO,
                method: 'POST',
                body,
            }),
        }),
        updateSetupChatRoomRole: builder.mutation<MyResponse<ChatRoomRoleField>, UpdateSetupChatRoomRoleBodyField>({
            query: (body) => ({
                url: CHAT_ROOM_API.UPDATE_SETUP_CHAT_ROOM_ROLE,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result) => [{ type: 'ChatRoomRole', id: result?.data?.id }],
        }),
        changeChatRoomMaster: builder.mutation<MyResponse<ChatRoomField>, ChangeChatRoomMasterBodyField>({
            query: (body) => ({
                url: CHAT_ROOM_API.CHANGE_CHAT_ROOM_MASTER,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result) => [{ type: 'ChatRoom', id: result?.data?.id }],
        }),
    }),
});

export const {
    useLazyGetMyChatRoomsQuery,
    useLazyGetChatRoomsWithIdQuery,
    useGetChatRoomsWithIdQuery,
    useGetChatRoomRoleWithCridAaidQuery,
    useLazyGetChatRoomsMongoQuery,
    useUpdateSetupChatRoomRoleMutation,
    useChangeChatRoomMasterMutation,
} = chatRoomRTK;
