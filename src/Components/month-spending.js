import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import MonthOverview from "./month-overview";
import { selectBudgets} from '../slices/budget-slice';
import { selectTransactions } from '../slices/transaction-slice';

export default function MonthSpending() {
    const budget = useSelector(selectBudgets)[0];
    const transactions = useSelector(selectTransactions);

    const expectedExpenses = budget.budgetCategories.filter(bc => bc.category.type === 1).map(bc => bc.amount).reduce((a,b) => a + Math.abs(b), 0);
    const currentExpenses = transactions.filter(t => t.type === 1).map(t => t.amount).reduce((a,b) => a + Math.abs(b), 0);
    const expectedIncome = budget.budgetCategories.filter(bc => bc.category.type === 2).map(bc => bc.amount).reduce((a,b) => a + Math.abs(b), 0);;
    const currentIncome =  transactions.filter(t => t.type === 2).map(t => t.amount).reduce((a,b) => a + Math.abs(b), 0);;
    const expectedSave = expectedIncome - expectedExpenses;
    const currentSaved = currentIncome - currentExpenses;
    const saveColor = currentSaved > 0 ? "primary" : "error";
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: '10px'}}>
            <MonthOverview expected={expectedExpenses} current={currentExpenses} currentLabel={"spent"} expectedLabel={"to spend"} color={"error"} />
            <MonthOverview expected={expectedIncome} current={currentIncome} currentLabel={"income"} expectedLabel={"to earn"} />
            <MonthOverview expected={expectedSave} current={currentSaved} currentLabel={"saved"} expectedLabel={"to save"} color={saveColor} />
        </Box>
    )
}