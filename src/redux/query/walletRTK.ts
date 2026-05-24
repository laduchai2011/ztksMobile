import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { MyResponse } from '@src/dataStruct/response';
import { WalletField, BalanceFluctuationField, RequireTakeMoneyField } from '@src/dataStruct/wallet';
import {
    GetMyWalletWithTypeBodyField,
    GetBalanceFluctuationsBodyField,
    PayAgentFromWalletBodyField,
    MemberGetRequireTakeMoneyOfWalletBodyField,
    CreateRequireTakeMoneyBodyField,
    EditRequireTakeMoneyBodyField,
    DeleteRequireTakeMoneyBodyField,
} from '@src/dataStruct/wallet/body';
import { WALLET_API } from '@src/const/api/wallet';
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

export const walletRTK = createApi({
    reducerPath: 'walletRTK',
    baseQuery: baseQueryWithToken,
    tagTypes: ['Wallet', 'RequireTakeMoney'],
    endpoints: (builder) => ({
        getMyWalletWithType: builder.query<MyResponse<WalletField>, GetMyWalletWithTypeBodyField>({
            query: (body) => ({
                url: WALLET_API.GET_MY_WALLET_WITH_TYPE,
                method: 'POST',
                body,
            }),
            providesTags: (result, error, arg) => [{ type: 'Wallet', id: result?.data?.id }],
        }),
        getBalanceFluctuations: builder.query<MyResponse<BalanceFluctuationField[]>, GetBalanceFluctuationsBodyField>({
            query: (body) => ({
                url: WALLET_API.GET_BALANCE_FLUCTUATIONS,
                method: 'POST',
                body,
            }),
            providesTags: (result, error, arg) => [{ type: 'Wallet', id: arg.walletId }],
        }),
        payAgentFromWallet: builder.mutation<MyResponse<WalletField>, PayAgentFromWalletBodyField>({
            query: (body) => ({
                url: WALLET_API.PAY_AGENT_FROM_WALLET,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Wallet', id: arg.walletId }],
        }),
        memberGetRequireTakeMoneyOfWallet: builder.query<
            MyResponse<RequireTakeMoneyField>,
            MemberGetRequireTakeMoneyOfWalletBodyField
        >({
            query: (body) => ({
                url: WALLET_API.MEMBER_GET_REQUIRE_TAKE_MONEY_OF_WALLET,
                method: 'POST',
                body,
            }),
            providesTags: [{ type: 'RequireTakeMoney' }],
        }),
        createRequireTakeMoney: builder.mutation<MyResponse<RequireTakeMoneyField>, CreateRequireTakeMoneyBodyField>({
            query: (body) => ({
                url: WALLET_API.CREATE_REQUIRE_TAKE_MONEY,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'RequireTakeMoney' }],
        }),
        editRequireTakeMoney: builder.mutation<MyResponse<RequireTakeMoneyField>, EditRequireTakeMoneyBodyField>({
            query: (body) => ({
                url: WALLET_API.EDIT_REQUIRE_TAKE_MONEY,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{ type: 'RequireTakeMoney' }],
        }),
        deleteRequireTakeMoney: builder.mutation<MyResponse<RequireTakeMoneyField>, DeleteRequireTakeMoneyBodyField>({
            query: (body) => ({
                url: WALLET_API.DELETE_REQUIRE_TAKE_MONEY,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{ type: 'RequireTakeMoney' }],
        }),
    }),
});

export const {
    useLazyGetMyWalletWithTypeQuery,
    useLazyGetBalanceFluctuationsQuery,
    usePayAgentFromWalletMutation,
    useLazyMemberGetRequireTakeMoneyOfWalletQuery,
    useCreateRequireTakeMoneyMutation,
    useEditRequireTakeMoneyMutation,
    useDeleteRequireTakeMoneyMutation,
} = walletRTK;
