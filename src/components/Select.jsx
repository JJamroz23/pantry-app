import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const SingleSelect = ({ label, options, ...rest }) => {
  return (
    <FormControl sx={{ width: "100px" }}>
      <InputLabel>{label}</InputLabel>
      <Select displayEmpty {...rest}>
        <MenuItem key="none" value="none">
          None
        </MenuItem>
        {options.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
      {rest.error && (
        <FormHelperText error={rest.error}>{rest.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};



export default SingleSelect;
