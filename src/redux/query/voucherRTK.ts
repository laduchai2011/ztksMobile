import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PagedVoucherField, VoucherField } from '@src/dataStruct/voucher';
import { GetVouchersBodyField, GetVoucherWithOrderIdBodyField } from '@src/dataStruct/voucher/body';
import { VOUCHER_API } from '@src/const/api/voucher';
import { MyResponse } from '@src/dataStruct/response';
import { DeviceEnum } from '@src/device/type';
import { getAccessToken, getRefreshToken } from '@src/token';

export const voucherRTK = createApi({
    reducerPath: 'voucherRTK',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        prepareHeaders: async (headers) => {
            const accessToken = await getAccessToken();
            const refreshToken = await getRefreshToken();
            headers.set('x-device-type', DeviceEnum.MOBILE);
            headers.set('x-access-token', accessToken || '');
            headers.set('x-refresh-token', refreshToken || '');
            return headers;
        },
    }),
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
