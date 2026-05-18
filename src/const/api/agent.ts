import { BASE_URL } from './baseUrl';

export const AGENT_API = {
    GET_AGENT_WITH_ID: `${BASE_URL}/service_agent/query/getAgentWithId`,
    GET_AGENT_WITH_AGENT_ACCOUNT_ID: `${BASE_URL}/service_agent/query/getAgentWithAgentAccountId`,
    GET_AGENTS: `${BASE_URL}/service_agent/query/getAgents`,
    CREATE_AGENT: `${BASE_URL}/service_agent/mutate/createAgent`,
    AGENT_ADD_ACCOUNT: `${BASE_URL}/service_agent/mutate/agentAddAccount`,
    AGENT_DEL_ACCOUNT: `${BASE_URL}/service_agent/mutate/agentDelAccount`,
    GET_LAST_AGENT_PAY: `${BASE_URL}/service_agent/query/getLastAgentPay`,
    CREATE_AGENT_PAY: `${BASE_URL}/service_agent/mutate/createAgentPay`,
};
