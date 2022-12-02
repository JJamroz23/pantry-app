import { Route, Routes } from "react-router-dom";
import Authentication from "../pages/auth/Authentication";
import Navigation from "../components/NavBar";
import ProductsSettings from "../pages/productsSettings/Settings";
import PrivateRoute from "./PrivateRoute";
import PantryComponent from "../pages/pantry/Pantry";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Authentication />} />
        <Route element={<PrivateRoute />}>
          <Route path="/settings" element={<ProductsSettings />} />
          <Route path="/pantry" element={<PantryComponent />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
