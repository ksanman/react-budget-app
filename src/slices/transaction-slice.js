import { createSlice } from '@reduxjs/toolkit';

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        value: [{
            id: 0,
            date: new Date().toDateString(),
            amount: -100,
            description: 'Sams Club',
            category: 'Groceries',
            type: 'Expense',
            account: 'Checking'
        },{
            id: 1,
            date: new Date().toDateString(),
            amount: -25,
            description: 'Sams Club',
            category: 'Gas',
            type: 'Expense',
            account: 'Checking'
        },{
            id: 2,
            date: new Date().toDateString(),
            amount: -35,
            description: 'Rocky Mountain',
            category: 'Utilities',
            type: 'Expense',
            account: 'Checking'
        },{
            id: 3,
            date: new Date().toDateString(),
            amount: 1500,
            description: 'Work',
            category: 'Paycheck',
            type: 'Income',
            account: 'Checking'
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