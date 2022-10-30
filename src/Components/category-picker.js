import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories, addCategory } from "../slices/category-slice";


const filter = createFilterOptions();

export default function CategoryPicker(props) {
    let categories = useSelector(selectCategories);

    if(props.type) {
      categories = categories.filter(c => c.type === props.type);
    }

    const cat = props?.category || {id: -1, name: ''};

    const [category, setCategory] = useState(cat);
    const [isValid, setIsValid] = useState(cat ? true : false);

    const dispatch = useDispatch();

    const handleCategoryChange = (event, newValue) => {
        let category;
        if(typeof category === 'string') {
          category = {
            id: -1,
            name: newValue,
            type: props?.type ?? 1
          };
        }
        else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          category = {
            id: Math.max(...categories.map(c => c.id) + 1, 0),
            name: newValue.inputValue, 
            type: props?.type ?? 1
          };

          dispatch(addCategory(category));
        } else {
          category = newValue
        }
  
        setCategory(category);

        if(props.onChange)
          props.onChange(category);
  
        const valid = category.name !== '';
        setIsValid(valid);
        if(props.onValidationChange)
          props.onValidationChange(category);
      };
  
      const categoryCompare = (option, value) => {
        if(typeof value === 'string') {
          return option.name === value;
        }
        return option.name === value.name;
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
        <Autocomplete 
                disablePortal
                options={categories}
                value={category}
                onChange={handleCategoryChange}
                filterOptions={filterCategories}
                renderInput={(params) => <TextField {...params} label="Category" variant="standard" required/>}
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
                freeSolo
            />
    )
}