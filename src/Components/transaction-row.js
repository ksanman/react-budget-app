import { Delete, Edit } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTransaction} from '../slices/transaction-slice';
import TransactionDialog from "./transaction-dialog";

export default function TransactionRow(props) {
    const  {transaction} = props;
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const dispatch = useDispatch();

    const onEditClosed = () => {
        setEditOpen(false);
    }

    const onDeleteClosed = () => {
        setDeleteOpen(false);
    }

    const onDelete = () => {
        dispatch(removeTransaction(transaction));
        setDeleteOpen(false);
    }

    return (
        <TableRow>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.type === 1 ? '-' : ''}${Math.abs(transaction?.amount).toFixed(2)}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.category.name}</TableCell>
            <TableCell>{transaction.type === 1 ? 'Expense' : 'Income'}</TableCell>
            <TableCell>{transaction.account.name}</TableCell>
            <TableCell>
                <Tooltip title="Edit">
                    <IconButton  onClick={() => setEditOpen(true)}>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Dialog key={transaction.id + 'e'} open={editOpen} onClose={onEditClosed}>
                            <TransactionDialog onClose={onEditClosed} transaction={transaction}/>
                        </Dialog>
                <Tooltip title="Delete">
                    <IconButton  onClick={() => setDeleteOpen(true)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
                <Dialog open={deleteOpen}  onClose={onDeleteClosed} key={transaction.id + 'd'}>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this transaction? </Typography>
                        <Typography style={{fontWeight: 'bold'}}>{transaction.date} {transaction.description} for ${transaction.amount.toFixed(2)}?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button varient="standard" type="button" onClick={onDeleteClosed} color={'error'}>No</Button>
                        <Button varient="standard"  type="button" onClick={() => onDelete()}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </TableCell>    
        </TableRow>
    )
}