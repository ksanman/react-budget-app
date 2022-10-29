import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        value: [{id:1, name:'Groceries'}, {id: 2, name: 'Utilities'}, {id: 3, name: 'Gas'},  {id: 4, name: 'Paycheck'}]
    },
    reducers: {
        addCategory: (state, action) => {
            const newId = Math.max(Math.max(...state.value.map(v => v.id)), 0) + 1;
            state.value.push({id: newId, name: action.payload});
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

export default categorySlice.reducer;