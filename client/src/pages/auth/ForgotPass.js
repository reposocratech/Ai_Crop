import React, { useContext, useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TopNavBar } from '../../components/NavBars/TopNavBar/TopNavBar'
import { AICropContext } from '../../context/AICropContext'
import axios from 'axios'

import "./auth.scss" 



export const ForgotPass = () => {

    const [email, setEmail] = useState("");
    const [messageError, setMessageError] = useState("");
    const [messageValidation, setMessageValidation] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {;
        setEmail(e.target.value);
    }

    const handleKeyPress = (event) => {
      if (event.key === " ") {
        event.preventDefault();
      }
    };

    const handleSubmit = () => {
      // declaramos un patrón de email correcto
      const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
      if (!email){
          setMessageError("Debes rellenar el correo")
      } else if(!emailPattern.test(email)) {
        setMessageError("El email ingresado no es válido.")
      } else {
          axios
          .post("http://localhost:4000/user/retreivePassword", {email})
          .then((res)=> {
              setMessageValidation("Correo Enviado Correctamente!")
          })
          .catch((err)=>{
              console.log(err);
          }) 
      }
  }

  return (
    <div>
      <Row className='cont_auth d-flex flex-column p-0'>
        <TopNavBar/>
        <Form className='form'>
          <h5 className='company_name'>AI crop</h5>
          <div className='title'>
            <h1 className='mb-5 mt-5 forgotpasstitle'>Recupera tu contraseña <span className='punto ms-1'>.</span></h1>
          </div>
          <p className='ms-1'>¿Aún no te has registrado? <span className='etiq_login' onClick={()=>{navigate('../register')}}>Regístrate</span></p>

          <section className='form_registro'>

            <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">Email</label>
                  <input type="email" maxLength="50" 
                  name='email' 
                  value={email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  />
            </div>

            <article className='button_section'>
              <button onClick={()=>{navigate('../info')}}>Suscripciones</button>
              <button className='bg_verde' onClick={handleSubmit}>Validar correo</button>
            </article>
            <p className='text-center mt-3 text-danger'>{messageError}</p>

          </section>
            {messageValidation != "" &&
            <p className='messageValidation'>{messageValidation}</p>}
            
        </Form>
      </Row>
    </div>
  )
}
