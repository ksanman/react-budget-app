import { Box, Button } from "@mui/material";
import { useState } from "react";
import EditBudgetCategory from "./edit-budget-category";

export default function EditBudgetCategories(props) {
    const title = props?.title || 'Category'
    const budgetCats = props?.categories || [];
    const [categories, setBudgetCategories] = useState(budgetCats);
    const [categoryValidation, setCategoryValidation] = useState(categories.map(c => c.category ? true : false));
    
    const handleRemoveClicked = (key) => {
        const cats = categories.filter((v,i) => i !== key);
        setBudgetCategories(cats);
    }

    const onBudgetCategoryChanged = (index, budgetCategory) => {
        const cats = [...categories];
        cats[index] = budgetCategory;
        setBudgetCategories(cats);
        props.onChange(cats);
    }

    const onBudgetCategoryValidationChanged = (index, isValid) => {
        const cats = [...categoryValidation];
        cats[index] = isValid;
        setCategoryValidation(cats);

        const isBudgetValid = cats.every(c => c === true);
        props.OnValidationChanged(isBudgetValid);
    }

    const handleOnAddBudgetClick = () => {
        const cats = [...categories];
        cats.push({
            category: '',
            amount: 0
        });
        setBudgetCategories(cats);

        const catsValidtion = [...categoryValidation];
        catsValidtion.push(false);
        setCategoryValidation(catsValidtion);

        const isBudgetValid = catsValidtion.every(c => c === true);
        props.OnValidationChanged(isBudgetValid);
    }

    return (
        <Box sx={{width: '100%'}}>
        <Button variant={'contained'} onClick={handleOnAddBudgetClick}> Add {title}</Button>
        {categories.map((category, index) => {
            return (
                <EditBudgetCategory key={index} 
                budgetCategory={category} 
                removeClicked={() => handleRemoveClicked(index)}
                onChange={(budgetCategory) => onBudgetCategoryChanged(index, budgetCategory)}
                onValidationChange={(isValid) => onBudgetCategoryValidationChanged(index, isValid)}
                type={props?.type ?? 0}
                />
            )
        })}
    </Box>
    )
}