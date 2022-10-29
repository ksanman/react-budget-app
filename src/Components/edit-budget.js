import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { useState } from "react";
import EditBudgetCategory from "./edit-budget-category";
import { useDispatch } from "react-redux";
import addBudget from '../slices/budget-slice';

export default function EditBudget(props) {
    const dispatch = useDispatch();
    const {budget, message} = props;
    const title = message ? message : budget ? 'Edit Budget' : 'Create Budget';
    const budgetCats = budget?.budgetCategories ?? [];
    const [budgetCategories, setBudgetCategories] = useState(budgetCats);
    const [name, setName] = useState(budget?.name ?? '');
    const handleOnAddBudgetClick = () => {
        const cats = [...budgetCategories];
        cats.push({
            category: '',
            amount: 0
        });
        setBudgetCategories(cats);
    }

    const handleSaveClick = () => {
        console.debug('Save clicked!');
        const bud = {
            id: 0,
            budgetCategories: budgetCategories,
            name: name
        };
        console.debug(bud);
        dispatch(addBudget(bud));
    }

    const handleRemoveClicked = (key) => {
        const cats = budgetCategories.filter((v,i) => i !== key);
        setBudgetCategories(cats);
    }

    const onBudgetCategoryChanged = (index, budgetCategory) => {
        const cats = [...budgetCategories];
        cats[index] = budgetCategory;
        setBudgetCategories(cats);
    }

    return (
        <Card>
            <CardHeader title={title} action={<Button variant={'contained'} onClick={handleSaveClick}>Save</Button>}></CardHeader>
            <CardContent>
                <TextField placeholder="Budget Name" required value={name} onChange={(event) => setName(event.target.value)} />
                <div>
                    <Button variant={'contained'} onClick={handleOnAddBudgetClick}> Add Budget Category</Button>
                </div>
                {budgetCategories.map((category, index) => {
                    return (
                        <EditBudgetCategory key={index} 
                        budgetCategory={category} 
                        removeClicked={() => handleRemoveClicked(index)}
                        onChange={(budgetCategory) => onBudgetCategoryChanged(index, budgetCategory)}
                        />
                    )
                })}
            </CardContent>
        </Card>
    )
}