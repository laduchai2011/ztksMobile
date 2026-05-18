import { BASE_URL } from './baseUrl';

export const BANK_API = {
    GET_ALL_BANKS: `${BASE_URL}/service_bank/query/getAllBanks`,
    GET_BANK_WITH_ID: `${BASE_URL}/service_bank/query/getBankWithId`,
    ADD_BANK: `${BASE_URL}/service_bank/mutate/addBank`,
    EDIT_BANK: `${BASE_URL}/service_bank/mutate/editBank`,
    DELETE_BANK: `${BASE_URL}/service_bank/mutate/deleteBank`,
};
