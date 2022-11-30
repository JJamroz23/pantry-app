import {
  Box,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { useObjectState } from "../../hooks";

const defaultSettingsValues = {
  units: "",
  amount: "",
};

const ProductsSettings = () => {
  const { values, restoreDefaultValues, setValue } = useObjectState(
    defaultSettingsValues
  );
  const { units, amount } = values;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    restoreDefaultValues();
  };

  const UnitCheck = () => {
    if (units === "kg") {
      return (
        <Box display="flex" gap={5}>
          <TextField
            label="Product"
            type="text"
            required
            onChange={handleChange}
            name="amount"
            value={amount}
            // InputProps={{
            //   endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            // }}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            endIcon={<SendRoundedIcon />}
            size="medium"
          >
            Submit
          </Button>
        </Box>
      );
    }
    if (units === "nr") {
      return (
        <Box display="flex" gap={5}>
          <TextField
            label="Product"
            type="text"
            required
            onChange={handleChange}
            name="amount"
            value={amount}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            endIcon={<SendRoundedIcon />}
            size="medium"
          >
            Submit
          </Button>
        </Box>
      );
    }
    return;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={5}
      marginTop={5}
      alignItems="center"
    >
      <h1>Add products to your pantry!</h1>
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={5}>
          <TextField
            label="Select unit"
            name="units"
            select
            value={units}
            onChange={handleChange}
            sx={{ width: 200 }}
          >
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="nr">number</MenuItem>
          </TextField>
          <UnitCheck />
        </Box>
      </form>
    </Box>
  );
};

export default ProductsSettings;
