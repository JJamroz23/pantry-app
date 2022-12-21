import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import Authentication from "../pages/auth/Authentication";
import Pantry from "../pages/pantry/Pantry";
import ShoppingList from "../pages/shoppingList/ShoppingList";
import ProductsSettings from "../pages/productsSettings/Settings";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Container>
      <Paper sx={{ minHeight: "70vh", p: 2, mt: 2 }}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route index element={<Authentication />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/settings" element={<ProductsSettings />} />
            <Route path="/pantry" element={<Pantry />} />
            <Route path="/shoppingList" element={<ShoppingList />} />
          </Route>
        </Routes>
      </Paper>
    </Container>
  );
};

export default AppRoutes;
