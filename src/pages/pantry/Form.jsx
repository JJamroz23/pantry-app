import { Grid, Skeleton, TextField } from "@mui/material";
import get from "lodash/get";
import { Controller } from "react-hook-form";

const PantryProductForm = ({
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
        {Array(4)
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
    <>
      <Grid
        key={firestoreUid}
        container
        spacing={2}
        mb={3}
        justifyContent="center"
      >
        <Grid item sm={3} xs={6}>
          <Controller
            control={control}
            name={`products.${index}.name`}
            render={({ field }) => (
              <TextField
                label="Product name"
                variant="outlined"
                disabled
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item sm={3} xs={6}>
          <Controller
            control={control}
            name={`products.${index}.units`}
            render={({ field }) => (
              <TextField disabled {...field} label="Product units" />
            )}
          />
        </Grid>
        <Grid item sm={3} xs={6}>
          <Controller
            control={control}
            name={`products.${index}.currentValue`}
            render={({ field }) => (
              <TextField
                {...register(field.name, {
                  valueAsNumber: true,
                })}
                {...getFieldErrorProps(field.name)}
                label="current value"
              />
            )}
          />
        </Grid>
        <Grid item sm={3} xs={6}>
          <Controller
            control={control}
            name={`products.${index}.updateValue`}
            render={({ field }) => (
              <TextField
                {...register(field.name, {
                  valueAsNumber: true,
                })}
                {...getFieldErrorProps(field.name)}
                label="subtract value"
                defaultValue={0}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PantryProductForm;
