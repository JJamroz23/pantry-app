import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/user-context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { NavigationContainer } from "./navigation-style";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  console.log(currentUser);

  return (
    <>
      <NavigationContainer>
        <Link to="/">
          {currentUser ? (
            <span onClick={signOutHandler}>SIGN OUT</span>
          ) : (
            <span>SIGN IN</span>
          )}
        </Link>
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
