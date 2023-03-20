import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLateral } from './NavLateral'
import { ShowCase } from './ShowCase'
import "./mainPage.scss"

// Cuando un usuario se loggea la vista principal es esta, con los componentes montados sobre el ShowCase

export const MainPage = () => {
  return (
    <Container fluid>
        <Row className='contNav_pPal'>
            <Col className='col-3 p-0'>
                <NavLateral/>
            </Col>
            <Col className='p-0 rounded-left aa'>
                <ShowCase/>
            </Col>
        </Row>
        </Container>
  )
}