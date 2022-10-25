import { Card, CardContent, LinearProgress } from "@mui/material";

export default function MonthOverview(props) {
    const expected = props.expected;
    const current = props.current;
    const currentLabel = props.currentLabel;
    const expectedLabel = props.expectedLabel;
    const color = props.color || 'primary';
    const percentage = current / expected * 100;
    return (
        <Card>
            <CardContent>
                <div>Current {currentLabel}: ${current}</div>
                <div style={{marginBottom: '5px'}}>Expected {expectedLabel}: ${expected}</div>
                <LinearProgress variant="determinate" value={percentage} color={color}/>
            </CardContent>
        </Card>
    )
}