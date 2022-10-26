import { Edit } from "@mui/icons-material";
import { Card, CardContent, CardHeader, IconButton, Tooltip } from "@mui/material";
import BudgetCategoryOverview from "./budget-category-overview";

export default function BudgetOverview() {
 const budget = [{
    category: 'Groceries',
    current: 45,
    expected: 800
 },{
    category: 'Utilities',
    current: 100,
    expected: 250
 },{
    category: 'Mortgage',
    current: 0,
    expected: 1000
 }, {
    category: 'Clothes',
    current: 60,
    expected: 60
 }, {
    category: 'Home', 
    current: 75,
    expected: 0
 }]
 return(
    <Card sx={{flex: 1}}>
        <CardHeader title="Budget" action={<Tooltip title="Edit Budget"><IconButton><Edit/></IconButton></Tooltip>}>
        </CardHeader>
        <CardContent>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {budget.map((b, i) => (
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