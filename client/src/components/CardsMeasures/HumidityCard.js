import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';

export const HumidityCard = ({humedad}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const {userAlarms} = useContext(AICropContext)

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms?.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 3){
          setAlarm(true)
          found = true;
        } 
      }
    }, [])
  return (
    <div className='measure_cardCont'>
      {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
        <div className='humidity_card responsive_card' onClick={()=>navigate(`${humedad.measurement_type_id}`)}>
            <div className='humidity_body'>
                <p>{humedad.measure_value}%</p>
                <h3>HUMEDAD</h3>
            </div>
            <img src='/assets/images/cards/humidity.png' className='responsive_img'/>
            {/* {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>} */}
        </div>
        <hr/>
    </div>
  )
}
