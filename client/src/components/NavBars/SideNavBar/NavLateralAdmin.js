import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AICropContext } from '../../../context/AICropContext';
import { deleteLocalStorageAICrop } from '../../../helpers/localStorage/localStorageAICrop';
import './navLateral.scss'

export const NavLateralAdmin = () => {
  
  const {user, setUser, isLogged, setIsLogged} = useContext(AICropContext);
  
  const navigate = useNavigate();

  const onLogOut = () => {
    deleteLocalStorageAICrop()
    setUser();
    navigate('/')
    setIsLogged(false);
  }


  let fotito = user?.user_photo;
  let noFoto = "/assets/images/default_pic.png";
  
  
  
  return (
    <div className='navLat_cont'>
      <section className='nav_lateral'>
      {/* AI CROP LOGO */}
      <div className='company me-2'onClick={()=>navigate('/')} >
        <img src='/assets/images/logo.png' alt='logo'/><h5 className='m-0 ms-2'>AI crop</h5>
      </div>
      {/* FOTO & NOMBRE USER */}
      <div className='profile_pic text-center'>
        <img alt='foto de perfil' src={ fotito === null ? ` ${noFoto} `:`/images/user/${fotito}`}/>
        <h6>{user?.first_name} {user?.last_name}</h6>
      </div>
      {/* OPCIONES NAVBAR */}
      <div className='nav_options'>
        {/* <a className='nav_option'>
          <img src='/assets/images/dashboard.png' alt='dashboard'/>
          <p className='option' onClick={()=>navigate('/user/admin')}>Dashboard</p>
        </a> */}
        <div className='nav_option'href='#' onClick={onLogOut}>
          <img src='/assets/images/logout.png' alt='dashboard'/>
          <p className='option' >Logout</p>
        </div>
        {/* <a className='nav_option'>
          <img src='/assets/images/configuraciones.png' alt='configuracion'/>
          <p className='option'onClick={() =>navigate('edit')} >Configuración</p>
        </a> */}
        {/* <button className='create_crop'>+</button> */}
      </div>
    </section>
  </div>
  )
}
