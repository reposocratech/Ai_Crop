import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const SunlightCard = ({luzSolar, userAlarms}) => {
    const [alarm, setAlarm] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 4){
          setAlarm(true)
          found = true;
        } 
      }
    }, [])
  return (
    <div className='measure_cardCont'>
    <div className='sunlight_card responsive_card' onClick={()=>navigate(`${luzSolar.measurement_type_id}`)}>
        <img src='/assets/images/cards/sunlight.png' className='responsive_img'/>
        <div>
            <h3>LUZ SOLAR</h3>
            <div className='cuadro'>
                <p>{luzSolar.measure_value} nm</p>
            </div>
        </div>
        {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
    </div>
    <hr/>
</div>
  )
}
