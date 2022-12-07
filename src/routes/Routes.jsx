import { Route, Routes } from "react-router-dom";
import Navigation from "../components/NavBar";
import Authentication from "../pages/auth/Authentication";
import PantryComponent from "../pages/pantry/Pantry";
import ProductsSettings from "../pages/productsSettings/Settings";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route element={<PublicRoute />}>
          <Route index element={<Authentication />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/settings" element={<ProductsSettings />} />
          <Route path="/pantry" element={<PantryComponent />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
