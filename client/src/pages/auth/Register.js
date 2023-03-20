import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TopNavBar } from '../../components/TOPNavBar/TopNavBar'
import axios from 'axios'

import "./auth.scss" 

const initialValue = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    dni: "",
    phone: "",
    address: "",
    post_code: "",
    city: "",
    country: "",
    user_knowledge: "",
    user_photo: "default_pic.png"
}

export const Register = () => {

  const [register, setRegister] = useState(initialValue)
  const [messageError, setMessageError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegister({...register, [name]:value})
  }

  const handleSubmit = () => {
    if(!register.first_name || !register.last_name || !register.email || !register.password){
      setMessageError("Debes rellenar todos los campos")
    } else {
      
    }
  }

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
                <input id="floatField" type="text" maxlength="20" required 
                name='first_name' 
                value={register.first_name}
                onChange={handleChange}
                />
            </div>
            <div id="floatContainer" class="float-container">
                <label for="floatField">Apellido</label>
                <input id="floatField" type="text" maxlength="25" required 
                name='last_name' 
                value={register.last_name}
                onChange={handleChange}
                />
            </div>
            </article>

            <div id="floatContainer" class="float-container">
                <label for="floatField">Email</label>
                <input id="floatField" type="email" maxlength="30" required 
                name='email' 
                value={register.email}
                onChange={handleChange}
                />
            </div>

            <div id="floatContainer" class="float-container">
                <label for="floatField" className='verde2'>Password</label>
                <input id="floatField" className='password' type="password" maxlength="25" required
                name='password' 
                value={register.password}
                onChange={handleChange}
                />
            </div>

            <article className='button_section'>
              <button>Suscripciones</button>
              <button className='bg_verde' onClick={handleSubmit}>Regístrate</button>
              <p>{messageError}</p>
            </article>

          </section>
          </main>


      </Row>
    </div>
  )
}