import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useCurrentUser } from "../../hooks";
import {
  addProductsDocs,
  getProducts,
  updateCurrentValue,
} from "../../utils/firebase/products";
import PantryProductForm from "./Form";
import { schema } from "./formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { omit } from "lodash";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const PANTRY_PRODUCTS = {
  units: "",
  name: "",
  currentValue: "",
  maximum: "",
  minimum: "",
  updateValue: "",
};

const defaultPantryValues = {
  products: [PANTRY_PRODUCTS],
};

const Pantry = () => {
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultPantryValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { fields } = useFieldArray({
    name: "products",
    control: methods.control,
  });

  const getData = async () => {
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

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtractCurrentValues = async () => {
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
      await getData();
    } catch (error) {
      console.error("Error updating current value", error);
    }
  };

  const onSubmit = async (currentFormValues) => {
    console.log(currentFormValues);
    await addProductsDocs(user.uid, {
      products: currentFormValues.products.map((productData) =>
        omit(productData, "updateValue")
      ),
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={5} alignItems="center">
      <h1>This is your pantry</h1>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <PantryProductForm
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
          );
        })}
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="success"
            disabled={methods.formState.isSubmitting || loading}
            type="submit"
            sx={{ marginLeft: "200px" }}
          >
            UPDATE VALUE
          </Button>
          <IconButton
            type="button"
            color="primary"
            disabled={methods.formState.isSubmitting}
            onClick={subtractCurrentValues}
          >
            <LocalDiningIcon />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
};

export default Pantry;
