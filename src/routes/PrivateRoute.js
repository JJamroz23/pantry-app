import { useNavigate, Outlet } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import { useAuth } from "../hooks";

const PrivateRoute = () => {
  const { checked, logged } = useAuth();
  const navigate = useNavigate();

  console.log({
    checked,
    logged,
  });

  if (!checked) {
    return <FullPageLoader />;
  }

  if (!logged) {
    // console.log(2);
    navigate("/");
    return;
  }
  // console.log(3);
  return <Outlet />;
};

export default PrivateRoute;
