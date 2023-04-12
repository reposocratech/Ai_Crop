import React, { useContext }  from 'react'
import { useNavigate } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import "./greenhousecard.scss"


export const CollaboratorCard = ({elem}) => {
  const navigate = useNavigate();
  const {user} = useContext(AICropContext);

  const onSubmit = () => {
    navigate(`greenhouse/${elem.greenhouse_id}`)
  }

  if (!elem.active_alarms){
    elem.active_alarms = 0
  }

  return (
    <div className='cont_card_greenhouse'>
        <header className='card_header_colab'>
        </header>
        <div className='img_greenhouse' onClick={onSubmit} ><img src='/assets/images/greenhouse.png'/></div>
        <main className='card_description'>
          <p className='title'>{elem.greenhouse_name}</p>
          <hr className='lineaGris'/>
          <p>Titular: {elem.owner_full_name}</p>
          <p>Alarmas activas: {elem.active_alarms}</p>
          {elem.active_alarms ?
          <div className='alerta_cont'><img  onClick={onSubmit}  className='alerta' src='/assets/images/alerta.png'/></div> :
          <div></div>}
        </main>
    </div>
  )
}