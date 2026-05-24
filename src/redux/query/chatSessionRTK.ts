import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { ChatSessionField, PagedChatSessionField } from '@src/dataStruct/chatSession';
import {
    ChatSessionWithAccountIdBodyField,
    ChatSessionBodyField,
    UpdateSelectedAccountIdOfChatSessionBodyField,
    UpdateIsReadyOfChatSessionBodyField,
    LeaveAllChatSessionBodyField,
} from '@src/dataStruct/chatSession/body';
import { CHAT_SESSION_API } from '@src/const/api/chatSession';
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

export const chatSessionRTK = createApi({
    reducerPath: 'chatSessionRTK',
    baseQuery: baseQueryWithToken,
    tagTypes: ['ChatSession'],
    endpoints: (builder) => ({
        getChatSessionsWithAccountId: builder.query<
            MyResponse<PagedChatSessionField>,
            ChatSessionWithAccountIdBodyField
        >({
            query: (body) => ({
                url: CHAT_SESSION_API.GET_CHAT_SESSION_WITH_ACCOUNT_ID,
                method: 'POST',
                body,
            }),
            // providesTags: (result) =>
            //     result?.data?.items
            //         ? [
            //               ...result.data.items.map((item) => ({
            //                   type: 'ChatSession' as const,
            //                   id: item.id,
            //               })),
            //               { type: 'ChatSession', id: 'LIST' },
            //           ]
            //         : [{ type: 'ChatSession', id: 'LIST' }],
        }),
        createChatSession: builder.mutation<MyResponse<ChatSessionField>, ChatSessionBodyField>({
            query: (body) => ({
                url: CHAT_SESSION_API.CREATE_CHAT_SESSION,
                method: 'POST',
                body,
            }),
            // invalidatesTags: [{ type: 'ChatSessionList', id: 'LIST' }],
            // invalidatesTags: [{ type: 'ChatSession', id: 'LIST' }],
        }),
        updateSelectedAccountIdOfChatSession: builder.mutation<
            MyResponse<ChatSessionField>,
            UpdateSelectedAccountIdOfChatSessionBodyField
        >({
            query: (body) => ({
                url: CHAT_SESSION_API.UPDATE_SELECTED_ACCOUNT_ID,
                method: 'PATCH',
                body,
            }),
            // invalidatesTags: (result) => [{ type: 'ChatSession', id: result?.data?.id }],
        }),
        updateIsReayOfChatSession: builder.mutation<MyResponse<ChatSessionField>, UpdateIsReadyOfChatSessionBodyField>({
            query: (body) => ({
                url: CHAT_SESSION_API.UPDATE_ISREADY_ID,
                method: 'PATCH',
                body,
            }),
            // invalidatesTags: (result) => [{ type: 'ChatSession', id: result?.data?.id }],
        }),
        leaveAllChatSession: builder.mutation<MyResponse<boolean>, LeaveAllChatSessionBodyField>({
            query: (body) => ({
                url: CHAT_SESSION_API.LEAVE_ALL_CHAT_SESSION,
                method: 'PATCH',
                body,
            }),
        }),
    }),
});

export const {
    useCreateChatSessionMutation,
    useLazyGetChatSessionsWithAccountIdQuery,
    useUpdateSelectedAccountIdOfChatSessionMutation,
    useUpdateIsReayOfChatSessionMutation,
    useLeaveAllChatSessionMutation,
} = chatSessionRTK;
