import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { Box } from "@mui/system";

const Authentication = () => {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: {
          sm: "row",
          xs: "column",
        },
        gap: {
          xs: 5,
          sm: 0,
        },
      }}
    >
      <SignIn />
      <SignUp />
    </Box>
  );
};

export default Authentication;
