import { BASE_URL } from './baseUrl';

export const MESSAGE_API = {
    GET_MESSAGES: `${BASE_URL}/service_message/query/getMessages`,
    GET_MESSAGES_HAS_FILTER: `${BASE_URL}/service_message/query/getMessagesHasFilter`,
    CREATE_MESSAGE: `${BASE_URL}/service_message/mutate/createMessage`,
    UPDATE_MESSAGE_STATUS: `${BASE_URL}/service_message/mutate/updateMessageStatus`,
};
