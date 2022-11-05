import { Add, Visibility } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Dialog, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { selectTransactionsByMonth } from '../slices/transaction-slice';
import { updateTab } from '../slices/tab-slice';
import TransactionDialog from "./transaction-dialog";
import { useState } from "react";
import { selectDate } from "../slices/date-slice";

export default function RecentTransactions() { 
    const currentDate = useSelector(selectDate);
    const rows = useSelector(selectTransactionsByMonth(currentDate));

    const [transactionOpen, setTransactionOpen] = useState(false);

    const handeAddTransaction = () => {
        setTransactionOpen(true);
    };

    const handleClose = () => {
        setTransactionOpen(false);
    };

    const dispatch = useDispatch();

    const onViewClicked = (event) => {
        dispatch(updateTab(2));
    }

    return (
        <div>
            <Card sx={{flex: 1}}>
                <CardHeader title={"Recent Transactions"} action={
                    <div>
                        <Tooltip title="Add Transaction">
                            <IconButton onClick={handeAddTransaction}>
                                <Add />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="View Transactions">
                            <IconButton onClick={onViewClicked}>
                                <Visibility />
                            </IconButton>
                        </Tooltip>
                    </div>}></CardHeader>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Account</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.type === 1 ? '-' : ''}${Math.abs(row.amount).toFixed(2)}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.category.name}</TableCell>
                                        <TableCell>{row.type === 1 ? 'Expense' : 'Income'}</TableCell>
                                        <TableCell>{row.account.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Dialog open={transactionOpen}>
                <TransactionDialog onClose={handleClose} />
            </Dialog>
        </div>
    )
}