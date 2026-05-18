import { BASE_URL } from './baseUrl';

export const ZALO_API = {
    CREATE_ZALO_OA: `${BASE_URL}/service_zalo/mutate/createZaloOa`,
    EDIT_ZALO_OA: `${BASE_URL}/service_zalo/mutate/editZaloOa`,
    GET_ZALOAPP_WITH_ACCOUNT_ID: `${BASE_URL}/service_zalo/query/getZaloAppWithAccountId`,
    GET_ZALOOA_LIST_WITH_2FK: `${BASE_URL}/service_zalo/query/getZaloOaListWith2Fk`,
    GET_ZALOOA_WITH_ID: `${BASE_URL}/service_zalo/query/getZaloOaWithId`,
    GET_ZALOUSER: `${BASE_URL}/service_zalo/query/getZaloUserInfor`,
    GEN_ZALO_OA_TOKEN: `${BASE_URL}/service_zalo/mutate/genZaloOaToken`,
    GET_ZALO_OA_TOKEN_WITH_FK: `${BASE_URL}/service_zalo/query/getZaloOaTokenWithFk`,
    CREATE_ZALO_OA_TOKEN: `${BASE_URL}/service_zalo/mutate/createZaloOaToken`,
    UPDATE_REFRESH_TOKEN_OF_ZALO_OA: `${BASE_URL}/service_zalo/mutate/updateRefreshTokenOfZaloOa`,
    GET_ZNS_TEMPLATES: `${BASE_URL}/service_zalo/query/getZnsTemplates`,
    GET_ZNS_TEMPLATE_WITH_ID: `${BASE_URL}/service_zalo/query/getZnsTemplateWithId`,
    CREATE_ZNS_TEMPLATE: `${BASE_URL}/service_zalo/mutate/createZnsTemplate`,
    EDIT_ZNS_TEMPLATE: `${BASE_URL}/service_zalo/mutate/editZnsTemplate`,
    GET_ZNS_MESSAGES: `${BASE_URL}/service_zalo/query/getZnsMessages`,
    CREATE_ZNS_MESSAGE: `${BASE_URL}/service_zalo/mutate/createZnsMessage`,
};
