import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/user-context";
import { useObjectState } from "../../hooks";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { Button, TextField, Box } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const defaultSignUpValues = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const SignUp = () => {
  const { values, restoreDefaultValues, setValue } =
    useObjectState(defaultSignUpValues);
  const { displayName, email, password, passwordConfirmation } = values;
  const { setCurrentUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);

      await createUserDocumentFromAuth(user, { displayName });
      restoreDefaultValues();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use");
      } else {
        console.log("Creation of user went wrong", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
  };

  return (
    <Box display="flex" flexDirection="column" gap={5} padding={10}>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={5}>
          <TextField
            label="Display name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />

          <TextField
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <TextField
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />

          <TextField
            label="Password Confirmation"
            type="password"
            required
            onChange={handleChange}
            name="passwordConfirmation"
            value={passwordConfirmation}
          />
          <Box gridColumn="span 2" justifySelf="center">
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              endIcon={<SendRoundedIcon />}
              size="large"
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SignUp;
