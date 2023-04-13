import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import Popover from '@mui/material/Popover';
import "./greenhousecard.scss";
import { ConfirmationGreenModal } from './ConfirmationGreenModal';
import axios from 'axios';

export const OwnerCard = ({elem}) => {
  const navigate = useNavigate();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const {user, setActionReload, actionReload} = useContext(AICropContext);

  const onSubmit = () => {
    navigate(`greenhouse/${elem.greenhouse_id}`)
    setActionReload(!actionReload);
  }
  
  // const handleModal = () => {
  //   setOpenConfirmModal(true);
  // }

  const onDeleteGh = () => {
    axios
      .get(`http://localhost:4000/greenhouse/deleteGreenhouse/${elem.greenhouse_id}`)
      .then((res)=>{
          navigate('/user');
          setOpenConfirmModal(false);
          setActionReload(!actionReload);
          
      })
      .catch((err)=>{
          console.log(err);
      })
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (!elem.active_alarms){
    elem.active_alarms = 0
  }

  return (
    <>
    {/* <ConfirmationGreenModal
      setOpenConfirmModal={setOpenConfirmModal}
      openConfirmModal={openConfirmModal}
      elem={elem}
    /> */}
    <div className='cont_card_greenhouse'>
        <header className='card_header'>
        </header>
        
        <div onClick={onSubmit} className='img_greenhouse'><img src='/assets/images/greenhouse.png'/></div>
        
        <main className='card_description'>
          <p className='title'>{elem.greenhouse_name}</p>
          <hr className='lineaGris'/>
          <p>Titular: {elem.owner_full_name}</p>
          <p>Alarmas activas: {elem.active_alarms}</p>
          
        
        </main>
          <section className='bottom_bots'>
          <img onClick={handleClick} className='delete'src='/assets/images/delete.png'/>
          {elem.active_alarms ?
          <img onClick={onSubmit} className='alerta' src='/assets/images/alerta.png'/> :
          
          <div className='alerta'></div>}
          </section>
    </div>
    <Popover
        className='popoverExitCollab'
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <section className='popover_sect'>
            <h4 className='paratext'>¿Quiere eliminar este invernadero?</h4>
          <article  className='botones_pop'>
              
              <img className='atras' onClick={handleClose} src='/assets/images/back1.png'/>
              <img onClick={onDeleteGh} src='/assets/images/deletegh.png'/>
              
          </article>
      </section>
      </Popover>
    </>
  )
}