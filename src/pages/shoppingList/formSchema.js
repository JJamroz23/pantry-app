import * as yup from "yup";

export const msgs = {
  required: "Value is required",
  requiredNumber: "Numeric value is required",
  number: "Must be a number",
  positive: "Must be a positive value",
  integer: "Must be integer",
  minimum: "Must be more than minimum field value",
  maximum: "Must be less than maximum field value",
};

export const schema = yup.object().shape({
  products: yup.array(
    yup.object({
      updateValue: yup
        .number()
        .required(msgs.requiredNumber)
        .typeError(msgs.number)
        .transform((_, val) => (val === Number(val) ? val : null))
        .max(yup.ref("maximum"), msgs.maximum)
        .min(yup.ref("minimum"), msgs.minimum)
        .test("positiveNumber", msgs.positive, (value) => {
          return !(Number(value) < 0);
        })
        .when("units", {
          is: "unit",
          then: (schema) => schema.integer(msgs.integer),
        }),
    })
  ),
});
