import { useNavigate } from "react-router-dom";
import { useObjectState } from "../../hooks";

import {
  signAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/auth";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box, Button, Stack, TextField } from "@mui/material";

const defaultSignInValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { values, restoreDefaultValues, setValue } =
    useObjectState(defaultSignInValues);
  const { email, password } = values;

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();

    navigate("/settings");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signAuthUserWithEmailAndPassword(email, password);

      navigate("/settings");
      restoreDefaultValues();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-passowrd":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("User does not exists");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
  };

  return (
    <Box display="flex" flexDirection="column" gap={5} padding={10}>
      <h1>Already have an account?</h1>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={4}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
        </Stack>

        <Box
          display="flex"
          gap={5}
          marginTop={5}
          justifyContent="space-between"
        >
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendRoundedIcon />}
            size="small"
          >
            Sign in
          </Button>
          <Button
            onClick={signInWithGoogle}
            variant="contained"
            endIcon={<SendRoundedIcon />}
            size="large"
          >
            Google Sign in
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SignIn;
