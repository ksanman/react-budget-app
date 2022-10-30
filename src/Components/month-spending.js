import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import MonthOverview from "./month-overview";
import { selectBudgets} from '../slices/budget-slice';
import { selectTransactions } from '../slices/transaction-slice';

export default function MonthSpending() {
    const budgets = useSelector(selectBudgets);
    const transactions = useSelector(selectTransactions);

    
    const expectedExpenses = 1000;
    const currentExpenses = 600;
    const expectedIncome = 1500;
    const currentIncome = 500;
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