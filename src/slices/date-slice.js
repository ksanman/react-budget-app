import { createSlice } from '@reduxjs/toolkit';


const currentDate = new Date();
const currentMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);


export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        value: currentMonthDate.toISOString()
    },
    reducers: {
        updateDate: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { updateDate} = dateSlice.actions;

export const selectDate = state => new Date(state.date.value);

export default dateSlice.reducer;