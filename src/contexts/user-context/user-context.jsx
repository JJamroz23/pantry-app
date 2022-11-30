import { createContext, useState, useEffect } from "react";
import {
  authStateChangeListener,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const listener = authStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        console.log("aa");
      }
      setCurrentUser(user);
      console.log("bb");
    });
    return listener;
  }, []);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
