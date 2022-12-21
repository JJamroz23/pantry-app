import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext/userContext";
import { signOutUser } from "../utils/firebase/auth";

import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

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
          <Box display="flex" gap={5}>
            <Link to="shoppingList">
              {currentUser ? (
                <Button variant="contained" color="success">
                  Shopping list
                </Button>
              ) : null}
            </Link>
            <Link to="/pantry">
              {currentUser ? (
                <Button variant="contained" color="success">
                  Pantry
                </Button>
              ) : null}
            </Link>
            <Link to="/settings">
              {currentUser ? (
                <Button variant="contained" color="success">
                  Settings
                </Button>
              ) : null}
            </Link>
            <Link to="/">
              {currentUser ? (
                <Button variant="contained" color="error" onClick={signOutUser}>
                  SIGN OUT
                </Button>
              ) : (
                <Button variant="contained" color="success">
                  SIGN IN
                </Button>
              )}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
