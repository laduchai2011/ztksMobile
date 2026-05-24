import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { PagedRegisterPostField, PagedPostField, PostField, RegisterPostField } from '@src/dataStruct/post';
import {
    GetRegisterPostsBodyField,
    GetPostsBodyField,
    // GetPostWithIdBodyField,
    CreateRegisterPostBodyField,
    EditRegisterPostBodyField,
    DeleteRegisterPostBodyField,
    CreatePostBodyField,
    EditPostBodyField,
} from '@src/dataStruct/post/body';
import { POST_API } from '@src/const/api/post';
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

export const postRTK = createApi({
    reducerPath: 'postRTK',
    baseQuery: baseQueryWithToken,
    tagTypes: [],
    endpoints: (builder) => ({
        getRegisterPosts: builder.query<MyResponse<PagedRegisterPostField>, GetRegisterPostsBodyField>({
            query: (body) => ({
                url: POST_API.GET_REGISTER_POSTS,
                method: 'POST',
                body,
            }),
        }),
        getPosts: builder.query<MyResponse<PagedPostField>, GetPostsBodyField>({
            query: (body) => ({
                url: POST_API.GET_POSTS,
                method: 'POST',
                body,
            }),
        }),
        // getPostWithId: builder.query<MyResponse<PostField>, GetPostWithIdBodyField>({
        //     query: (body) => ({
        //         url: POST_API.GET_POST_WITH_ID,
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        createRegisterPost: builder.mutation<MyResponse<RegisterPostField>, CreateRegisterPostBodyField>({
            query: (body) => ({
                url: POST_API.CREATE_REGISTER_POST,
                method: 'POST',
                body,
            }),
        }),
        editRegisterPost: builder.mutation<MyResponse<RegisterPostField>, EditRegisterPostBodyField>({
            query: (body) => ({
                url: POST_API.EDIT_REGISTER_POST,
                method: 'POST',
                body,
            }),
        }),
        deleteRegisterPost: builder.mutation<MyResponse<RegisterPostField>, DeleteRegisterPostBodyField>({
            query: (body) => ({
                url: POST_API.DELETE_REGISTER_POST,
                method: 'POST',
                body,
            }),
        }),
        createPost: builder.mutation<MyResponse<PostField>, CreatePostBodyField>({
            query: (body) => ({
                url: POST_API.CREATE_POST,
                method: 'POST',
                body,
            }),
        }),
        editPost: builder.mutation<MyResponse<PostField>, EditPostBodyField>({
            query: (body) => ({
                url: POST_API.EDIT_POST,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useLazyGetRegisterPostsQuery,
    useLazyGetPostsQuery,
    // useLazyGetPostWithIdQuery,
    useCreateRegisterPostMutation,
    useEditRegisterPostMutation,
    useDeleteRegisterPostMutation,
    useCreatePostMutation,
    useEditPostMutation,
} = postRTK;
