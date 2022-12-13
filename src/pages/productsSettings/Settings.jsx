import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/AddCircle";
import SettingsProductForm from "./Form";

import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useCurrentUser } from "../../hooks";
import { addProductsDocs, getProducts } from "../../utils/firebase/products";
import { schema } from "./formSchema";
const DEFAULT_PRODUCT = {
  maximum: "",
  units: "",
  name: "",
  minimum: "",
};

const defaultSettingsValues = {
  products: [DEFAULT_PRODUCT],
};

const ProductsSettings = () => {
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultSettingsValues,
    mode: "onSubmit", // trigger 1wszej walidacji
    reValidateMode: "onChange", // trigger kazdej kolejnej walidacji
  });
  const { fields, append, remove } = useFieldArray({
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

  console.log(methods.getValues().products);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (currentFormValues) => {
    await addProductsDocs(user.uid, currentFormValues);
    loadData();
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
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <SettingsProductForm
              user={user}
              remove={remove}
              firestoreUid={field.uid}
              index={index}
              errors={methods.formState.errors}
              loading={loading}
              control={methods.control}
              register={methods.register}
              isSubmitting={methods.formState.isSubmitting}
              key={field.id}
            />
          );
        })}
        <IconButton
          disabled={methods.formState.isSubmitting}
          type="button"
          onClick={() => append(DEFAULT_PRODUCT)}
        >
          <AddIcon />
        </IconButton>
        <Button
          variant="contained"
          disabled={methods.formState.isSubmitting || loading}
          type="submit"
        >
          Save products
        </Button>
      </form>
    </Box>
  );
};

export default ProductsSettings;
