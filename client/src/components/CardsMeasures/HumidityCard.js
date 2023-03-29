import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const HumidityCard = ({humedad, userAlarms}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 3){
          setAlarm(true)
          found = true;
        } 
      }
    }, [])
  return (
    <div className='measure_cardCont'>
        <div className='humidity_card responsive_card' onClick={()=>navigate(`${humedad.measurement_type_id}`)}>
            <div className='humidity_body'>
                <p>{humedad.measure_value}%</p>
                <h3>HUMEDAD</h3>
            </div>
            <img src='/assets/images/cards/humidity.png' className='responsive_img'/>
            {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
        </div>
        <hr/>
    </div>
  )
}
