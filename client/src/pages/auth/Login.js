import React from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TopNavBar } from '../../components/TOPNavBar/TopNavBar'

import "./auth.scss" 

export const Login = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Row className='cont_auth d-flex flex-column p-0'>
        <TopNavBar/>
        <main className='form'>
          <h5 className='company_name'>AI crop</h5>
          <div className='title'>
            <h1 className='mb-5 mt-5'>Login<span className='punto ms-1'>.</span></h1>
          </div>
          <p className='ms-1'>¿Aún no te has registrado? <a className='etiq_login' onClick={()=>navigate('/register')}>Regístrate</a></p>

          <section className='form_registro'>
            <div id="floatContainer" class="float-container">
                  <label for="floatField">Email</label>
                  <input id="floatField" type="text" maxlength="30"/>
            </div>
            <div id="floatContainer" class="float-container">
                <label for="floatField" className='verde2'>Password</label>
                <input className='password' id="floatField" type="password" maxlength="25"/>
            </div>
            <article className='button_section'>
              <button>Suscripciones</button>
              <button className='verde'>Login</button>
            </article>
            <p className='ms-1 mt-5'>¿Olvidaste la contraseña? <a className='etiq_login'>Recupérala</a></p>
          </section>
        </main>
      </Row>
    </div>
  )
}
