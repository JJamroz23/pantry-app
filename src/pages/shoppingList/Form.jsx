import { Grid, TextField, Skeleton } from "@mui/material";
import { Controller } from "react-hook-form";
import get from "lodash/get";

const ShoppingListForm = ({
  firestoreUid,
  index,
  control,
  loading,
  register,
  errors,
  isSubmitting,
}) => {
  const getFieldErrorProps = (fieldPath) => {
    const errorObj = get(errors, fieldPath);
    return {
      error: !!errorObj,
      helperText: errorObj?.message,
    };
  };

  if (loading || isSubmitting) {
    return (
      <Grid
        key={firestoreUid}
        container
        height={60}
        gap={3}
        mb={3}
        justifyContent="center"
      >
        {Array(3)
          .fill(1)
          .map((i, idx) => (
            <Grid item key={idx} width={200} height={60}>
              <Skeleton variant="rectangular" width={200} height={60} />
            </Grid>
          ))}
      </Grid>
    );
  }

  return (
    <Grid key={firestoreUid} container gap={3} mb={3} justifyContent="center">
      <Grid item>
        <Controller
          control={control}
          name={`products.${index}.name`}
          render={({ field }) => (
            <TextField
              label="Prodcut name"
              variant="outlined"
              disabled
              {...field}
              sx={{ width: 100 }}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name={`products.${index}.units`}
          render={({ field }) => (
            <TextField
              disabled
              {...field}
              label="Prodcut units"
              sx={{ width: 100 }}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Controller
          control={control}
          name={`products.${index}.updateValue`}
          render={({ field }) => (
            <TextField
              {...register(field.name, {
                valueAsNumber: true,
              })}
              {...getFieldErrorProps(field.name)}
              label="add value"
              sx={{ width: 100 }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ShoppingListForm;
