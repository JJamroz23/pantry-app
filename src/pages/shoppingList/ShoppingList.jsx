import { useCurrentUser } from "../../hooks";
import { useFieldArray, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getProducts, updateCurrentValue } from "../../utils/firebase/products";
import { Box } from "@mui/system";
import ShoppingListForm from "./Form";
import { schema } from "./formSchema";
import { Button, Grid } from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const SHOPPING_PRODUCTS = {
  units: "",
  name: "",
  currentValue: "",
  maximum: "",
  minimum: "",
  updateValue: "",
};

const defaultShoppingValues = {
  products: [SHOPPING_PRODUCTS],
};

const ShoppingList = () => {
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const [formMode, setformMode] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultShoppingValues,
    mode: "onSubmit", // trigger 1wszej walidacji
    reValidateMode: "onChange", // trigger kazdej kolejnej walidacji
  });

  const { fields } = useFieldArray({
    name: "products",
    control: methods.control,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const products = await getProducts(user.uid);
      if (products.length) methods.setValue("products", products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterByValue = (item) => {
    if (item.currentValue < item.minimum) {
      return item;
    }
  };

  const arrByValue = fields.filter(filterByValue);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCurrentValues = async () => {
    const formValid = await methods.trigger();
    if (!formValid) {
      throw new Error("Form has invalid values");
    }
    const formValues = methods.getValues();
    console.log({ formValues });

    try {
      await Promise.all(
        formValues.products.map((val) =>
          updateCurrentValue(
            user.uid,
            val.uid,
            val.currentValue,
            val.updateValue
          )
        )
      );
      await loadData();
    } catch (error) {
      console.error("Error updating current value", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        gap: {
          xs: 2,
          sm: 5,
        },
      }}
    >
      <h1>This is yout shopping list!</h1>
      {!formMode
        ? arrByValue.map((field) => (
            <Grid
              key={field.uid}
              container
              mb={3}
              textTransform="upperCase"
              justifyContent="center"
              sx={{
                fontSize: {
                  xs: 10,
                  sm: 14,
                  md: 20,
                },
                gap: {
                  xs: 1,
                  md: 4,
                },
              }}
            >
              <Grid item>units: {field.units}</Grid>
              <Grid item>product: {field.name}</Grid>
              <Grid item>minimum value: {field.minimum}</Grid>
              <Grid item>current value: {field.currentValue}</Grid>
            </Grid>
          ))
        : arrByValue.map((field, index) => (
            <ShoppingListForm
              user={user}
              firestoreUid={field.uid}
              index={index}
              control={methods.control}
              key={field.id}
              loading={loading}
              errors={methods.formState.errors}
              register={methods.register}
              currValue={field.currentValue}
              updateValue={field.updateValue}
              isSubmitting={methods.formState.isSubmitting}
            />
          ))}
      {formMode ? (
        <Button
          type="button"
          color="primary"
          disabled={methods.formState.isSubmitting}
          onClick={addCurrentValues}
        >
          Buy now
          <LocalDiningIcon />
        </Button>
      ) : (
        <Button
          onClick={() => setformMode(true)}
          variant="contained"
          color="success"
          disabled={methods.formState.isSubmitting || loading}
        >
          Shopping
        </Button>
      )}
    </Box>
  );
};

export default ShoppingList;
