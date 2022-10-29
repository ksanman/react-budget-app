import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from "react";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux'
import { addAccount, selectAccounts} from '../slices/accounts-slice';
import { addTransaction } from "../slices/transaction-slice";
import CategoryPicker from "./category-picker";

const filter = createFilterOptions();

export default function TransactionDialog(props) {
    const { onClose, transaction, open } = props;

    const accounts = useSelector(selectAccounts);

    const title = (transaction ? 'Edit' : 'Add') + ' Transaction';
    const [date, setDate] = useState(transaction ? transaction.date : new Date().toDateString());
    const [amount, setAmount] = useState(transaction ? Math.abs(transaction.amount) : 0);
    const [description, setDescription] = useState(transaction ? transaction.description : '');
    const [category, setCategory] = useState(transaction ? transaction.category : '');
    const [type, setType] = useState(transaction ? transaction.type : 0);
    const [account, setAccount] = useState(transaction ? transaction.account : '');

    const handleClose = () => {
        onClose(transaction);
    }

    const handleSave = () => {
        const savedTransaction = {
            id: transaction ? transaction.id : 0,
            date: date,
            amount: type === 0 ? -amount : amount,
            description: description,
            category: category,
            type: type === 0 ? 'Expense' : 'Income',
            account: account
        };

        if(!transaction) {
            dispatch(addTransaction(savedTransaction));
        }

        onClose(transaction);
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const onCategoryChange = (category) => {
      setCategory(category)
    }

    const dispatch = useDispatch();

    return ( 
    <form>
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{display: 'flex', flexDirection: 'column'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => {
                    setDate(newValue.toDateString());
                }}
                renderInput={(params) => <TextField {...params}  variant="standard"/>}
                />
            </LocalizationProvider>
            <TextField 
                label="Amount"
                value={amount}
                onChange={(event)=>{setAmount(Number(event.target.value))}}
                type='number'
                variant="standard"
                sx={{marginTop: '10px'}}
                InputProps={{ inputProps: {min: 0}}}
            />
            <TextField 
                label="Description"
                value={description}
                onChange={(event)=>{setDescription(event.target.value)}}
                type='text'
                variant="standard"
            />
            <CategoryPicker onChange={onCategoryChange} />
            <FormControl variant="standard" sx={{marginTop: "10px"}}>
                <InputLabel>Type</InputLabel>
                <Select
                    value={type}
                    onChange={handleTypeChange}
                    label='Type'
                >
                    <MenuItem value={0}>Expense</MenuItem>
                    <MenuItem value={1}>Income</MenuItem>
                </Select>
            </FormControl>
            <Autocomplete 
                disablePortal
                options={accounts}
                value={account}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setAccount(newValue);
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      dispatch(addAccount(newValue.inputValue))
                      setAccount(newValue.inputValue);
                      
                    } else {
                      setAccount(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
            
                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                      });
                    }
            
                    return filtered;
                  }}
                renderInput={(params) => <TextField {...params} label="Account" variant="standard"/>}
                getOptionLabel={(option) => {
                    if(typeof option === 'string') {
                        return option;
                    }
                    if(option.inputValue) {
                        return option.inputValue;
                    }

                    return option.name
                }}
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                isOptionEqualToValue={(option, value) => option.name === value.name}
            />
        </DialogContent>
        <DialogActions>
            <Button type="button" onClick={handleClose} color="error">Cancel</Button>
            <Button type="submit" onClick={handleSave}>Save</Button>
        </DialogActions>
           
        </Dialog>
    </form>
    )
}