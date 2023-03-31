import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';

export const SunlightCard = ({luzSolar}) => {
    const [alarm, setAlarm] = useState(false)
    const navigate = useNavigate();
    const {userAlarms, actionReload} = useContext(AICropContext)

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms?.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 4){
          setAlarm(true)
          found = true;
        } 
      }
    }, [actionReload])
  return (
    <div className='measure_cardCont'>
    {alarm &&
    <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
    <div className='sunlight_card responsive_card' onClick={()=>navigate(`${luzSolar.measurement_type_id}`)}>
        <img src='/assets/images/cards/sunlight.png' className='responsive_img'/>
        <div>
            <h3>LUZ SOLAR</h3>
            <div className='cuadro'>
                <p>{luzSolar.measure_value} nm</p>
            </div>
        </div>
        {/* {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>} */}
    </div>
    <hr/>
</div>
  )
}
