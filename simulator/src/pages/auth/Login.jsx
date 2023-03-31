import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveLocalStorageSimulator } from '../../helpers/localStorage/localStorageSimulator'
import { SimulatorContext } from '../../context/SimulatorContext'
import axios from 'axios'

import "./auth.scss" 
import { Row } from 'react-bootstrap'

const initialValue = {
  email: "",
  password: ""
}

export const Login = () => {
  const [login, setLogin] = useState(initialValue)
  const [messageError, setMessageError] = useState("")

  const navigate = useNavigate();
  const aicrop = "http://localhost:3000/"

  const {setIsLogged, isLogged, token} = useContext(SimulatorContext)

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
          saveLocalStorageSimulator(res.data.token)
          setIsLogged(true)
          navigate('/home');
        })
        .catch((err)=>{
          setMessageError("Credenciales incorrectas")
          console.log(err);
        })
    }
  }

  return (
      <Row className='cont_auth d-flex flex-column p-0'>
        <main className='form'>
          <h2 className='company_name'>AI crop</h2>
          <div className='title'>
            <h1 className='mb-5 mt-5'>Login <span className='punto ms-1'>_</span> ( simulador )</h1>
          </div>

          <section className='form_registro'>

            <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">Email</label>
                  <input type="text" maxLength="50" 
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
              <button className='bg_verde' onClick={handleSubmit}>Login</button>
              <a href={aicrop}>Ir a Web principal</a>
            </article>
            <p className='text-center mt-3 text-danger'>{messageError}</p>

          </section>
        </main>
      </Row>
  )
}
