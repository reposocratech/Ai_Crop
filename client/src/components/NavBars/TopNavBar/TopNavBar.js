import React from 'react'
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import "./topNavBar.scss" 

export const TopNavBar = () => {
  
    const isHome = window.location.pathname == "/";
    const isLogin = window.location.pathname == "/login"

    // console.log(isHome)

  return (
        <Navbar expand="lg" className='navbar_pPal'>
            <NavbarBrand className='mx-auto order-0'></NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle_navbar order-md-0 order-0'/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="cont_navbar ">
                {isLogin ?
                <Nav.Link as={Link} to="/register" className='navbar_option'>REGISTER</Nav.Link> : 
                <Nav.Link as={Link} to="/login" className='navbar_option'>LOGIN</Nav.Link>
                }
                <Nav.Link as={Link} to="/info" className='navbar_option'>INFO</Nav.Link>
                <Nav.Link as={Link} to="/contact" className='navbar_option'>CONTACTO</Nav.Link>
                {isHome ? 
                <Nav.Link as={Link} to="/register" className='registro'>REGISTRO</Nav.Link> :
                <Nav.Link as={Link} to="/" className='registro'>HOME</Nav.Link>
                }
            </Nav>
            </Navbar.Collapse>

        </Navbar>
      )
    }