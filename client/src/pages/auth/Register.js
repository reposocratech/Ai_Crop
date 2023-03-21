import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TopNavBar } from '../../components/NavBars/TopNavBar/TopNavBar'
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
          <p className='ms-1'>¿Ya estás registrado? <span className='etiq_login' onClick={()=>navigate('/login')}>Log in</span></p>

          <section className='form_registro'>

            <article className='nombre_apell'>
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Nombre</label>
                <input type="text" maxLength="20" required 
                name='first_name' 
                value={register.first_name}
                onChange={handleChange}
                />
            </div>
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Apellido</label>
                <input type="text" maxLength="25" required 
                name='last_name' 
                value={register.last_name}
                onChange={handleChange}
                />
            </div>
            </article>

            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Email</label>
                <input type="email" maxLength="30" required 
                name='email' 
                value={register.email}
                onChange={handleChange}
                />
            </div>

            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField" className='verde2'>Password</label>
                <input className='password' type="password" maxLength="25" required
                name='password' 
                value={register.password}
                onChange={handleChange}
                />
            </div>

            <article className='button_section'>
              <button>Suscripciones</button>
              <button className='bg_verde' onClick={handleSubmit}>Regístrate</button>
            </article>
            <p className='text-center mt-3 text-danger'>{messageError}</p>

          </section>
          </main>


      </Row>
    </div>
  )
}