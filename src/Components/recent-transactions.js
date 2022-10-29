import * as React from 'react';
import { Add, Visibility } from "@mui/icons-material";
import { Card, CardContent, CardHeader, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectTransactions } from '../slices/transaction-slice';
import TransactionDialog from "./transaction-dialog";

export default function RecentTransactions() { 
    const rows = useSelector(selectTransactions);

    const [transactionOpen, setTransactionOpen] = React.useState(false);

    const handeAddTransaction = () => {
        setTransactionOpen(true);
    };

    const handleClose = (value) => {
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
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>{row.account}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <TransactionDialog 
                open={transactionOpen} 
                onClose={handleClose}
            />
        </div>
    )
}