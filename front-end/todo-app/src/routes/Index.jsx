import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Inicio from "../pages/Inicio";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import ListaTasks from "../pages/ListaTasks";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const Rotas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/tasks"
          element={
            <PrivateRoutes>
              <ListaTasks />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default Rotas;
