import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/user-context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button, IconButton, Box } from "@mui/material";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import typography from "@mui/system";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  console.log(currentUser);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <KitchenOutlinedIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, typography: "h6" }}>PANTRY </Box>
          <Link to="/">
            {currentUser ? (
              <Button
                variant="contained"
                color="error"
                onClick={signOutHandler}
              >
                SIGN OUT
              </Button>
            ) : (
              <Button variant="contained" color="success">
                SIGN IN
              </Button>
            )}
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Navigation;
