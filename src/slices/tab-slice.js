import { createSlice } from '@reduxjs/toolkit';

export const tabSlice = createSlice({
    name: 'tabs',
    initialState: {
        value: 0
    },
    reducers: {
        updateTab: (state, action) => {
            state.value = parseInt(action.payload);
        }
    }
});

export const { updateTab } = tabSlice.actions;

export const selectTab = state => state.tabs.value;

export default tabSlice.reducer;