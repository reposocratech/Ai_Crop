import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { TopNavBar } from '../../components/NavBars/TopNavBar/TopNavBar'
import { About } from './about/About'
import "./home.scss" 

export const Home = () => {

  return (
    <div className='home'>
    {/* SECCIÓN PRINCIPAL */}
    <Row className='contHome d-flex flex-column justify-content-end'>
        {/* NAVBAR */}
        <TopNavBar/>

        {/* HEADER */}
        <Col className='header'>
            <img alt='logo' src='/assets/images/logo.png' className='logo'/>
            <h1 className='title m-0'>AI CROP</h1>

            <h3 className='mt-3'>Contamos con una tecnología segura aplicada a cultivos hidropónicos.</h3>
            <a href="#about"><button className='mt-5 mb-5'>CONÓCENOS</button></a>
        </Col>
    </Row>

    {/* SECCIÓN INFORMACIÓN */}
    <Row className='about_us'>
        <div className='transition'></div>
        <About/>
    </Row> 
    </div>
  )
}
