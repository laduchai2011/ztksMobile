import React, { memo, useState } from 'react';
import MessageDialog from '@src/component/MessageDialog';
import { MessageDialog_TypeEnum } from '@src/component/MessageDialog/type';

const MyMessageDialog = () => {
    const [isShow, setIsShow] = useState<boolean>(true);

    const handleClose = () => {
        setIsShow(false);
    };

    return (
        <MessageDialog
            data={{ type: MessageDialog_TypeEnum.SUCCESS, message: 'HELLO' }}
            isShow={isShow}
            onClose={() => handleClose()}
        />
    );
};

export default memo(MyMessageDialog);
