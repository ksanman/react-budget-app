import { LinearProgress } from "@mui/material";

export default function BudgetCategoryOverview(props) {
    var value, percentage;
    if(props.expected === 0) {
        value = props.current;
        percentage = 100;
    } else {
        value = props.current / props.expected;
        percentage = value * 100;
    }

    const color = value === 1 ? 'primary' : value > 1 ? 'error' : 'info';

    return (
        <div style={{marginLeft: '5px', marginRight: '5px'}}>
            <h3>{props.category}</h3>
            <LinearProgress 
            color={color}
            variant={'determinate'}
            value={percentage}
            />
            <div>Current: ${props.current}</div>
            <div>Expected: ${props.expected}</div>
        </div>
    )
}