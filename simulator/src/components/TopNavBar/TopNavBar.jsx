import React, { useContext } from "react";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SimulatorContext } from "../../context/SimulatorContext";
import { deleteLocalStorageSimulator } from "../../helpers/localStorage/localStorageSimulator";

import "./topNavBar.scss";

export const TopNavBar = () => {
  const navigate = useNavigate();
  const { setUser, isLogged, setIsLogged } = useContext(SimulatorContext);

  const onLogout = () => {
    deleteLocalStorageSimulator();
    setUser();
    setIsLogged(false);
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="navbar_pPal">
      <NavbarBrand className="mx-auto order-0"></NavbarBrand>
      <h1>
        Simulador de medidas <span className="punto ms-1">.</span>
      </h1>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="toggle_navbar order-md-0 order-0"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="cont_navbar ">
          {isLogged && (
            <a className="logout" onClick={onLogout}>
              LOGOUT
            </a>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
