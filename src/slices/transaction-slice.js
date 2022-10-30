import { createSlice } from '@reduxjs/toolkit';

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        value: [{
            id: 0,
            date: new Date().toLocaleDateString(),
            amount: -100,
            description: 'Sams Club',
            category: {id:1, name:'Groceries', type: 1},
            type: 1,
            account: {id: 1, name: 'Checking'}
        },{
            id: 1,
            date: new Date().toLocaleDateString(),
            amount: -25,
            description: 'Sams Club',
            category: {id: 3, name: 'Gas', type: 1},
            type: 1,
            account: {id: 1, name: 'Checking'}
        },{
            id: 2,
            date: new Date().toLocaleDateString(),
            amount: -35,
            description: 'Rocky Mountain',
            category: {id: 2, name: 'Utilities', type: 1},
            type: 1,
            account: {id: 1, name: 'Checking'}
        },{
            id: 3,
            date: new Date().toLocaleDateString(),
            amount: 1500,
            description: 'Work',
            category: {id: 4, name: 'Paycheck', type: 2},
            type: 2,
            account: {id: 1, name: 'Checking'}
        }]
    },
    reducers: {
        addTransaction: (state, action) => {
            const newId = Math.max(...state.value.map(i => i.id), 0) + 1;
            action.payload.id = newId;
            state.value.push(action.payload);
        },
        removeTransaction: (state, action) => {
            state.value = state.value.filter(s => s.id !== action.payload.id);
        },
        updateTransaction: (state, action) => {
            const item = state.value.find(s => s.id === action.payload.id);
            const index = state.value.indexOf(item);
            if(index > -1) {
                state.value[index] = action.payload;
            } else {
                console.warn('UpdateTransaction: Item not found');
            }
        }
    }
});

export const { addTransaction, removeTransaction, updateTransaction } = transactionSlice.actions;

export const selectTransactions = state => state.transactions.value;

export default transactionSlice.reducer;