import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transaction-slice';
import categoryReducer from './slices/category-slice';
import accountReducer from './slices/accounts-slice';

export default configureStore({
    reducer: {
        categories: categoryReducer,
        accounts: accountReducer,
        transactions: transactionReducer
    }
})