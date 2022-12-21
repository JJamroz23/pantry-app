import * as yup from "yup";

export const msgs = {
  required: "Value is required",
  requiredNumber: "Numeric value is required",
  number: "Must be a number",
  positive: "Must be a positive value",
  integer: "Must be integer",
  max: "Must be greater than minimum field value",
  min: "Must be less than maximum field value",
  minCurrVal: "Must be less than current value field",
};

export const schema = yup.object().shape({
  products: yup.array(
    yup.object({
      currentValue: yup
        .number()
        .typeError(msgs.number)
        .transform(function (value, originalValue, schema) {
          if (this.isType(value)) return value;
          if (!originalValue || !originalValue.trim()) {
            return null;
          }

          // we return the invalid original value
          return originalValue;
        })
        .nullable()
        .required(msgs.requiredNumber)
        // .min(yup.ref("minimum"), msgs.max)
        .max(yup.ref("maximum"), msgs.min)
        .test("positiveNumber", msgs.positive, (value) => {
          return !(Number(value) < 0);
        })
        .when("units", {
          is: "unit",
          then: (schema) => schema.integer(msgs.integer),
        }),
      updateValue: yup
        .number()
        .required(msgs.requiredNumber)
        .typeError(msgs.number)
        // .transform(function (value, originalValue, schema) {
        //   if (this.isType(value)) return value;
        //   if (!originalValue || !originalValue.trim()) {
        //     return null;
        //   }

        //   // we return the invalid original value
        //   return originalValue;
        // })
        .transform((_, val) => (val === Number(val) ? val : null))
        .max(yup.ref("currentValue"), msgs.minCurrVal)
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
