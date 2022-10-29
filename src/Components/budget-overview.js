import { Edit } from "@mui/icons-material";
import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import BudgetCategoryOverview from "./budget-category-overview";
import { selectBudgets } from '../slices/budget-slice';
import { useSelector } from "react-redux";
import { selectTransactions } from '../slices/transaction-slice';

export default function BudgetOverview() {
   const budgets = useSelector(selectBudgets);
   const transactions = useSelector(selectTransactions);
   const budget = budgets[0]; //TODO create a selector for the active budget.
   const name = budget?.name || 'Budget';
   const categories = budget.budgetCategories.map(c => {
      return {
         category: c.category.name,
         current: transactions.filter(t => t.category.id === c.category.id)
            .map(t => t.amount)
            .reduce((a,b) => a + Math.abs(b), 0),
         expected: c.amount
      };
   });
 return(
    <Card sx={{flex: 1}}>
        <CardHeader title={name} action={<Tooltip title="Edit Budget"><IconButton><Edit/></IconButton></Tooltip>}>
        </CardHeader>
        <CardContent>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {categories.map((b, i) => (
                    <BudgetCategoryOverview key={i} 
                        category={b.category} 
                        current={b.current}
                        expected={b.expected} />
                ))}
            </div>
        </CardContent>
    </Card>
 )   
}