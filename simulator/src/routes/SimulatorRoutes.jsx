import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Error } from "../pages/dashboard/error/Error";
import { SimuladorApp } from "../components/SimuladorApp";
import { SimulatorContext } from "../context/SimulatorContext";
import "../components/style.scss";
import { Container } from "react-bootstrap";

export const SimulatorRoutes = () => {
  const { isLogged } = useContext(SimulatorContext);

  return (

    <Container fluid>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {isLogged && <Route path="/home" element={<SimuladorApp />} />}

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Container>

  );
};
