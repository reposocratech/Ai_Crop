import React, { useContext, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TopNavBar } from '../../components/TOPNavBar/TopNavBar'
import axios from 'axios'

import "./auth.scss" 
import { saveLocalStorageAICrop } from '../../helpers/localStorage/localStorageAICrop'
import { AICropContext } from '../../context/AICropContext'

const initialValue = {
  email: "",
  password: ""
}

export const Login = () => {
  const [login, setLogin] = useState(initialValue)
  const [messageError, setMessageError] = useState("")
  const {user, setUser, isLogged, setIsLogged} = useContext(AICropContext)

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
        setUser(res.data.user)
        console.log("------", res.data.user, "------")
        const type = res.data.user.user_type;
        setIsLogged(true)
        type === 2 || type === 3 ?
          navigate('/user'):
            type === 1 ?
              navigate('/admin'):
                navigate('/')
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
        <main className='form'>
          <h5 className='company_name'>AI crop</h5>
          <div className='title'>
            <h1 className='mb-5 mt-5'>Login<span className='punto ms-1'>.</span></h1>
          </div>
          <p className='ms-1'>¿Aún no te has registrado? <a className='etiq_login' onClick={()=>navigate('/register')}>Regístrate</a></p>

          <section className='form_registro'>

            <div id="floatContainer" class="float-container">
                  <label for="floatField">Email</label>
                  <input id="floatField" type="text" maxlength="30" 
                  name='email' 
                  value={login.email}
                  onChange={handleChange}
                  />
            </div>

            <div id="floatContainer" class="float-container">
                <label for="floatField" className='verde2'>Password</label>
                <input className='password' id="floatField" type="password" maxlength="25" 
                name='password' 
                value={login.password}
                onChange={handleChange}
                />
            </div>

            <article className='button_section'>
              <button>Suscripciones</button>
              <button className='bg_verde' onClick={handleSubmit}>Login</button>
              <p>{messageError}</p>
            </article>

            <p className='ms-1 mt-5'>¿Olvidaste la contraseña? <a className='etiq_login'>Recupérala</a></p>

          </section>
        </main>
      </Row>
    </div>
  )
}
