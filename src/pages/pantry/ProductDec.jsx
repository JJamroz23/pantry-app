import { Box, TextField, Skeleton } from "@mui/material";

import { Controller } from "react-hook-form";

const ProductsDecrement = ({
  loading,
  control,
  index,
  register,
  getFieldErrorProps,
}) => {
  return loading ? (
    <Skeleton variant="rectangular" width={210} height={60} />
  ) : (
    <Controller
      control={control}
      name={`products.${index}.updateValue`}
      render={({ field }) => (
        <Box display="flex" gap={2}>
          <TextField
            {...register(field.name, {
              valueAsNumber: true,
            })}
            {...getFieldErrorProps(field.name)}
            label="subtract value"
            defaultValue={0}
            sx={{ width: 100 }}
          />
        </Box>
      )}
    />
  );
};

export default ProductsDecrement;
