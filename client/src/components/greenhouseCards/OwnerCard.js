import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'
import { AICropContext } from '../../context/AICropContext';
import "./greenhousecard.scss"
import { saveLocalStorageAICropGreenhouse } from '../../helpers/localStorage/localStorageAICrop';
import axios from 'axios';
import { ConfirmationGreenModal } from './ConfirmationGreenModal';

export const OwnerCard = ({elem}) => {
  const navigate = useNavigate();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const {user, setActionReload, actionReload} = useContext(AICropContext);

  const onSubmit = () => {
    navigate(`greenhouse/${elem.greenhouse_id}`)
    setActionReload(!actionReload);
  }
  const handleSubmit5 = () => {
    setOpenConfirmModal(true);
  }

  if (!elem.active_alarms){
    elem.active_alarms = 0
  }


  return (
    <>
    <ConfirmationGreenModal
      setOpenConfirmModal={setOpenConfirmModal}
      openConfirmModal={openConfirmModal}
      elem={elem}
    />
    <div className='cont_card_greenhouse'>
        <header className='card_header'>
        </header>
        
        <div onClick={onSubmit} className='img_greenhouse'><img src='/assets/images/greenhouse.png'/></div>
        
        <main className='card_description'>
          <p className='title'>{elem.greenhouse_name}</p>
          <hr className='lineaGris'/>
          <p>Titular: {elem.owner_full_name}</p>
          <p>Alarmas activas: {elem.active_alarms}</p>
          
          <div onClick={handleSubmit5}><img className='delete'src='/assets/images/delete.png'/></div>
          {elem.active_alarms ?
          
          <div className='alerta_cont'><img className='alerta' src='/assets/images/alerta.png'/></div> :
          
          <div></div>}
        
        </main>
    </div>
    </>
  )
}