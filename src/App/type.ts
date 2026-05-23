import { AccountField, AccountInformationField } from '@src/dataStruct/account';
import { ZaloAppField, ZaloOaField } from '@src/dataStruct/zalo';

export interface state_props {
    account?: AccountField;
    accountInformation?: AccountInformationField;
    // myAdmin?: number;
    zaloApp?: ZaloAppField;
    selectedOa?: ZaloOaField;
}
