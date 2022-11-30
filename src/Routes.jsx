import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/authentication/authentication-component";
import Navigation from "./routes/navigation/navigation-component";
import ProductsSettings from "./routes/products-settings/settings-component";
import ProtectedRoute from "./utils/protected-route/protected-route";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Authentication />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/settings" element={<ProductsSettings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
