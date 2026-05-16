export interface MessageDialogProps {
    type?: MessageDialog_Type;
    message?: string;
}

export enum MessageDialog_TypeEnum {
    NORMAL = 'NORMAL',
    SUCCESS = 'SUCCESS',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

export type MessageDialog_Type =
    | typeof MessageDialog_TypeEnum.NORMAL
    | typeof MessageDialog_TypeEnum.SUCCESS
    | typeof MessageDialog_TypeEnum.WARN
    | typeof MessageDialog_TypeEnum.ERROR;
