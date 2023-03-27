import axios from 'axios';
import React, { useState } from 'react'
import {Row} from 'react-bootstrap';
import { TopNavBar } from '../../components/NavBars/TopNavBar/TopNavBar';
import { useNavigate, useParams } from 'react-router-dom';

import "./auth.scss" 

const greenhouse_id = useParams().greenhouse_id;

export const RegisterCollab = () => {
  
  const greenhouse_id = useParams().greenhouse_id;

  

  const [register, setRegister] = useState(initialValue);
  const [messageError, setMessageError] = useState();

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

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
    } else {
      axios
        .post("http://localhost:4000/user/createUser", register)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data?.error.errno === 1062) {
            setMessageError("email duplicado");
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
      <section className='registro-form form_registro d-flex  flex-column ms-5'>
        <div className='title m-0'>
        <h1 className='title'>Bienvenido Colaborador/a <span className='punto'>.</span></h1>
        </div>
      <article className='nombre_apell'>
        <div className='float-container'>
            <label>Nombre</label>
            <input 
                type="text" maxLength="20"
                placeholder='Nombre'
                value={register.first_name}
                onChange={handleChange}
                name='first_name'
            />
        </div>
        <div className='float-container'>
            <label>Apellidos</label>
            <input 
                type="text" maxLength="25"
                placeholder='Apellidos'
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
              placeholder="Email"
              value={register.email}
              onChange={handleChange}
              name="email"
            />

        </div>
        <div className='float-container'>

            <label>Contraseña</label>
            <input
              type="password"
              maxLength="25"
              required
              placeholder="Contraseña"
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
              type="text"
              maxLength="20"
              required
              placeholder="Telefono"
              value={register.phone}
              onChange={handleChange}
              name="phone"
            />

        </div>
        <div className='float-container'> 

            <label>Ciudad</label>
            <input
              type="text"
              maxLength="80"
              required
              placeholder="Ciudad"
              value={register.city}
              onChange={handleChange}
              name="city"
            />

        </div>
        </article>
        <article className='nombre_apell'>
        <div className='float-container'>

            <label>Pais</label>
            <input
              type="text"
              required
              placeholder="Pais"
              value={register.country}
              onChange={handleChange}
              name="country"
            />

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
                <p className='text-danger'>{messageError}</p>
            </div>
          </section>
    </Row>
  </div>
  )
}


