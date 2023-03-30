import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AICropContext } from '../../../context/AICropContext'
import { deleteLocalStorageAICrop } from '../../../helpers/localStorage/localStorageAICrop'
import { CreateCropModal } from '../../Crop/CreateCropModal'

import "./navLateral.scss"


export const NavLateral = () => {

 

  const {user, setUser, isLogged, setIsLogged} = useContext(AICropContext);

  const [showModalCrop, setShowModalCrop] = useState(false);
  

  const navigate = useNavigate();
  
  const greenhouse_id = useParams().greenhouse_id;
 
  

  const openModalCrop = ()=>{
     setShowModalCrop(true);
  }


  const onLogOut = () => {
    deleteLocalStorageAICrop()
    setUser();
    navigate('/')
    setIsLogged(false);
  }


  let fotito = user?.user_photo;
  let noFoto = "/assets/images/default_pic.png";



  // El nav lateral está pendiente al token para que la vista de user una vez accede al usuario
  // la parte de la izq (NAV) tiene una query diferente a la parte de la dcha(BLANCO). En la izq se va a hacer la query en base al token y en la derecha se va a hacer la query en base a la ruta
  return (
    <div className='navLat_cont'>
      <section className='nav_lateral'>
      {/* AI CROP LOGO */}
      <div className='company me-2'>
        <img onClick={()=>navigate('/')} src='/assets/images/logo.png' alt='logo'/><h5 onClick={()=>navigate('/')} className='m-0 ms-2'>AI crop</h5>
      </div>
      {/* FOTO & NOMBRE USER */}
      <div className='profile_pic text-center'>
        <img alt='foto de perfil' src={ fotito === null ? ` ${noFoto} `:`/images/user/${fotito}`}/>
        <h6>{user?.first_name} {user?.last_name}</h6>
      </div>
      {/* OPCIONES NAVBAR */}
      <div className='nav_options'>
        <a className='nav_option'onClick={()=>navigate('/user')}>
          <img src='/assets/images/dashboard.png' alt='dashboard'/>
          <p className='option' >Dashboard</p>
        </a>
        <a className='nav_option'onClick={onLogOut}>
          <img src='/assets/images/logout.png' alt='dashboard'/>
          <p className='option' >Logout</p>
        </a>
        <a className='nav_option' onClick={() =>navigate('edit')}>
          <img src='/assets/images/configuraciones.png' alt='configuracion'/>
          <p className='option'>Configuración</p>
        </a>
        {!greenhouse_id ?
        <button className='create_crop' onClick={()=> navigate('createGreenhouse')}>+</button> :
        <button className='create_crop' onClick={openModalCrop}>+</button>
        } 
      </div>
      {/* CREAR NUEVO INVERNADERO / CULTIVO */}
      {!greenhouse_id ? 
      <div className='create_new'> 
        <p>Crear nuevo invernadero</p>
        <img/>
        <button onClick={()=> navigate('createGreenhouse')}>+</button>
      </div> 
      :
      <div className='create_new'> 
        <p>Crear nuevo cultivo</p>
        <img/>
        <button onClick={openModalCrop}>+</button>
      </div>
      } 

       {/* modal crop */}
       <CreateCropModal showModalCrop={showModalCrop} setShowModalCrop={setShowModalCrop}
       
       />
      
      </section>
    </div>
  )
}
