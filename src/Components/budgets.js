import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectBudgets } from "../slices/budget-slice";
import EditBudget from './edit-budget';

export default function Budgets() {
    const budget = useSelector(selectBudgets)[0];

    return (
       <Box sx={{width: '100%', height: '100%'}}>
            <EditBudget budget={budget} />
       </Box>
    )
}
