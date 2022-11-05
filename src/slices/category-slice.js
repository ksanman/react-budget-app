import { createSlice } from '@reduxjs/toolkit';

export const expense = 1, income = 2;

export const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        value: [{id:1, name:'Groceries', type: expense}, 
        {id: 2, name: 'Utilities',type: expense}, 
        {id: 3, name: 'Gas',type: expense},  
        {id: 4, name: 'Paycheck',type: income}]
    },
    reducers: {
        addCategory: (state, action) => {
            const newId = Math.max(Math.max(...state.value.map(v => v.id)), 0) + 1;
            state.value.push({id: newId, name: action.payload.name, type: action.payload.type});
        },
        removeCategory: (state, action) => {
            state.value = state.value.filter(s => s.id !== action.payload.id);
        },
        updateCategory: (state, action) => {
            const item = state.value.find(s => s.id === action.payload.id);
            const index = state.value.indexOf(item);
            if(index > -1) {
                state.value[index] = action.payload;
            } else {
                console.warn('UpdateCategory: Item not found');
            }
        }
    }
});

export const { addCategory, removeCategory, updateCategory } = categorySlice.actions;

export const selectCategories = state => state.categories.value;

export const selectExpenseCategories = state => state.categories.value.filter(c => c.type === expense);
export const selectIncomeCategories = state => state.categories.value.filter(c => c.type === income);

export default categorySlice.reducer;