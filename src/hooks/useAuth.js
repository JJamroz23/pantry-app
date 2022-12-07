import { useEffect, useState } from "react";
import { authStateChangeListener } from "../utils/firebase/auth";

const useAuth = () => {
  const [logged, setLogged] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const listener = authStateChangeListener((user) => {
      setLogged(!!user);
      setChecked(true);
    });
    return listener;
  }, []);

  return {
    logged,
    checked,
  };
};

export default useAuth;
