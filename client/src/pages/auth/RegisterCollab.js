import axios from 'axios';
import React, { useState } from 'react'
import {Form, Row} from 'react-bootstrap';
import { TopNavBar } from '../../components/NavBars/TopNavBar/TopNavBar';
import { useNavigate, useParams } from 'react-router-dom';

import "./auth.scss" 
import { Countries } from './lists/Countries';



export const RegisterCollab = () => {
  
  const greenhouse_id = useParams().greenhouse_id;

 
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
    user_photo: "",
    user_type: 3,
    greenhouse_id: greenhouse_id
}
  const [register, setRegister] = useState(initialValue);
  const [messageError, setMessageError] = useState();
  const [emailValidation, setEmailValidation] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    setMessageError("");
  };
  
  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleBlur = () => {
    let string = register.email
    if (!string.includes("@") || !string.includes(".")){
      setMessageError("El correo no es correcto")
    } else {
      setMessageError("")
      setEmailValidation(true)
    }
  }

  const handleSubmit = () => {
    
    if (
      !register.first_name ||
      !register.last_name ||
      !register.email ||
      !register.password ||
      !register.country ||
      !register.city ||
      !register.phone ||
      !register.user_knowledge
    ) {
      setMessageError("Debes rellenar todos los campos");
    } else if (!emailValidation) {
      setMessageError("El correo no es correcto");
    }
     else {
      axios
        .post("http://localhost:4000/user/createUser", register)
        .then((res) => {
          console.log(res.data);
          navigate("/login");
          setMessageError("");
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            setMessageError("Correo duplicado");
            console.log(err.response.data?.error.errno);
          } else {
            setMessageError("Error en el registro");
          }
        });
    }
  };

  return (

    <div className='PpalColl'>
    <Row className='cont_auth d-flex flex-column p-0'>
      <TopNavBar/>
      <main className='registro-form form_registro d-flex  flex-column ms-5'>
        <div className='title m-0'>
        <h1 className='title'>Bienvenido Colaborador/a <span className='punto'>.</span></h1>
        </div>
      <article className='nombre_apell'>
        <div className='float-container'>
            <label>Nombre</label>
            <input 
              type="text" maxLength="20"
              value={register.first_name}
              onChange={handleChange}
              name='first_name'
            />
        </div>
        <div className='float-container'>
            <label>Apellidos</label>
            <input 
              type="text" maxLength="25"
              value={register.last_name}
              onChange={handleChange}
              name="last_name"
            />
        </div>
        </article>
        <article className='nombre_apell'>
        <div className='float-container'>

          <label>Email</label>
          <input
            type="email"
            maxLength="35"
            required
            value={register.email}
            onChange={handleChange}
            name="email"
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
          />

        </div>
        <div className='float-container'>

          <label>Contraseña</label>
          <input
            type="password"
            maxLength="25"
            required
            value={register.password}
            onChange={handleChange}
            name="password"
          />

        </div>
        </article>
        <article className='nombre_apell'>
        <div className='float-container'>

          <label>Telefono</label>
          <input
            type="tel"
            maxLength="12"
            required
            value={register.phone}
            onChange={handleChange}
            name="phone"
            onKeyPress={handleKeyPress}
          />

        </div>
        <div className='float-container'> 

          <label>Ciudad</label>
          <input
            type="text"
            maxLength="80"
            required
            value={register.city}
            onChange={handleChange}
            name="city"
          />

        </div>
        </article>
        <article className='nombre_apell'>

          <div id="floatContainer" className="float-container">
            <label htmlFor="countries">País</label>
            <select id="countries" className='select_form'
            required 
            name='country' 
            value={register.country}
            onChange={handleChange}>
              <Countries/>
            </select>
          </div>

          <div id="floatContainer" className="float-container">
            <label htmlFor="floatField">Conocimientos previos</label>
            <select id="countries" className='select_form'
            required
            name='user_knowledge'
            value={register.user_knowledge}
            onChange={handleChange}>
              <option></option>
              <option value="Agricultor tradicional">Agricultor tradicional</option>
              <option value="Técnico en agricultura tradicional">Técnico en agricultura tradicional</option>
              <option value="Técnico en agricultura hidropónica">Técnico en agricultura hidropónica</option>
              <option value="Ingeniero agrónomo especializado en hidroponía">Ingeniero agrónomo especializado en hidroponía</option>
            </select>
          </div>

        </article>

        <div className='button_section'>
            <button className="bg_verde" onClick={handleSubmit}>Aceptar</button>
        </div>
        <p className='mensajeError'>{messageError}</p>
      </main>
    </Row>
  </div>
  )
}


