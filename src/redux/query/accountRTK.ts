import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import {
    AccountField,
    AccountInformationField,
    AddMemberBodyField,
    AllMembersBodyField,
    PagedAccountField,
    AccountReceiveMessageField,
    RecommendField,
} from '@src/dataStruct/account';
import {
    GetReplyAccountBodyField,
    GetNotReplyAccountBodyField,
    CreateReplyAccountBodyField,
    GetAccountReceiveMessageBodyField,
    CreateAccountReceiveMessageBodyField,
    UpdateAccountReceiveMessageBodyField,
    GetMembersBodyField,
    AddMemberV1BodyField,
    ForgetPasswordBodyField,
    CheckForgetPasswordBodyField,
    GetMyRecommendBodyField,
    AddYourRecommendBodyField,
    LeaveAllAccountReceiveMessageBodyField,
    LeaveAdminBodyField,
} from '@src/dataStruct/account/body';
import { ACCOUNT_API } from '@src/const/api/account';
// import { router_res_type } from '@src/interface';
import { MyResponse } from '@src/dataStruct/response';
import { DeviceEnum } from '@src/device/type';
import { setRefreshToken, setAccessToken, setSocketToken, getAccessToken, getRefreshToken } from '@src/token';
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

export const accountRTK = createApi({
    reducerPath: 'accountRTK',
    baseQuery: baseQueryWithToken,
    tagTypes: [
        'Account',
        'MemberV1',
        'MemberList',
        'MemberReceiveMessage',
        'ReplyAccounts',
        'NotReplyAccounts',
        'AccountReceiveMessage',
        'Recommend',
    ],
    endpoints: (builder) => ({
        getAccountWithId: builder.query<MyResponse<AccountField>, { id: number }>({
            query: ({ id }) => `${ACCOUNT_API.GET_ACCOUNT_WITH_ID}?id=${id}`,
        }),
        getAllMembers: builder.query<MyResponse<AccountField[]>, AllMembersBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.GET_ALL_MEMBERS,
                method: 'POST',
                body,
            }),
            providesTags: ['MemberList'],
        }),
        getReplyAccounts: builder.query<MyResponse<PagedAccountField>, GetReplyAccountBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.GET_REPLY_ACCOUNt,
                method: 'POST',
                body,
            }),
            providesTags: (result, error, arg) => [{ type: 'ReplyAccounts', id: `LIST-${arg.chatRoomId}` }],
        }),
        getNotReplyAccounts: builder.query<MyResponse<PagedAccountField>, GetNotReplyAccountBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.GET_NOT_REPLY_ACCOUNT,
                method: 'POST',
                body,
            }),
            providesTags: (result, error, arg) => [{ type: 'NotReplyAccounts', id: `LIST-${arg.chatRoomId}` }],
        }),
        getAccountReceiveMessage: builder.query<
            MyResponse<AccountReceiveMessageField>,
            GetAccountReceiveMessageBodyField
        >({
            query: (body) => ({
                url: ACCOUNT_API.GET_ACCOUNT_RECEIVE_MESSAGE,
                method: 'POST',
                body,
            }),
            providesTags: ['AccountReceiveMessage'],
        }),
        getMembers: builder.query<MyResponse<PagedAccountField>, GetMembersBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.GET_MEMBERS,
                method: 'POST',
                body,
            }),
            providesTags: ['MemberV1'],
        }),
        checkForgetPassword: builder.query<MyResponse<AccountField>, CheckForgetPasswordBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.CHECK_FORGET_PASSWORD,
                method: 'POST',
                body: body,
            }),
        }),
        getMyRecommend: builder.query<MyResponse<RecommendField>, GetMyRecommendBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.GET_MY_RECOMMEND,
                method: 'POST',
                body,
            }),
            providesTags: ['Recommend'],
        }),
        // Mutation (POST)
        signup: builder.mutation<MyResponse<AccountField>, { body: AccountField; token: string }>({
            query: ({ body, token }) => ({
                url: ACCOUNT_API.SIGNUP,
                method: 'POST',
                body,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Account'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        forgetPassword: builder.mutation<MyResponse<AccountField>, { body: ForgetPasswordBodyField; token: string }>({
            query: ({ body, token }) => ({
                url: ACCOUNT_API.FORGET_PASSWORD,
                method: 'POST',
                body,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Account'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        signin: builder.mutation<MyResponse<AccountField>, AccountField>({
            query: (body) => ({
                url: ACCOUNT_API.SIGNIN,
                method: 'POST',
                body,
            }),

            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { meta } = await queryFulfilled;

                    const headers = (meta as { response?: Response })?.response?.headers;

                    const accessToken = headers?.get('x-access-token');
                    const refreshToken = headers?.get('x-refresh-token');
                    const socketToken = headers?.get('x-socket-token');
                    const accountId = headers?.get('x-account-id');

                    if (accessToken) {
                        await setAccessToken(accessToken);
                    }

                    if (refreshToken) {
                        await setRefreshToken(refreshToken);
                    }

                    if (socketToken) {
                        await setSocketToken(socketToken);
                    }

                    if (accountId) {
                        await setAccountId(accountId);
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            invalidatesTags: ['Account'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        signout: builder.mutation<MyResponse<unknown>, void>({
            query: () => ({
                url: ACCOUNT_API.SIGNOUT,
                method: 'POST',
            }),
            invalidatesTags: ['Account'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        addMember: builder.mutation<MyResponse<AccountField>, AddMemberBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.ADD_MEMBER,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['MemberList'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        createReplyAccount: builder.mutation<MyResponse<AccountField>, CreateReplyAccountBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.CREATE_REPLY_ACCOUNT,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'NotReplyAccounts', id: `LIST-${arg.chatRoomId}` },
                { type: 'ReplyAccounts', id: `LIST-${arg.chatRoomId}` },
            ],
        }),
        createAccountReceiveMessage: builder.mutation<
            MyResponse<AccountReceiveMessageField>,
            CreateAccountReceiveMessageBodyField
        >({
            query: (body) => ({
                url: ACCOUNT_API.CREATE_ACCOUNT_RECEIVE_MESSAGE,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['AccountReceiveMessage'],
        }),
        updateAccountReceiveMessage: builder.mutation<
            MyResponse<AccountReceiveMessageField>,
            UpdateAccountReceiveMessageBodyField
        >({
            query: (body) => ({
                url: ACCOUNT_API.UPDATE_ACCOUNT_RECEIVE_MESSAGE,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['AccountReceiveMessage'],
        }),
        addMemberV1: builder.mutation<MyResponse<AccountInformationField>, AddMemberV1BodyField>({
            query: (body) => ({
                url: ACCOUNT_API.ADD_MEMBERV1,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['MemberV1'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        addYourRecommend: builder.mutation<MyResponse<RecommendField>, AddYourRecommendBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.ADD_YOUR_RECOMMEND,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Recommend'], // dùng nếu muốn refetch danh sách sau khi thêm
        }),
        leaveAllAccountReceiveMessage: builder.mutation<MyResponse<boolean>, LeaveAllAccountReceiveMessageBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.LEAVE_ALL_ACCOUNT_RECEIVE_MESSAGE,
                method: 'PATCH',
                body,
            }),
        }),
        leaveAdmin: builder.mutation<MyResponse<boolean>, LeaveAdminBodyField>({
            query: (body) => ({
                url: ACCOUNT_API.LEAVE_ADMIN,
                method: 'PATCH',
                body,
            }),
        }),
    }),
});

export const {
    useGetAccountWithIdQuery,
    useLazyGetAccountWithIdQuery,
    useGetAllMembersQuery,
    useGetReplyAccountsQuery,
    useGetNotReplyAccountsQuery,
    useLazyGetMembersQuery,
    useLazyCheckForgetPasswordQuery,
    useLazyGetMyRecommendQuery,
    useSignupMutation,
    useSigninMutation,
    useSignoutMutation,
    useForgetPasswordMutation,
    useAddMemberMutation,
    useCreateReplyAccountMutation,
    useGetAccountReceiveMessageQuery,
    useCreateAccountReceiveMessageMutation,
    useUpdateAccountReceiveMessageMutation,
    useAddMemberV1Mutation,
    useAddYourRecommendMutation,
    useLeaveAllAccountReceiveMessageMutation,
    useLeaveAdminMutation,
} = accountRTK;
