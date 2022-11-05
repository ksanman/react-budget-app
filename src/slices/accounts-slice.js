import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        value: [{id: 1, name: 'Checking'}]
    },
    reducers: {
        addAccount: (state, action) => {
            const newId = Math.max(Math.max(...state.value.map(v => v.id)), 0) + 1;
            state.value.push({id: newId, name: action.payload});
        },
        removeAccount: (state, action) => {
            state.value = state.value.filter(s => s.id !== action.payload.id);
        },
        updateAccount: (state, action) => {
            const item = state.value.find(s => s.id === action.payload.id);
            const index = state.value.indexOf(item);
            if(index > -1) {
                state.value[index] = action.payload;
            } else {
                console.warn('UpdateAccounts: Item not found');
            }
        }
    }
});

export const { addAccount, removeAccount, updateAccount } = accountSlice.actions;

export const selectAccounts = state => state.accounts.value;

export default accountSlice.reducer;