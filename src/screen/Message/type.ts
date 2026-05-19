import { MessageDialogProps } from '@src/component/MessageDialog/type';

export interface state_props {
    isLoading: boolean;
    messageDialog: {
        isShow: boolean;
        data: MessageDialogProps;
    };
    colorPickerDialog: {
        isShow: boolean;
        color: string;
        accountId: number;
    };
}
