import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { AgentField, PagedAgentField, AgentPayField } from '@src/dataStruct/agent';
import {
    CreateAgentBodyField,
    AgentAddAccountBodyField,
    AgentDelAccountBodyField,
    GetAgentsBodyField,
    GetLastAgentPayBodyField,
    CreateAgentPayBodyField,
    GetAgentWithAgentAccountIdBodyField,
} from '@src/dataStruct/agent/body';
import { AGENT_API } from '@src/const/api/agent';
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

export const agentRTK = createApi({
    reducerPath: 'agentRTK',
    baseQuery: baseQueryWithToken,
    tagTypes: ['Agent', 'Agents', 'AgentPay'],
    endpoints: (builder) => ({
        getAgentWithId: builder.query<MyResponse<AgentField>, { id: number }>({
            query: ({ id }) => `${AGENT_API.GET_AGENT_WITH_ID}?id=${id}`,
            providesTags: (result, error, arg) => [{ type: 'Agent', id: arg.id }],
        }),
        getAgentWithAgentAccountId: builder.query<MyResponse<AgentField>, GetAgentWithAgentAccountIdBodyField>({
            query: (body) => ({
                url: AGENT_API.GET_AGENT_WITH_AGENT_ACCOUNT_ID,
                method: 'POST',
                body,
            }),
        }),
        getAgents: builder.query<MyResponse<PagedAgentField>, GetAgentsBodyField>({
            query: (body) => ({
                url: AGENT_API.GET_AGENTS,
                method: 'POST',
                body,
            }),
            providesTags: ['Agents'],
        }),
        getLastAgentPay: builder.query<MyResponse<AgentPayField>, GetLastAgentPayBodyField>({
            query: (body) => ({
                url: AGENT_API.GET_LAST_AGENT_PAY,
                method: 'POST',
                body,
            }),
            providesTags: (result, error, arg) => [{ type: 'AgentPay', id: arg.agentId }],
        }),
        createAgent: builder.mutation<MyResponse<AgentField>, CreateAgentBodyField>({
            query: (body) => ({
                url: AGENT_API.CREATE_AGENT,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Agents'],
        }),
        agentAddAccount: builder.mutation<MyResponse<AgentField>, AgentAddAccountBodyField>({
            query: (body) => ({
                url: AGENT_API.AGENT_ADD_ACCOUNT,
                method: 'PATCH',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
                // Lấy tất cả query getOrders đang cache
                const patchResults: any[] = [];

                const state = getState() as any;

                const queries = agentRTK.util.selectInvalidatedBy(state, [{ type: 'Agents' }]);

                for (const query of queries) {
                    if (query.endpointName !== 'getAgents') continue;

                    const patchResult = dispatch(
                        agentRTK.util.updateQueryData('getAgents', query.originalArgs, (draft) => {
                            if (!draft.data?.items) return;

                            const agent = draft.data.items.find((a) => a.id === arg.id);

                            if (agent) {
                                Object.assign(agent, arg);
                            }
                        })
                    );

                    patchResults.push(patchResult);
                }

                try {
                    await queryFulfilled;
                } catch {
                    patchResults.forEach((p) => p.undo());
                }
            },
        }),
        agentDelAccount: builder.mutation<MyResponse<AgentField>, AgentDelAccountBodyField>({
            query: (body) => ({
                url: AGENT_API.AGENT_DEL_ACCOUNT,
                method: 'PATCH',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
                // Lấy tất cả query getOrders đang cache
                const patchResults: any[] = [];

                const state = getState() as any;

                const queries = agentRTK.util.selectInvalidatedBy(state, [{ type: 'Agents' }]);

                for (const query of queries) {
                    if (query.endpointName !== 'getAgents') continue;

                    const patchResult = dispatch(
                        agentRTK.util.updateQueryData('getAgents', query.originalArgs, (draft) => {
                            if (!draft.data?.items) return;

                            const agent = draft.data.items.find((a) => a.id === arg.id);

                            if (agent) {
                                Object.assign(agent, arg);
                            }
                        })
                    );

                    patchResults.push(patchResult);
                }

                try {
                    await queryFulfilled;
                } catch {
                    patchResults.forEach((p) => p.undo());
                }
            },
        }),
        createAgentPay: builder.mutation<MyResponse<AgentPayField>, CreateAgentPayBodyField>({
            query: (body) => ({
                url: AGENT_API.CREATE_AGENT_PAY,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'AgentPay', id: arg.agentId }],
        }),
    }),
});

export const {
    useLazyGetAgentWithIdQuery,
    useLazyGetAgentWithAgentAccountIdQuery,
    useLazyGetAgentsQuery,
    useLazyGetLastAgentPayQuery,
    useCreateAgentMutation,
    useAgentAddAccountMutation,
    useAgentDelAccountMutation,
    useCreateAgentPayMutation,
} = agentRTK;
