import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'
import { AICropContext } from '../../context/AICropContext';

export const Co2Card = ({co2}) => {
  const navigate = useNavigate();
  const {user, setSelectedGreenhouse} = useContext(AICropContext);

  const onSubmit = () => {
    // setSelectedGreenhouse(elem.greenhouse_id); // VIEJO
    navigate('greenhouse') // VIEJO
  }

  return ( 
    "ad"
 )

}
