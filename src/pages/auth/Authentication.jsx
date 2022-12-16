import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { Box } from "@mui/system";

const Authentication = () => {
  return (
    <Box display="flex" justifyContent="space-around" p={5}>
      <SignIn />
      <SignUp />
    </Box>
  );
};

export default Authentication;
