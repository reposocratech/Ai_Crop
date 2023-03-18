import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { TopNavBar } from '../../components/TOPNavBar/TopNavBar'
import { About } from './about/About'
import "./home.scss" 

export const Home = () => {
  return (
    <div>
    {/* SECCIÓN PRINCIPAL */}
    <Row className='contHome d-flex flex-column justify-content-end'>
        {/* NAVBAR */}
        <TopNavBar/>

        {/* HEADER */}
        <Col className='header'>
            <img alt='nsda' src='/assets/images/logo.png' className='logo'/>
            <h1 className='title m-0'>AI CROP</h1>

            <h3 className='mt-3'>Contamos con una tecnología segura aplicada a cultivos hidropónicos.</h3>
            <button className='mt-5 mb-5' href="about" >CONÓCENOS</button>

            {/* REDES */}
            <section className='rrss mb-5'>
                <p className='m-0'>Follow us</p>
                <img alt='facebook' src='/assets/images/facebook.png'/>
                <img alt='linkedin' src='/assets/images/linkedin.png'/>
                <img alt='instagram' src='/assets/images/instagram.png'/>
                <img alt='twitter' src='/assets/images/twitter.png'/>
            </section>
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
