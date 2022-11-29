import { Outlet } from "react-router-dom";
import SignIn from "../../components/sign-in/sign-in-component";
import SignUp from "../../components/sign-up/sign-up-component";

import { Box } from "@mui/system";

const Authentication = () => {
  return (
    <Box display="flex" justifyContent="space-around" p={5}>
      <Outlet />
      <SignIn />
      <SignUp />
    </Box>
  );
};

export default Authentication;
