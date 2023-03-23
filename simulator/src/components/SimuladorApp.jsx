import React, { useState } from 'react'
import { FormularioSimulador } from './FormularioSimulador';

import './style.scss';
import { GreenhouseInfo } from './GreenhouseInfo';

export const SimuladorApp = () => {

    const [showGreenhouse, setShowGreenhouse] = useState(false);
    const [greenhouse_id, setGreenhouse_id] = useState();
    const [messageError, setMessageError] = useState("");

  return (
        <div className='simulator'>
            <FormularioSimulador
            setGreenhouse_id = {setGreenhouse_id}
            setShowGreenhouse = {setShowGreenhouse}
            messageError = {messageError}
            setMessageError = {setMessageError}
            />
            <div className='derecha'>
                <h1>Simulador de medidas <span className='punto ms-1'>.</span></h1>
                <section>
                    {showGreenhouse && 
                    <GreenhouseInfo
                    greenhouse_id = {greenhouse_id}
                    setGreenhouse_id = {setGreenhouse_id}
                    messageError = {messageError}
                    setMessageError = {setMessageError}
                    />}
                </section>
            </div>
        </div>
  )
}
