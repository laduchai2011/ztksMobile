import { BASE_URL } from './baseUrl';

export const MYCUSTOMER_API = {
    GET_MY_CUSTOMERS: `${BASE_URL}/service_myCustomer/query/getMyCustomers`,
    GET_IS_NEW_MESSAGE: `${BASE_URL}/service_myCustomer/query/getAIsNewMessage`,
    GET_INFOR_CUSTOMER_ON_ZALO: `${BASE_URL}/service_myCustomer/query/getInforCustomerOnZalo`,
    Del_IS_NEW_MESSAGE: `${BASE_URL}/service_myCustomer/mutate/delIsNewMessage`,
};
