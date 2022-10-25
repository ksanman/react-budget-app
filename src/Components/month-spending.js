import { Box } from "@mui/material";
import MonthOverview from "./month-overview";

export default function MonthSpending() {
    const expectedExpenses = 1000;
    const currentExpenses = 600;
    const expectedIncome = 1500;
    const currentIncome = 500;
    const expectedSave = expectedIncome - expectedExpenses;
    const currentSaved = currentIncome - currentExpenses;
    const saveColor = currentSaved > 0 ? "primary" : "error";
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <MonthOverview expected={expectedExpenses} current={currentExpenses} currentLabel={"spent"} expectedLabel={"to spend"} color={"error"} />
            <MonthOverview expected={expectedIncome} current={currentIncome} currentLabel={"income"} expectedLabel={"to earn"} />
            <MonthOverview expected={expectedSave} current={currentSaved} currentLabel={"saved"} expectedLabel={"to save"} color={saveColor} />
        </Box>
    )
}