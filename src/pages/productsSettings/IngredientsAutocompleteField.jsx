import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import { getIngredients } from "../../utils/spoonacular/ingredientSearch";

const IngredientsAutocompleteField = ({
  control,
  name,
  getFieldErrorProps,
  register,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const getOptions = async (query) => {
    console.log(11, { query });
    if (!query) {
      setOptions([]);
      return;
    }

    try {
      const options = await getIngredients(query);
      setOptions(options);
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetOptions = useCallback(debounce(getOptions, 1000), []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          id={name}
          freeSolo
          clearOnBlur
          options={options}
          filterSelectedOptions
          inputValue={inputValue || ""}
          onChange={(event, option) => {
            setInputValue(option);
            // Actually change the state of react-hook-forms
            field.onChange(option);
          }}
          onInputChange={(event, query) => {
            setInputValue(query);
            debouncedGetOptions(query);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...getFieldErrorProps(field.name)}
              variant="outlined"
              sx={{ width: 200 }}
              label="product name"
            />
          )}
        />
      )}
    />
  );
};

export default IngredientsAutocompleteField;
