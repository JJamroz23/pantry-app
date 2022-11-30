import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";

const ProtectedRoute = () => {
  const { checked, logged } = useAuth();
  const navigate = useNavigate();

  console.log({
    checked,
    logged,
  });

  if (!checked) {
    console.log(1);
    return null;
  }

  if (!logged) {
    console.log(2);
    navigate("/");
    return;
  }
  console.log(3);
  return <Outlet />;
};

export default ProtectedRoute;
