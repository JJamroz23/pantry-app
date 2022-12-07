import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProductDoc } from "../../utils/firebase/products";
import SingleSelect from "../../components/Select";
import { Controller } from "react-hook-form";
import { Grid, IconButton, Skeleton, TextField } from "@mui/material";
import get from "lodash/get";

const SettingsProductForm = ({
  user,
  remove,
  firestoreUid,
  index,
  errors,
  loading,
  control,
  register,
  isSubmitting,
}) => {
  const getFieldErrorProps = (fieldPath) => {
    const errorObj = get(errors, fieldPath);
    return {
      error: !!errorObj,
      helperText: errorObj?.message,
    };
  };

  const onDelete = async () => {
    try {
      if (firestoreUid) {
        await deleteProductDoc(user.uid, firestoreUid);
      }
      remove(index);
    } catch (error) {
      console.error("Error removing product.", error);
    }
  };

  return (
    <Grid key={firestoreUid} container gap={2} mb={2}>
      <Grid item>
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={60} />
        ) : (
          <Controller
            control={control}
            name={`products.${index}.units`}
            render={({ field }) => (
              <SingleSelect
                {...field}
                {...getFieldErrorProps(field.name)}
                label="units"
                options={["kg", "lb", "unit"]}
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
            name={`products.${index}.name`}
            render={({ field }) => (
              <TextField
                {...field}
                {...getFieldErrorProps(field.name)}
                label="Product name"
                sx={{ width: 200 }}
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
            name={`products.${index}.minimum`}
            render={({ field }) => (
              <TextField
                {...register(field.name, {
                  valueAsNumber: true,
                })}
                {...getFieldErrorProps(field.name)}
                label="Minimum value"
                sx={{ width: 200 }}
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
            name={`products.${index}.maximum`}
            render={({ field }) => (
              <TextField
                {...register(field.name, {
                  valueAsNumber: true,
                })}
                {...getFieldErrorProps(field.name)}
                label="Maximum value"
                sx={{ width: 200 }}
              />
            )}
          />
        )}
      </Grid>

      <IconButton
        color="primary"
        disabled={isSubmitting}
        type="button"
        onClick={onDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
};

export default SettingsProductForm;
