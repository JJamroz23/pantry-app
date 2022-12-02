import { useContext } from "react";
import { UserContext } from "../contexts/userContext/userContext";

export default () => {
  const { currentUser } = useContext(UserContext);
  return currentUser;
};
