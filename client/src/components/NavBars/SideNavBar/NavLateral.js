import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AICropContext } from '../../../context/AICropContext'
import { deleteLocalStorageAICrop } from '../../../helpers/localStorage/localStorageAICrop'
import { CreateCropModal } from '../../Crop/CreateCropModal'
import axios from 'axios'
import "./navLateral.scss";


export const NavLateral = () => {

  const {user, setUser, setIsLogged, actionReload} = useContext(AICropContext);
  const [showModalCrop, setShowModalCrop] = useState(false);
  const [greenhouseData, setGreenhouseData] = useState()
  const greenhouse_id = useParams().greenhouse_id;
  const navigate = useNavigate();
  

  useEffect(() => {
    if (greenhouse_id){
      axios
        .get(`http://localhost:4000/greenhouse/details/${(greenhouse_id)}`)
        .then((res)=>{
          setGreenhouseData(res.data.resultGreenhouse[0])
        })
        .catch((err)=>{
          console.log(err);
        })

    }

  }, [actionReload, greenhouse_id]);
  

  const openModalCrop = ()=>{
     setShowModalCrop(true);
  }

  const onLogOut = () => {
    deleteLocalStorageAICrop();
    setUser();
    navigate("/");
    setIsLogged(false);
  };

  let fotito = user?.user_photo;
  let noFoto = "/assets/images/default_pic.png";

  return (
    <div className='navLat_cont'>
      <section className='nav_lateral'>
      {/* AI CROP LOGO */}
      <div className='company me-2'onClick={()=>navigate('/')}>
        <img  src='/assets/images/logo.png' alt='logo'/><h5  className='m-0 ms-2'>AI crop</h5>
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
        {user.user_type === 2 && 
        <>
          {greenhouse_id ?
            <>
            {greenhouseData?.user_owner_id === user?.user_id &&
              <button className='create_crop' onClick={openModalCrop}>+</button>
            } 
            </>
          :
           <>
              <button className='create_crop' onClick={()=> navigate('createGreenhouse')}>+</button> 
            </>
          } 
        </>}
      </div>
      {/* CREAR NUEVO INVERNADERO / CULTIVO */}
      {user.user_type === 2 &&
      <>
        {greenhouse_id ?
          <> 
            {greenhouseData?.user_owner_id === user?.user_id &&
              <div className='create_new'> 
                <p>Crear nuevo cultivo</p>
                <img/>
                <button onClick={openModalCrop}>+</button>
              </div> 
            }
          </>
        :
          <>
            <div className='create_new'> 
              <p>Crear nuevo invernadero</p>
              <img/>
              <button onClick={()=> navigate('createGreenhouse')}>+</button>
            </div> 
          </> 
        }
      </>
      }

        {/* modal crop */}
        <CreateCropModal
          showModalCrop={showModalCrop}
          setShowModalCrop={setShowModalCrop}
        />
      </section>
    </div>
  );
};
