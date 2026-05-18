import { BASE_URL } from './baseUrl';

export const NOTE_API = {
    GET_NOTES: `${BASE_URL}/service_note/query/getNotes`,
    CREATE_NOTE: `${BASE_URL}/service_note/mutate/createNote`,
    UPDATE_NOTE: `${BASE_URL}/service_note/mutate/updateNote`,
    DELETE_NOTE: `${BASE_URL}/service_note/mutate/deleteNote`,
};
