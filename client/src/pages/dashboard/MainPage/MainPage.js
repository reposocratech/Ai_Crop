import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLateral } from '../../../components/NavBars/SideNavBar/NavLateral'
import { Outlet } from 'react-router-dom'
import "./mainPage.scss"

// Cuando un usuario se loggea la vista principal es esta, con las páginas "hijas" de User en el Outlet

// VISTA PRINCIPAL DE USUARIO / MAINPAGE == VISTA DE TODOS SUS INVERNADEROS
export const MainPage = () => {
  return (
    <Container fluid className='p-0'>
        <Row className='contNav_pPal'>
            <Col className='col-12 col-xl-3 p-0'>
              {/* {user_type == 1} */}
                <NavLateral/>
            </Col>
            <Col className='col-12 col-xl-9 p-0 outlet_cont'>
              <div className="white_cont p-5">
                  <Outlet/>
              </div>
            </Col>
        </Row>
    </Container>
  )
}