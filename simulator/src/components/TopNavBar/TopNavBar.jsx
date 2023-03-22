import React from 'react'
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap'

import "./topNavBar.scss" 

export const TopNavBar = () => {
  
    const isHome = window.location.pathname == "/";
    const isLogin = window.location.pathname == "/login"

  return (
        <Navbar expand="lg" className='navbar_pPal'>
            <NavbarBrand className='mx-auto order-0'></NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle_navbar order-md-0 order-0'/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="cont_navbar ">
                {isLogin ?
                <a className='navbar_option'>REGISTER</a> : 
                <a className='navbar_option'>LOGIN</a>
                }
                <a className='navbar_option'>INFO</a>
                <a className='navbar_option'>CONTACTO</a>
                {isHome ? 
                <a className='registro'>REGISTRO</a> :
                <a className='registro'>HOME</a>
                }
            </Nav>
            </Navbar.Collapse>

        </Navbar>
      )
    }