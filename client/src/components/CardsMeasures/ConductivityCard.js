import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';

export const ConductivityCard = ({conductividad}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const {userAlarms, actionReload, setActionReload} = useContext(AICropContext)

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms?.length && !found ; i++){
        if (userAlarms[i].measurement_type_id === 6){
          setAlarm(true)
          found = true;
        } 
      }
    }, [actionReload])
  return (
    <div className='measure_cardCont'>
      {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
    <div className='conductivity_card responsive_card' onClick={()=>navigate(`${conductividad?.measurement_type_id}`)}>
        <h3>CONDUCTIVIDAD</h3>
        <div className='conductivity_body'>
            <div className='cuadro'>
                <p>{conductividad?.measure_value} ms/cm</p>
            </div>
            <img src='/assets/images/cards/energia.png' className='responsive_img'/>
            {/* {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>} */}
        </div>
    </div>
    <hr/>
</div>
  )
}
