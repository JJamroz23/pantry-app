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
        mb={3}
        justifyContent="center"
        sx={{
          gap: {
            xs: 0,
            sm: 1,
            lg: 3,
          },
        }}
      >
        {Array(4)
          .fill(1)
          .map((i, idx) => (
            <Grid
              item
              key={idx}
              height={60}
              sx={{
                width: {
                  xs: 80,
                  sm: 100,
                  md: 200,
                },
              }}
            >
              <Skeleton
                variant="rectangular"
                height={60}
                sx={{
                  width: {
                    xs: 80,
                    sm: 100,
                    md: 200,
                  },
                }}
              />
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
        mb={3}
        justifyContent="center"
        sx={{
          gap: {
            xs: 0,
            sm: 1,
            lg: 3,
          },
        }}
      >
        <Grid item>
          <Controller
            control={control}
            name={`products.${index}.name`}
            render={({ field }) => (
              <TextField
                label="Product name"
                variant="outlined"
                disabled
                {...field}
                sx={{
                  width: {
                    xs: 80,
                    sm: 100,
                    md: 200,
                  },
                }}
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
                label="Product units"
                sx={{
                  width: {
                    xs: 80,
                    sm: 100,
                    md: 200,
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
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
                sx={{
                  width: {
                    xs: 80,
                    sm: 100,
                    md: 200,
                  },
                }}
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
                label="subtract value"
                defaultValue={0}
                sx={{
                  width: {
                    xs: 80,
                    sm: 100,
                    md: 200,
                  },
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PantryProductForm;
