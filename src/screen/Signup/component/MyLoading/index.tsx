import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux';
import Loading from '@src/component/Loading';

const MyLoading = () => {
    const isLoading = useSelector((state: RootState) => state.SignupSlice.isLoading);

    if (isLoading) {
        return <Loading />;
    }
    return;
};

export default memo(MyLoading);
