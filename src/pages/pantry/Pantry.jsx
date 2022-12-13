import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useCurrentUser } from "../../hooks";
import { addProductsDocs, getProducts } from "../../utils/firebase/products";
import PantryProductForm from "./Form";
import { schema } from "./formSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const PANTRY_PRODUCTS = {
  units: "",
  name: "",
  currentValue: "",
  maximum: "",
  minimum: "",
};

const defaultPantryValues = {
  products: [PANTRY_PRODUCTS],
};

const PantryComponent = () => {
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

  const giveData = async () => {
    setLoading(true);
    try {
      const products = await getProducts(user.uid);
      if (products.length) methods.setValue("products", products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    // products.map((product, index) => {
    //   return console.log(product.name, product.currentValue, product.units);
    // });
    // console.log(products, "pantry");
  };
  // giveData();

  useEffect(() => {
    giveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (currentFormValues) => {
    await addProductsDocs(user.uid, currentFormValues);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={5}
      marginTop={5}
      alignItems="center"
    >
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
            />
          );
        })}

        <Button
          variant="contained"
          color="success"
          disabled={methods.formState.isSubmitting || loading}
          type="submit"
          sx={{ marginLeft: "200px" }}
        >
          UPDATE VALUE
        </Button>
      </form>
    </Box>
  );
};

export default PantryComponent;
