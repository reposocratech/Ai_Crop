import React, { useContext, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { saveLocalStorageAICrop } from '../../helpers/localStorage/localStorageAICrop'
import axios from 'axios'

import "./auth.scss" 

const initialValue = {
  email: "",
  password: ""
}

export const Login = (setIsLogged) => {
  const [login, setLogin] = useState(initialValue)
  const [messageError, setMessageError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLogin({...login, [name]:value})
  }

  const handleSubmit = () => {
    if (!login.email || !login.password){
      setMessageError("Debes rellenar todos los campos")
    } else{
      axios
      .post("http://localhost:4000/user/login", login)
        .then((res)=> {
          saveLocalStorageAICrop(res.data.token)
          // setUser(res.data.user)
          setIsLogged(true)

          navigate('/');
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  }

  return (
    <div>
      <Row className='cont_auth d-flex flex-column p-0'>
        <main className='form'>
          <h5 className='company_name'>AI crop</h5>
          <div className='title'>
            <h1 className='mb-5 mt-5'>Login<span className='punto ms-1'>.</span></h1>
          </div>
          <p className='ms-1'>¿Aún no te has registrado? <span className='etiq_login' onClick={()=>navigate('/register')}>Regístrate</span></p>

          <section className='form_registro'>

            <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">Email</label>
                  <input type="text" maxLength="30" 
                  name='email' 
                  value={login.email}
                  onChange={handleChange}
                  />
            </div>

            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField" className='verde2'>Password</label>
                <input className='password' type="password" maxLength="25" 
                name='password' 
                value={login.password}
                onChange={handleChange}
                />
            </div>

            <article className='button_section'>
              <button>Suscripciones</button>
              <button className='bg_verde' onClick={handleSubmit}>Login</button>
            </article>
            <p className='text-center mt-3 text-danger'>{messageError}</p>

            <p className='ms-1 mt-5'>¿Olvidaste la contraseña? <span className='etiq_login' href='#'>Recupérala</span></p>

          </section>
        </main>
      </Row>
    </div>
  )
}