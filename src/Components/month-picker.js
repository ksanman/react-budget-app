import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectDate, updateDate } from '../slices/date-slice';

const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
};


export default function MonthPicker() {
    const currentDate = new Date(useSelector(selectDate));

    const currentMonth = months[currentDate.getMonth() + 1];
    const currentYear = currentDate.getFullYear();
    const dispatch = useDispatch();
    const cycleMonth = (amount) => {
        const nextDate = new Date(currentDate.setMonth((currentDate.getMonth()) + amount));
        dispatch(updateDate(nextDate.toISOString()));
    }

    return  (
        <Stack direction={'row'} justifyContent='center' alignItems={'center'} sx={{marginY: '10px'}}>
            <Tooltip title='Previous Month'>
                <IconButton onClick={() => cycleMonth(-1)}>
                    <ArrowLeft />
                </IconButton>
            </Tooltip>
            <Typography variant="h4" sx={{width: '300px'}} textAlign='center'>{currentMonth} {currentYear}</Typography>
            <Tooltip title='Next Month'>
                <IconButton onClick={() => cycleMonth(1)}>
                    <ArrowRight />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}