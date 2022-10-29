import * as React from 'react';
import { Add, Visibility } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Dialog, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectTransactions } from '../slices/transaction-slice';
import TransactionDialog from "./transaction-dialog";

export default function RecentTransactions() { 
    const rows = useSelector(selectTransactions);

    const [transactionOpen, setTransactionOpen] = React.useState(false);

    const handeAddTransaction = () => {
        setTransactionOpen(true);
    };

    const handleClose = () => {
        setTransactionOpen(false);
    };

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
                            <IconButton>
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
                                        <TableCell>{row.amount.toFixed(2)}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.category.name}</TableCell>
                                        <TableCell>{row.type === 0 ? 'Expense' : 'Income'}</TableCell>
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