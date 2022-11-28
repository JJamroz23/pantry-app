import { useState } from "react";

const useObjectState = (defaultValues = {}) => {
  const [values, setValues] = useState(defaultValues);

  const setValue = (fieldname, value) =>
    setValues({
      ...values,
      [fieldname]: value,
    });

  const restoreDefaultValues = () => setValues(defaultValues);

  return {
    values,
    setValue,
    setValues,
    restoreDefaultValues,
  };
};

export default useObjectState;
