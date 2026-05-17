import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux';
import MessageDialog from '@src/component/MessageDialog';
import { MessageDialogProps } from '@src/component/MessageDialog/type';
import { setIsShow_messageDialog } from '@src/redux/slice/Signup';

const MyMessageDialog = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isShow: boolean = useSelector((state: RootState) => state.SignupSlice.messageDialog.isShow);
    const data: MessageDialogProps = useSelector((state: RootState) => state.SignupSlice.messageDialog.data);

    const handleClose = () => {
        dispatch(setIsShow_messageDialog(false));
    };

    return <MessageDialog data={data} isShow={isShow} onClose={() => handleClose()} />;
};

export default memo(MyMessageDialog);
