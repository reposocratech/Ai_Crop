import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AICropContext } from '../../../context/AICropContext'
import { deleteLocalStorageAICrop } from '../../../helpers/localStorage/localStorageAICrop'
import "./navLateral.scss"

export const NavLateral = () => {

  const {user, setUser, isLogged, setIsLogged} = useContext(AICropContext);
  const navigate = useNavigate();

  const logout = () => {
    deleteLocalStorageAICrop()
    setUser();
    navigate('/')
    setIsLogged(false);
  }

  console.log(user, "user");

  // El nav lateral está pendiente al token para que la vista de user una vez accede al usuario
  // la parte de la izq (NAV) tiene una query diferente a la parte de la dcha(BLANCO). En la izq se va a hacer la query en base al token y en la derecha se va a hacer la query en base a la ruta
  return (
    <div className='nav_lateral'>
      <section className='me-4 d-flex flex-column align-items-center'>
      {/* AI CROP LOGO */}
      <div className='company me-2'>
        <img src='/assets/images/logo.png' alt='logo'/><h5 className='m-0 ms-2'>AI crop</h5>
      </div>
      {/* FOTO & NOMBRE USER */}
      <div className='profile_pic text-center'>
        <img alt='foto de perfil' src='/assets/images/default_pic.png'/>
        <h6>{user?.first_name} {user?.last_name}</h6>
      </div>
      {/* OPCIONES NAVBAR */}
      <div className='nav_options'>
        <a className='nav_option'>
          <img src='/assets/images/dashboard.png' alt='dashboard'/>
          <p className='option'>Dashboard</p>
        </a>
        <a className='nav_option'>
          <img src='/assets/images/logout.png' alt='dashboard'/>
          <p className='option'>Logout</p>
        </a>
        <a className='nav_option'>
          <img src='/assets/images/configuraciones.png' alt='configuracion'/>
          <p className='option'>Configuración</p>
        </a>
      </div>
      {/* CREAR NUEVO INVERNADERO / CULTIVO */}
      <div className='create_new'> 
        <p>Crear nuevo cultivo</p>
        <img/>
        <button>+</button>
      </div>
      </section>
    </div>
  )
}
