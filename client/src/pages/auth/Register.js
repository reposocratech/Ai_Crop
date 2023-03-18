import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TopNavBar } from '../../components/TOPNavBar/TopNavBar'

import "./auth.scss" 

export const Register = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Row className='cont_auth d-flex flex-column p-0'>
          <TopNavBar/>
          <main className='form'>
          <h5 className='company_name'>AI crop</h5>
          <div className='title'>
            <h1 className='mb-5 mt-5'>Crear cuenta nueva<span className='punto ms-1'>.</span></h1>
          </div>
          <p className='ms-1'>¿Ya estás registrado? <a className='etiq_login' onClick={()=>navigate('/login')}>Log in</a></p>

          <section className='form_registro'>
            <article className='nombre_apell'>
            <div id="floatContainer" class="float-container">
                <label for="floatField">Nombre</label>
                <input id="floatField" type="text" maxlength="20"/>
            </div>
            <div id="floatContainer" class="float-container">
                <label for="floatField">Apellido</label>
                <input id="floatField" type="text" maxlength="25"/>
              </div>
            </article>
            <div id="floatContainer" class="float-container">
                <label for="floatField">Email</label>
                <input id="floatField" type="text" maxlength="30"/>
              </div>
            <div id="floatContainer" class="float-container">
                <label for="floatField" className='verde2'>Password</label>
                <input id="floatField" className='password' type="password" maxlength="25"/>
            </div>
            <article className='button_section'>
              <button>Suscripciones</button>
              <button className='verde'>Regístrate</button>
            </article>
          </section>
          </main>


      </Row>
    </div>
  )
}


 {/* <Row className=' cont_auth d-flex flex-column p-0'>
      <TopNavBar/>

        <Col className=' form col-12 col-lg-7 d-flex flex-column'>
                <div className='title m-0'>
            <h1 className='m-0 mb-5 mt-5'>Crear una cuenta nueva<span className='punto m-0'>.</span></h1>
            </div>
            <p>¿Ya estás registrado? <a className='etiq_login'>Log in</a></p>


            <Col className='form_registro col-12 row d-flex'>

              <div id="floatContainer " class="float-container col-lg-4 me-2">
                    <label for="floatField">Nombre</label>
                    <input id="floatField" type="text" maxlength="20"/>
              </div>
              <div id="floatContainer"  class="float-container col-lg-4">
                    <label for="floatField">Nombre</label>
                    <input id="floatField" type="text" maxlength="20"/>
              </div>
              <div id="floatContainer" class="float-container col-lg-9">
                  <label for="floatField">Email</label>
                  <input id="floatField" type="email" maxlength="20"/>
            </div>
              <div id="floatContainer" class="float-container col-lg-10">
                  <label for="floatField">Password</label>
                  <input id="floatField" type="password" maxlength="20" className='password'/>
            </div>
            </Col>

            {/* <Col className='form_registro col-12 mt-4 input_feo  '>
            <div id="floatContainer" class="float-container  ">
                  <label for="floatField">Nombre</label>
                  <input id="floatField" type="text" maxlength="20"/>
            </div>
            </Col> */}

            // </Col>

            // </Row>