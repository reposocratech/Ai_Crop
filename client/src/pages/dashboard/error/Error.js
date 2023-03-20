import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { TopNavBar } from '../../../components/TOPNavBar/TopNavBar'
import './error.scss'

export const Error = () => {
  return (
    <div>
        <Row className='error d-flex flex-column justify-content-end'>
            <TopNavBar/>
            <Col className='main d-flex flex-column justify-content-center align-items-center'>
            <div className='title text-center'>
            <h1>Error</h1>
            <h2>La página que está buscando no existe</h2>
            </div>
            </Col>
        </Row>
    </div>
  )
}
