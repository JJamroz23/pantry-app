import { Box, MenuItem, TextField } from "@mui/material";
import { useCurrentUser, useObjectState } from "../../hooks";
import { productToDocAdd } from "../../utils/firebase/products";
import ProductForm from "./Form";
import { useForm, useFieldArray } from "react-hook-form";

const defaultSettingsValues = {
  units: "",
  product: "",
  minimum: "",
  maximum: "",
};

const ProductsSettings = () => {
  const user = useCurrentUser();
  console.log(user);

  const { values, restoreDefaultValues, setValue } = useObjectState(
    defaultSettingsValues
  );
  const { units, product, minimum, maximum } = values;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    productToDocAdd(user.uid, { product, units, minimum, maximum });
    restoreDefaultValues();
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
            <MenuItem value="kg">kilograms</MenuItem>
            <MenuItem value="number">numbers</MenuItem>
          </TextField>
          {units && (
            <ProductForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              product={product}
              maximum={maximum}
              minimum={minimum}
            />
          )}
        </Box>
      </form>
    </Box>
  );
};

export default ProductsSettings;
