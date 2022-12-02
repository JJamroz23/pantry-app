import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

const ProductForm = ({
  handleSubmit,
  handleChange,
  product,
  maximum,
  minimum,
}) => {
  return (
    <Box display="flex" gap={5}>
      <TextField
        label="Product"
        type="text"
        required
        onChange={handleChange}
        name="product"
        value={product}
        // InputProps={{
        //   endAdornment: <InputAdornment position="end">kg</InputAdornment>,
        // }}
      />
      <TextField
        label="min"
        type=""
        required
        onChange={handleChange}
        name="minimum"
        value={minimum}
      />
      <TextField
        label="max"
        type="number"
        required
        onChange={handleChange}
        name="maximum"
        value={maximum}
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

  // if (units === "nr") {
  //   return (
  //     <Box display="flex" gap={5}>
  //       <TextField
  //         label="Product"
  //         type="text"
  //         required
  //         onChange={handleChange}
  //         name="amount"
  //         value={amount}
  //       />
  //       <Button
  //         type="submit"
  //         variant="contained"
  //         onClick={handleSubmit}
  //         endIcon={<SendRoundedIcon />}
  //         size="medium"
  //       >
  //         Submit
  //       </Button>
  //     </Box>
  //   );
  // }
};

export default ProductForm;
