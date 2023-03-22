import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { FormularioSimulador } from './FormularioSimulador';

import './style.scss';
import { GreenhouseInfo } from './TopNavBar/GreenhouseInfo';

export const SimuladorApp = () => {

    const [showGreenhouse, setShowGreenhouse] = useState(false);
    const [greenhouse_id, setGreenhouse_id] = useState();

  return (
        <Col className='form'>
            <FormularioSimulador
            setGreenhouse_id = {setGreenhouse_id}
            setShowGreenhouse = {setShowGreenhouse}
            />
            <div className='title'>
                <h1 className='mb-5 mt-5'>Simulador de medidas <span className='punto ms-1'>.</span></h1>
                {showGreenhouse && 
                <GreenhouseInfo
                greenhouse_id = {greenhouse_id}
                setGreenhouse_id = {setGreenhouse_id}
                />}
            </div>
        </Col>
  )
}
