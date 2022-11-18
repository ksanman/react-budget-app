
import { Add, Remove, RemoveCircle } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Slider } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import CategoryPicker from './category-picker';




export default function EditBudgetCategory(props) {
    const {budgetCategory} = props; 
    const [category, setCategory] = useState(budgetCategory.category ?? undefined);
    const [amount, setAmount] = useState(budgetCategory.amount ?? 0);

    const handleSliderChanged = (event, newValue) => {
      budgetCategory.value = newValue;
      setAmount(newValue);
      onChange({
        category: category,
        amount: newValue
      });
    }
    
    const handleRemoveClicked = () => {
      props?.removeClicked();
    };

    const handleCategoryChange = (category) => {
      setCategory(category);
      
      onChange({
        category: category,
        amount: amount
      });
    };

    const onChange = (budgetCategory) => {
      props.onChange(budgetCategory);
      const valid = budgetCategory.category !== '';
      props.onValidationChange(valid);
    }


    const onAmountChanged = (event) => {
      let value = parseInt(event.target.value);
      if(isNaN(value)) {
        value = 0;
      }

      setAmount(value);
      onChange({
        category: category,
        amount: value
      });
    }

    return (
        <Card sx={{minWidth: '250px'}}>
          <CardHeader action={<IconButton onClick={handleRemoveClicked}><RemoveCircle /></IconButton>}/>
          <CardContent>
            <CategoryPicker onChange={handleCategoryChange} type={props?.type ?? 0} category={category}/>
            <Box sx={{marginY: 2}}>
              <FormControl>
                  <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={amount}
                    onChange={onAmountChanged}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                    min={0}
                    max={10000}
                    type={'number'}
                  />
              </FormControl>
              <Stack spacing={2} direction={'row'} alignItems={'center'}>
                <Remove />
                <Slider value={amount} onChange={handleSliderChanged} min={0} max={10000}/>
                <Add />
              </Stack>
            </Box>
          </CardContent>
        </Card>
    )
}