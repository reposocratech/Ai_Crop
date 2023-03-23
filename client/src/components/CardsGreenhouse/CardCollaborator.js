import React from 'react'
import { Button, Card } from 'react-bootstrap'

export const CardCollaborator = ({index, elem, info}) => {
  return (
    <Card style={{ width: '18rem' }} key={index}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>{elem.greenhouse_name}</Card.Title>
      <Card.Text>
        Titular del invernadero: {elem.owner_full_name}
        Alarmas activas: {elem.active_alarms}
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
  )
}
