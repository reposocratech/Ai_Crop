import React, { useContext } from "react";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AICropContext } from "../../../context/AICropContext";
import { deleteLocalStorageAICrop } from "../../../helpers/localStorage/localStorageAICrop";

import "./topNavBar.scss";

export const TopNavBar = () => {
  const isHome = window.location.pathname == "/";
  const isLogin = window.location.pathname == "/login";
  const isContact = window.location.pathname == "/contact";
  const isInfo = window.location.pathname == "/info";

  const { user, setUser, token, setIsLogged } = useContext(AICropContext);

  const navigate = useNavigate();

  const onLogOut = () => {
    deleteLocalStorageAICrop();
    setUser();
    navigate("/");
    setIsLogged(false);
  };

  return (
    <Navbar expand="lg" className="navbar_pPal">
      <NavbarBrand className="mx-auto order-0"></NavbarBrand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="toggle_navbar order-md-0 order-0"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        {!user ? (
          // EL USER NO ESTÁ LOGGEADO
          <Nav className="cont_navbar ">
            {isLogin ? (
              <Nav.Link as={Link} to="/register" className="navbar_option">
                REGISTER
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="navbar_option">
                LOGIN
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/info" className="navbar_option">
              INFO
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="navbar_option">
              CONTACTO
            </Nav.Link>
            {isHome ? (
              <Nav.Link as={Link} to="/register" className="registro">
                REGISTRO
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/" className="registro">
                HOME
              </Nav.Link>
            )}
          </Nav>
        ) : (
          // EL USER ESTÁ LOGGEADO
          <Nav className="cont_navbar ">
            <Nav.Link as={Link} to="/user" className="navbar_option">
              USER
            </Nav.Link>
            {isInfo ? (
              <Nav.Link as={Link} to="/" className="navbar_option">
                HOME
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/info" className="navbar_option">
                INFO
              </Nav.Link>
            )}
            {isContact ? (
              <Nav.Link as={Link} to="/" className="navbar_option">
                HOME
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/contact" className="navbar_option">
                CONTACTO
              </Nav.Link>
            )}
            <Nav.Link onClick={onLogOut} className="registro">
              LOGOUT
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
