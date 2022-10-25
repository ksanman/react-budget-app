import { LinearProgress } from "@mui/material";

export default function BudgetCategoryOverview(props) {
    var value, inverted, percentage;
    if(props.expected === 0) {
        value = props.current;
        inverted = -value;
        percentage = 0;
    } else {
        value = props.current / props.expected;
        inverted = 1 - value;
        percentage = inverted * 100;
    }

    const color = inverted === 0 ? 'primary' : inverted < 0 ? 'error' : 'info';
    console.log(`${props.category}, ${inverted}`)
    return (
        <div>
            <LinearProgress 
            color={color}
            sx={{
                width: 4,
                height: 200,
                "& span.MuiLinearProgress-bar": {
                    transform: `translateY(${percentage}%) !important` //has to have !important
                }
            }}
            variant={'determinate'}
            value={percentage}
            />
            <h3>{props.category}</h3>
            <div>Current: ${props.current}</div>
            <div>Expected: ${props.expected}</div>
        </div>
    )
}