import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { useState } from "react";
import EditBudgetCategory from "./edit-budget-category";
import { useDispatch } from "react-redux";
import  { addBudget } from '../slices/budget-slice';

export default function EditBudget(props) {
    const dispatch = useDispatch();
    const {budget, message} = props;
    const title = message ? message : budget ? 'Edit Budget' : 'Create Budget';
    const budgetCats = budget?.budgetCategories ?? [];
    const [budgetCategories, setBudgetCategories] = useState(budgetCats);
    const [name, setName] = useState(budget?.name ?? '');
    const [valid, setValid] = useState(false);
    const [isNameValid, setIsNameValid] = useState(budget?.name || false);
    const [categoryValidation, setCategoryValidation] = useState(budgetCategories.map(c => c.category ? true : false));

    const handleOnAddBudgetClick = () => {
        const cats = [...budgetCategories];
        cats.push({
            category: '',
            amount: 0
        });
        setBudgetCategories(cats);

        const catValid = [...categoryValidation];
        catValid.push(false);
        setCategoryValidation(catValid);

        const isBudgetValid = isNameValid && catValid.every(c => c === true);
        setValid(isBudgetValid);
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

    const onBudgetCategoryValidationChanged = (index, isValid) => {
        const cats = [...categoryValidation];
        cats[index] = isValid;
        setCategoryValidation(cats);

        const isBudgetValid = isNameValid &&  isNameValid && cats.every(c => c === true);
        setValid(isBudgetValid);
    }

    const areAllCategoriesValid = () => {
        const areCategoriesValid = categoryValidation.every(i => i === true);
        return areCategoriesValid
    }

    const onNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        let validName = true;
        if(newName.length === 0) {
            validName = false;
        } else if (newName.length > 100) {
            validName=false;
        } else if (newName.length < 3) {
            validName=false;
        }

        const isValid = validName && areAllCategoriesValid();
        setIsNameValid(validName);
        setValid(isValid);
    }

    return (
        <Card>
            <CardHeader title={title} action={<Button variant={'contained'} onClick={handleSaveClick} disabled={!valid}>Save</Button>}></CardHeader>
            <CardContent>
                <TextField placeholder="Budget Name" required value={name} onChange={onNameChange} />
                <div>
                    <Button variant={'contained'} onClick={handleOnAddBudgetClick}> Add Budget Category</Button>
                </div>
                {budgetCategories.map((category, index) => {
                    return (
                        <EditBudgetCategory key={index} 
                        budgetCategory={category} 
                        removeClicked={() => handleRemoveClicked(index)}
                        onChange={(budgetCategory) => onBudgetCategoryChanged(index, budgetCategory)}
                        onValidationChange={(isValid) => onBudgetCategoryValidationChanged(index, isValid)}
                        />
                    )
                })}
            </CardContent>
        </Card>
    )
}