import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { PagedVoucherField, VoucherField } from '@src/dataStruct/voucher';
import { GetVouchersBodyField, GetVoucherWithOrderIdBodyField } from '@src/dataStruct/voucher/body';
import { VOUCHER_API } from '@src/const/api/voucher';
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

export const voucherRTK = createApi({
    reducerPath: 'voucherRTK',
    baseQuery: baseQueryWithToken,
    tagTypes: ['Voucer'],
    endpoints: (builder) => ({
        getVouchers: builder.query<MyResponse<PagedVoucherField>, GetVouchersBodyField>({
            query: (body) => ({
                url: VOUCHER_API.GET_VOUCHERS,
                method: 'POST',
                body,
            }),
        }),
        getVoucherWithOrderId: builder.query<MyResponse<VoucherField>, GetVoucherWithOrderIdBodyField>({
            query: (body) => ({
                url: VOUCHER_API.GET_VOUCHER_WITH_ORDER_ID,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLazyGetVouchersQuery, useLazyGetVoucherWithOrderIdQuery } = voucherRTK;
