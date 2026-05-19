import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/screen/Message/type';
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
    colorPickerDialog: {
        isShow: false,
        color: '#ffffff',
        accountId: -1,
    },
};

const MessageSlice = createSlice({
    name: 'MessageSlice',
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
        setIsShow_colorPickerDialog: (state, action: PayloadAction<boolean>) => {
            state.colorPickerDialog.isShow = action.payload;
        },
        setColor_colorPickerDialog: (state, action: PayloadAction<string>) => {
            state.colorPickerDialog.color = action.payload;
        },
        setAccountId_colorPickerDialog: (state, action: PayloadAction<number>) => {
            state.colorPickerDialog.accountId = action.payload;
        },
    },
});

export const {
    set_isLoading,
    setIsShow_messageDialog,
    setData_messageDialog,
    setIsShow_colorPickerDialog,
    setColor_colorPickerDialog,
    setAccountId_colorPickerDialog,
} = MessageSlice.actions;
export default MessageSlice.reducer;
