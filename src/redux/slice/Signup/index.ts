import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/screen/Signup/type';
import { MessageDialog_Type, MessageDialogProps } from '@src/component/MessageDialog/type';

const initialState: state_props = {
    isLoading: false,
    messageDialog: {
        isShow: false,
        data: {
            type: undefined,
            message: undefined,
        },
    },
    otpDialog: {
        isShow: false,
        token: '',
    },
};

const SignupSlice = createSlice({
    name: 'SignupSlice',
    initialState,
    reducers: {
        set_isLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setIsShow_messageDialog: (state, action: PayloadAction<boolean>) => {
            state.messageDialog.isShow = action.payload;
        },
        setData_messageDialog: (state, action: PayloadAction<MessageDialogProps>) => {
            state.messageDialog.data = action.payload;
        },
        setIsShow_otpDialog: (state, action: PayloadAction<boolean>) => {
            state.otpDialog.isShow = action.payload;
        },
        setToken_otpDialog: (state, action: PayloadAction<string>) => {
            state.otpDialog.token = action.payload;
        },
    },
});

export const {
    set_isLoading,
    setIsShow_messageDialog,
    setData_messageDialog,
    setIsShow_otpDialog,
    setToken_otpDialog,
} = SignupSlice.actions;
export default SignupSlice.reducer;
