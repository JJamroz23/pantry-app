import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/user-context";
import { useObjectState } from "../../hooks";

import {
  createUserDocumentFromAuth,
  signAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../input/input-component";

const defaultSignInValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { values, restoreDefaultValues, setValue } =
    useObjectState(defaultSignInValues);
  const { email, password } = values;
  const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    // TODO:
    // trycatch dodaj z obslua bledu
    const { user } = await signInWithGooglePopup();
    setCurrentUser(user);
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
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
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <button type="submit">Sign in</button>
          <button onClick={signInWithGoogle}>Google Signin</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
