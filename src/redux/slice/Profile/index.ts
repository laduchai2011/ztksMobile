import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { state_props } from '@src/screen/Profile/type';

const initialState: state_props = {
    isLoading: false,
};

const ProfileSlice = createSlice({
    name: 'ProfileSlice',
    initialState,
    reducers: {
        set_isLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { set_isLoading } = ProfileSlice.actions;
export default ProfileSlice.reducer;
