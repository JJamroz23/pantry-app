import { Outlet } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

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
