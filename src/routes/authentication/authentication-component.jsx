import SignIn from "../../components/sign-in/sign-in-component";
import SignUp from "../../components/sign-up/sign-up-component";
import { AuthenticationContainer } from "./authentication-style";
import { Outlet } from "react-router-dom";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <Outlet />
      <SignIn />
      <SignUp />
    </AuthenticationContainer>
  );
};

export default Authentication;
