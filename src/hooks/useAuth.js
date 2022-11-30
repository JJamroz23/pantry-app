import { useState } from "react";
import { useEffect } from "react";
import { authStateChangeListener } from "../utils/firebase/firebase.utils";

const useAuth = () => {
  const [logged, setLogged] = useState(null);
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
