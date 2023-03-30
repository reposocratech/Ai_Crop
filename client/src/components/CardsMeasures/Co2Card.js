import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';

export const Co2Card = ({co2}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const {userAlarms} = useContext(AICropContext)

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms?.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 2){
          setAlarm(true)
          found = true;
        } 
      }
    }, [])

  return (
    <div className='measure_cardCont'>
        {alarm &&
        <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
        <div className='co2_card responsive_card' onClick={()=>navigate(`${co2.measurement_type_id}`)}>
            <img src='/assets/images/cards/co2.png' className='responsive_img'/>
            <div className='cuadro'><p>{co2.measure_value} pm</p></div>
          {/* {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>} */}
        </div>
        <hr/>
    </div>
  )
}
