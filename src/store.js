import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transaction-slice';
import categoryReducer from './slices/category-slice';
import accountReducer from './slices/accounts-slice';
import budgetReducer from './slices/budget-slice';
import tabReducer from './slices/tab-slice';

export default configureStore({
    reducer: {
        categories: categoryReducer,
        accounts: accountReducer,
        transactions: transactionReducer,
        budgets: budgetReducer,
        tabs: tabReducer
    }
})