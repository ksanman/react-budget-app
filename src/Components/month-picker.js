import * as React from 'react';
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
    const current = new Date();
    const month = current.getMonth() + 1;
    const currentMonth = months[month];
    return  (
        <div style={{textAlign: 'center', width: '100%'}}>
            <h1>{currentMonth}</h1>
        </div>
    )
}