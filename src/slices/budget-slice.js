import { createSlice } from '@reduxjs/toolkit';

export const budgetSlice = createSlice({
    name: 'budgets',
    initialState: {
        value: [{
            id: 1,
            name: 'Test Budget',
            budgetCategories: [{
                category: {
                    id: 1,
                    name: 'Groceries'
                },
                amount: 200
            }]
        }]
    },
    reducers: {
        addBudget: (state, action) => {
            const newId = Math.max(Math.max(...state.value.map(v => v.id)), 0) + 1;
            const budget = {
                id: newId,
                name: action.payload.name,
                budgetCategories: action.payload.budgetCategories
            };
            state.value.push(budget);
        },
        removeBudget: (state, action) => {
            state.value = state.value.filter(s => s.id !== action.payload.id);
        },
        updateBudget: (state, action) => {
            const item = state.value.find(s => s.id === action.payload.id);
            const index = state.value.indexOf(item);
            if(index > -1) {
                state.value[index] = action.payload;
            } else {
                console.warn('UpdateBudgets: Item not found');
            }
        }
    }
});

export const { addBudget, removeBudget, updateBudget } = budgetSlice.actions;

export const selectBudgets= state => state.budgets.value;

export default budgetSlice.reducer;