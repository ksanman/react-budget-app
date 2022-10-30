import { Add } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Dialog, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTransactions } from "../slices/transaction-slice";
import TransactionDialog from "./transaction-dialog";
import TransactionRow from "./transaction-row";

export default function Transactions() {
    const transactions = useSelector(selectTransactions);
    const [transactionOpen, setTransactionOpen] = useState(false);

    const handeAddTransaction = () => {
        setTransactionOpen(true);
    };

    const handleClose = () => {
        setTransactionOpen(false);
    };

    return (
        <Box>
            <Card sx={{flex: 1}}>
                <CardHeader title={"Transactions"} action={
                    <Tooltip title="Add Transaction">
                        <IconButton onClick={handeAddTransaction}>
                            <Add />
                        </IconButton>
                    </Tooltip>}></CardHeader>
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
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((t) => (
                                    <TransactionRow key={t.id} transaction={t} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Dialog open={transactionOpen}>
                <TransactionDialog onClose={handleClose} />
            </Dialog>
        </Box>
    )
}