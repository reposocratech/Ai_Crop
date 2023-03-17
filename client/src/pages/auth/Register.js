import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { TopNavBar } from '../../components/TOPNavBar/TopNavBar'

import "./auth.scss" 

export const Register = () => {
  return (
    <Row className='cont_auth'>
        <TopNavBar/>
        <Col className='form'>
            <div className='d-flex title'>
            <h1 className='m-0'>Crear una cuenta nueva<span className='punto'>.</span></h1>
            </div>
            <p>¿Ya estás registrado? <span className='etiq_login'>Log in</span></p>
            <section className='form_registro'>
              <input/>
            </section>
        </Col>
    </Row>
  )
}
