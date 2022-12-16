import { useNavigate, Outlet } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import { useAuth } from "../hooks";

const PrivateRoute = () => {
  const { checked, logged } = useAuth();
  const navigate = useNavigate();

  if (!checked) {
    return <FullPageLoader />;
  }

  if (!logged) {
    navigate("/");
    return;
  }

  return <Outlet />;
};

export default PrivateRoute;
