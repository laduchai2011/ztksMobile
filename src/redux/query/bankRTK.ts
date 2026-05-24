import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { BankField } from '@src/dataStruct/bank';
import {
    AddBankBodyField,
    EditBankBodyField,
    DeleteBankBodyField,
    GetBankWithIdBodyField,
    GetAllBanksBodyField,
} from '@src/dataStruct/bank/body';
import { BANK_API } from '@src/const/api/bank';
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

export const bankRTK = createApi({
    reducerPath: 'bankRTK',
    baseQuery: baseQueryWithToken,
    tagTypes: ['AllBank', 'Bank'],
    endpoints: (builder) => ({
        getBankWithId: builder.query<MyResponse<BankField>, GetBankWithIdBodyField>({
            query: (body) => ({
                url: BANK_API.GET_BANK_WITH_ID,
                method: 'POST',
                body,
            }),
            providesTags: (result, error, arg) => [{ type: 'Bank', id: arg.id }],
        }),
        getAllBanks: builder.query<MyResponse<BankField[]>, GetAllBanksBodyField>({
            query: (body) => ({
                url: BANK_API.GET_ALL_BANKS,
                method: 'POST',
                body,
            }),
            providesTags: [{ type: 'AllBank' }],
        }),
        addBank: builder.mutation<MyResponse<BankField>, AddBankBodyField>({
            query: (body) => ({
                url: BANK_API.ADD_BANK,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'AllBank' }],
        }),
        editBank: builder.mutation<MyResponse<BankField>, EditBankBodyField>({
            query: (body) => ({
                url: BANK_API.EDIT_BANK,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result) => [{ type: 'Bank', id: result?.data?.id }],
        }),
        deleteBank: builder.mutation<MyResponse<BankField>, DeleteBankBodyField>({
            query: (body) => ({
                url: BANK_API.DELETE_BANK,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: [{ type: 'AllBank' }],
        }),
    }),
});

export const {
    useLazyGetAllBanksQuery,
    useLazyGetBankWithIdQuery,
    useAddBankMutation,
    useEditBankMutation,
    useDeleteBankMutation,
} = bankRTK;
