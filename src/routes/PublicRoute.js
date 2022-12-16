import { useNavigate, Outlet } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import { useAuth } from "../hooks";

const PublicRoute = () => {
  const { checked, logged } = useAuth();
  const navigate = useNavigate();

  if (!checked) {
    return <FullPageLoader />;
  }

  if (logged) {
    navigate("/settings");
    return;
  }

  return <Outlet />;
};

export default PublicRoute;
