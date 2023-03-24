import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'
import { AICropContext } from '../../context/AICropContext';
import "./greenhousecard.scss"

export const OwnerCard = ({elem}) => {
  const navigate = useNavigate();
  const {user, setSelectedGreenhouse} = useContext(AICropContext);

  const onSubmit = () => {
    navigate(`${elem.greenhouse_id}`)
  }

  return (
    <div onClick={onSubmit} className='cont_card_greenhouse'>
        <header className='card_header'>
        </header>
        <div className='img_greenhouse'><img src='/assets/images/greenhouse.png'/></div>
        <main className='card_description'>
          <p className='title'>{elem.greenhouse_name}</p>
          <hr className='lineaGris'/>
          <p>Titular: {elem.owner_full_name}</p>
          <p>Alarmas activas: {elem.active_alarms}</p>
          {elem.active_alarms ?
          <div className='alerta_cont'><img className='alerta' src='/assets/images/alerta.png'/></div> :
          <div></div>}
        </main>
    </div>
  )
}