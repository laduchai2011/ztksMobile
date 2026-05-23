import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/App/type';
import { AccountField, AccountInformationField } from '@src/dataStruct/account';
import { ZaloAppField, ZaloOaField } from '@src/dataStruct/zalo';

const initialState: state_props = {
    account: undefined,
    accountInformation: undefined,
    // myAdmin: undefined,
    zaloApp: undefined,
    selectedOa: undefined,
};

const AppSlice = createSlice({
    name: 'AppSlice',
    initialState,
    reducers: {
        set_account: (state, action: PayloadAction<AccountField>) => {
            state.account = action.payload;
        },
        set_accountInformation: (state, action: PayloadAction<AccountInformationField>) => {
            state.accountInformation = action.payload;
        },
        // set_myAdmin: (state, action: PayloadAction<number>) => {
        //     state.myAdmin = action.payload;
        // },
        set_zaloApp: (state, action: PayloadAction<ZaloAppField>) => {
            state.zaloApp = action.payload;
        },
        set_selectedOa: (state, action: PayloadAction<ZaloOaField>) => {
            state.selectedOa = action.payload;
        },
    },
});

export const { set_account, set_accountInformation, set_zaloApp, set_selectedOa } = AppSlice.actions;
export default AppSlice.reducer;
