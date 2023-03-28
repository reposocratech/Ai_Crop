import React, { useContext, useEffect, useState } from 'react'
import { AICropContext } from '../../context/AICropContext';

export const SunlightCard = ({luzSolar, userAlarms}) => {
    const {user, selectedGreenhouse} = useContext(AICropContext);
    const [alarm, setAlarm] = useState(false)

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
    <div className='sunlight_card responsive_card'>
        <img src='/assets/images/cards/sunlight.png' className='responsive_img'/>
        <div>
            <h3>LUZ SOLAR</h3>
            <div className='cuadro'>
                <p>{luzSolar} nm</p>
            </div>
        </div>
        {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
    </div>
    <hr/>
</div>
  )
}
