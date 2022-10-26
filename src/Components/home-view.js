import { Box } from "@mui/system";
import BudgetOverview from "./budget-overview";
import MonthPicker from "./month-picker";
import MonthSpending from "./month-spending";
import RecentTransactions from "./recent-transactions";

export default function HomeView() {
    return (
        <Box>
            <MonthPicker />
            <MonthSpending />
            <Box sx={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <BudgetOverview />
                <RecentTransactions />
            </Box>
        </Box>
    )
}