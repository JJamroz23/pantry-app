import { useContext } from "react";
import { UserContext } from "../contexts/userContext/userContext";

const useCurrentuser = () => {
  const { currentUser } = useContext(UserContext);
  return currentUser;
};

export default useCurrentuser;
