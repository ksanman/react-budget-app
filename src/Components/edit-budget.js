import { Button, Card, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTab } from "../slices/tab-slice";
import  { addBudget, updateBudget } from '../slices/budget-slice';
import EditBudgetCategories from "./edit-budget-categories";

export default function EditBudget(props) {
    const dispatch = useDispatch();
    const {budget, message} = props;
    const title = message ? message : budget ? 'Edit Budget' : 'Create Budget';
    const incomes = budget?.budgetCategories?.filter(c => c.category.type === 2) || [];
    const expenses = budget?.budgetCategories?.filter(c => c.category.type === 1) || [];

    const [name, setName] = useState(budget?.name ?? '');
    const [incomeBudgets, setIncomeBudgets] = useState(incomes);
    const [expenseBudgets, setExpenseBudgets] = useState(expenses);

    const [valid, setValid] = useState(budget ? true : false);

    const isNameValid = (name) => {
        if(name.length === 0) {
            return false;
        } else if (name.length > 100) {
            return false;
        } else if (name.length < 3) {
            return false;
        } else {
            return true;
        }
    }

    const areExpensesValid = expenses.length > 0 && expenses.every(e => e?.category);
    const areIncomesValid = incomes.length > 0 && incomes.every(e => e?.category);
    const validName = isNameValid(name);

    const [validExpenses, setValidExpense] = useState(areExpensesValid);
    const [validIncome, setValidIncome] = useState(areIncomesValid);
    const [isValidName, setIsValidName] = useState(validName);


    const handleSaveClick = () => {
        const bud = {
            id: budget?.id || 0,
            budgetCategories: incomeBudgets.concat(expenseBudgets),
            name: name
        };

        if(budget) {
            dispatch(updateBudget(bud));
        } else {
            dispatch(addBudget(bud));
        }

        dispatch(updateTab(0));
    }

    const areAllCategoriesValid = () => {
        return validExpenses && validIncome;
    }

    const onNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        const validName = isNameValid(newName);
        const isValid = validName && areAllCategoriesValid();
        setIsValidName(validName);
        setValid(isValid);
    }

    const onExpensesValidationChanged = (isValid) => {
        setValidExpense(isValid);
        const isValidBudget = isValidName && validIncome && isValid;
        setValid(isValidBudget);
        
    }

    const onIncomeValidationChanged = (isValid) => {
        setValidIncome(isValid);
        const isValidBudget = isValidName && validExpenses && isValid;
        setValid(isValidBudget);
    }
    
    const onExpensesChanged = (expenses) => {
        setExpenseBudgets(expenses);
    }

    const onIncomeChanged = (income) => {
        setIncomeBudgets(income);
    }

    return (
        <Card>
            <CardHeader title={title} action={<Button variant={'contained'} onClick={handleSaveClick} disabled={!valid}>Save</Button>}></CardHeader>
            <CardContent>
                <TextField placeholder="Budget Name" required value={name} onChange={onNameChange} label={'Name'}/>

                <Stack direction={{
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'column', 
                        xl: 'row'
                    }} 
                    justifyContent={'center'} 
                    alignContent={'stretch'} 
                    spacing={2}>
                    <EditBudgetCategories 
                        title='Expenses' 
                        categories={expenseBudgets}
                        type={1} 
                        OnValidationChanged={onExpensesValidationChanged} 
                        onChange={onExpensesChanged}
                        />
                    <EditBudgetCategories 
                        title='Income'
                        categories={incomeBudgets}
                        type={2} 
                        OnValidationChanged={onIncomeValidationChanged} 
                        onChange={onIncomeChanged}
                        />
                </Stack>

            </CardContent>
        </Card>
    )
} 