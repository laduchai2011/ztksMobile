import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/screen/Signin/type';
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
};

const SigninSlice = createSlice({
    name: 'SigninSlice',
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
    },
});

export const { set_isLoading, setIsShow_messageDialog, setData_messageDialog } = SigninSlice.actions;
export default SigninSlice.reducer;
