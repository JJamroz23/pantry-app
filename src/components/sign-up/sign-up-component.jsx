import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/user-context";
import { useObjectState } from "../../hooks";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../input/input-component";

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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        {/* zron input cmp, ktory renderuje label i input  */}
        <FormInput
          label="Display name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Password Confirmation"
          type="password"
          required
          onChange={handleChange}
          name="passwordConfirmation"
          value={passwordConfirmation}
        />
        <button type="submit" onClick={handleSubmit}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
