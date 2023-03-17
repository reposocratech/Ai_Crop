import React from 'react'
import { Col, Container, Nav, Navbar, NavDropdown, NavLink, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import "./topNavBar.scss" 

export const TopNavBar = () => {
    
    const navigate = useNavigate()

  return (
        <Navbar expand="lg" className='navbar_pPal'>
            {/* <Container> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle_navbar'/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="cont_navbar">
                <Nav.Link as={Link} to="/login" className='navbar_option'>LOGIN</Nav.Link>
                <Nav.Link as={Link} to="/" className='navbar_option'>INFO</Nav.Link>
                <Nav.Link as={Link} to="/" className='navbar_option'>CONTACTO</Nav.Link>
                <Nav.Link as={Link} to="/register" className='registro'>REGISTRO</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            {/* </Container> */}

        </Navbar>
      )
    }