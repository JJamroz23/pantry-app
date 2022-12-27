import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../contexts/userContext/userContext";
import { signOutUser } from "../utils/firebase/auth";

import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  link: {
    textDecoration: "none",
  },
}));

// import { styled } from "@mui/material/styles";

// const Responsive = styled("div")(({ Button }) => ({
//   [Button.breakpoints.down("lg")]: {
//     size: "small",
//   },
// }));

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { classes } = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <KitchenOutlinedIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, typography: "h6" }}>PANTRY</Box>
          <Box display="flex" gap={5}>
            {currentUser && (
              <>
                <RouterLink className={classes.link} to="/shoppingList">
                  <Button variant="contained" color="success">
                    Shopping list
                  </Button>
                </RouterLink>
                <RouterLink className={classes.link} to="/pantry">
                  <Button variant="contained" color="success">
                    Pantry
                  </Button>
                </RouterLink>
                <RouterLink className={classes.link} to="/settings">
                  <Button variant="contained" color="success">
                    Settings
                  </Button>
                </RouterLink>
              </>
            )}

            <RouterLink to="/">
              {currentUser ? (
                <Button variant="contained" color="error" onClick={signOutUser}>
                  SIGN OUT
                </Button>
              ) : (
                <Button variant="contained" color="success">
                  SIGN IN
                </Button>
              )}
            </RouterLink>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
