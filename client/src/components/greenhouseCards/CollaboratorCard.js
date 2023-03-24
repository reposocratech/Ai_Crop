import React, { useContext }  from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'
import { AICropContext } from '../../context/AICropContext';
import "./greenhousecard.scss"
import { saveLocalStorageAICropGreenhouse } from '../../helpers/localStorage/localStorageAICrop';

export const CollaboratorCard = ({elem, setSelectedGreenhouse}) => {
  const navigate = useNavigate();
  const {user} = useContext(AICropContext);

  const onSubmit = () => {
    navigate('greenhouse')
  }

  return (
    <div onClick={onSubmit} className='cont_card_greenhouse'>
        <header className='card_header_colab'>
        </header>
        <div className='img_greenhouse'><img src='/assets/images/greenhouse.png'/></div>
        <main className='card_description'>
          <p className='title'>{elem.greenhouse_name}</p>
          <hr/>
          <p>Titular: {elem.owner_full_name}</p>
          <p>Alarmas activas: {elem.active_alarms}</p>
          {elem.active_alarms ?
          <div className='alerta_cont'><img className='alerta' src='/assets/images/alerta.png'/></div> :
          <div></div>}
        </main>
    </div>
  )
}
