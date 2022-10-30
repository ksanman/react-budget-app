import { Card, CardContent, CardHeader, LinearProgress } from "@mui/material";

export default function BudgetCategoryOverview(props) {
    const { budgetCategory } = props;
    var value, percentage;
    if(budgetCategory.expected === 0) {
        value = props.current;
        percentage = 100;
    } else {
        value = budgetCategory.current / budgetCategory.expected;
        percentage = value * 100;
    }

    const color = value === 1 ? 'primary' : value > 1 ? 'error' : 'info';
    const subTitle = budgetCategory.type === 2 ? 'Income' : 'Expense';
    return (
        <Card>
            <CardHeader title={budgetCategory.category} subheader={subTitle} />
            <CardContent>
                <LinearProgress 
                color={color}
                variant={'determinate'}
                value={percentage}
                />
                <div>Current: ${budgetCategory.current}</div>
                <div>Expected: ${budgetCategory.expected}</div>
            </CardContent>
        </Card>
    )
}