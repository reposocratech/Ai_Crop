import React, { useContext }  from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'
import { AICropContext } from '../../context/AICropContext';

export const HumedadCard = ({elem}) => {
  const navigate = useNavigate();
  const {user, setSelectedGreenhouse} = useContext(AICropContext);

  const onSubmit = () => {
    setSelectedGreenhouse(elem.greenhouse_id) // VIEJO
    navigate('greenhouse') // VIEJO
  }

  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
        <Card.Title>{elem.greenhouse_name}</Card.Title>
        <Card.Text>
            Titular del invernadero: {elem.owner_full_name}
            <br/>
            Alarmas activas: {elem.active_alarms}
        </Card.Text>
        <Button 
        variant="primary"
        onClick={onSubmit}>Go somewhere</Button>
        </Card.Body>
    </Card>
  )
}
