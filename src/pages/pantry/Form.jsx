import { Grid, TextField, Skeleton } from "@mui/material";
import { Controller } from "react-hook-form";
import get from "lodash/get";
import ProductsDecrement from "./ProductDec";

const PantryProductForm = ({
  firestoreUid,
  user,
  index,
  control,
  loading,
  register,
  errors,
  currValue,
  updateValue,
  isSubmitting,
}) => {
  const getFieldErrorProps = (fieldPath) => {
    const errorObj = get(errors, fieldPath);
    return {
      error: !!errorObj,
      helperText: errorObj?.message,
    };
  };

  // if (loading || isSubmitting) {
  //   return (
  //     <Box display="flex">
  //       <Skeleton variant="rectangular" width={210} height={60} />
  //       <Skeleton variant="rectangular" width={210} height={60} />
  //       <Skeleton variant="rectangular" width={210} height={60} />
  //       <Skeleton variant="rectangular" width={210} height={60} />
  //     </Box>
  //   );
  // }

  return (
    <Grid key={firestoreUid} container gap={3} mb={3} justifyContent="center">
      <Grid item>
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={60} />
        ) : (
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
        )}
      </Grid>

      <Grid item>
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={60} />
        ) : (
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
        )}
      </Grid>

      <Grid item>
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={60} />
        ) : (
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
                sx={{ width: 100 }}
              />
            )}
          />
        )}
      </Grid>
      <Grid item marginLeft={5}>
        <ProductsDecrement
          loading={loading}
          firestoreUid={firestoreUid}
          user={user}
          index={index}
          control={control}
          register={register}
          getFieldErrorProps={getFieldErrorProps}
          currValue={currValue}
          updateValue={updateValue}
          isSubmitting={isSubmitting}
        />
      </Grid>
    </Grid>
  );
};

export default PantryProductForm;
