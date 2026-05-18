import { BASE_URL } from './baseUrl';

export const CHAT_ROOM_API = {
    GET_MY_CHAT_ROOMS: `${BASE_URL}/service_chatRoom/query/getMyChatRooms`,
    GET_CHAT_ROOM_WITH_ID: `${BASE_URL}/service_chatRoom/query/getChatRoomWithId`,
    GET_CHAT_ROOM_ROLE_WITH_CRID_AAID: `${BASE_URL}/service_chatRoom/query/getChatRoomRoleWithCridAaid`,
    UPDATE_SETUP_CHAT_ROOM_ROLE: `${BASE_URL}/service_chatRoom/mutate/updateSetupChatRoomRole`,
    CREATE_CHAT_ROOM_ROLE: `${BASE_URL}/service_chatRoom/mutate/createChatRoomRole`,
    GET_CHAT_ROOMS_MONGO: `${BASE_URL}/service_chatRoom/query/getChatRoomsMongo`,
    CHANGE_CHAT_ROOM_MASTER: `${BASE_URL}/service_chatRoom/mutate/changeChatRoomMaster`,
};
