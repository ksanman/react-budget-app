import { Edit } from "@mui/icons-material";
import { Card, CardContent, CardHeader, IconButton, Stack, Tooltip } from "@mui/material";
import BudgetCategoryOverview from "./budget-category-overview";
import { selectBudgets } from '../slices/budget-slice';
import { useSelector, useDispatch } from "react-redux";
import { selectTransactionsByMonth } from '../slices/transaction-slice';
import { updateTab } from '../slices/tab-slice';
import { selectDate } from "../slices/date-slice";

export default function BudgetOverview() {
   const date = useSelector(selectDate);
   const budgets = useSelector(selectBudgets);
   const transactions = useSelector(selectTransactionsByMonth(date));
   const budget = budgets[0]; //TODO create a selector for the active budget.
   const name = budget?.name || 'Budget';
   const categories = budget.budgetCategories.map(c => {
      return {
         category: c.category.name,
         type: c.category.type,
         current: transactions.filter(t => t.category.id === c.category.id)
            .map(t => t.amount)
            .reduce((a,b) => a + Math.abs(b), 0),
         expected: c.amount
      };
   });

   const dispatch = useDispatch();

   const onEditClicked = (event) => {
      dispatch(updateTab(1));
   }


 return(
    <Card sx={{flex: 1}}>
        <CardHeader title={name} action={<Tooltip title="Edit Budget"><IconButton onClick={onEditClicked}><Edit/></IconButton></Tooltip>}>
        </CardHeader>
        <CardContent>
            <Stack 
               direction={{
                  xs: 'row',
                  sm: 'row',
                  md: 'row',
                  lg: 'row',
                  xl:'column'
               }}
               spacing={2}
            >
                {categories.map((b, i) => (
                    <BudgetCategoryOverview key={i} 
                        budgetCategory={b}
                     />
                ))}
            </Stack>
        </CardContent>
    </Card>
 )   
}