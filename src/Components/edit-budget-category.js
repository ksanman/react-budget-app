
import { Add, Remove, RemoveCircle } from '@mui/icons-material';
import { Autocomplete, Box, Card, CardContent, CardHeader, createFilterOptions, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Slider, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addCategory, selectCategories } from '../slices/category-slice';

const filter = createFilterOptions();


export default function EditBudgetCategory(props) {
    const {budgetCategory} = props; 
    const categories = useSelector(selectCategories);
    const [category, setCategory] = useState(budgetCategory.category ?? undefined);
    const [amount, setAmount] = useState(budgetCategory.amount ?? 0);
    const [isValid, setIsValid] = useState(budgetCategory.category ?? false);

    const dispatch = useDispatch();

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

    const handleCategoryChange = (event, newValue) => {
      let category;
      if(typeof category === 'string') {
        category = {
          id: -1,
          category: newValue
        };
      }
      else if (newValue && newValue.inputValue) {
        // Create a new value from the user input
        dispatch(addCategory(newValue.inputValue));
        category = {
          id: Math.max(...categories.map(c => c.id) + 1, 0),
          name: newValue.inputValue
        };
      } else {
        category = newValue
      }

      setCategory(category);
      
      onChange({
        category: category,
        amount: amount
      });
    };

    const categoryCompare = (option, value) => {
      if(typeof value === 'string') {
        return option.name === value;
      }
      return option.name === value.name;
    } 

    const onChange = (budgetCategory) => {
      props.onChange(budgetCategory);

      props.onChange(budgetCategory);
      const valid = budgetCategory.category !== '';
      setIsValid(valid);
      props.onValidationChange(valid);
    }

    const filterCategories = (options, params) => {
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
    };

    return (
        <Card>
          <CardHeader action={<IconButton onClick={handleRemoveClicked}><RemoveCircle /></IconButton>}/>
          <CardContent>
            <Autocomplete 
                disablePortal
                options={categories}
                value={category}
                onChange={handleCategoryChange}
                filterOptions={filterCategories}
                renderInput={(params) => <TextField {...params} label="Category" variant="standard"/>}
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
                isOptionEqualToValue={categoryCompare}
                sx={{border: isValid ? 'none' : '1px solid red'}}
            />
            <Box sx={{marginY: 2}}>
              <FormControl>
                  <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={amount}
                    onChange={(event) => setAmount(parseInt(event.target.value))}
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