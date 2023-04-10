import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';

export const PhCard = ({ph}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const {userAlarms, actionReload} = useContext(AICropContext)

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms?.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 5){
          setAlarm(true)
          found = true;
        } 
      }
    }, [actionReload])

  return (
    <div className='measure_cardCont'>
      {alarm &&
      <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
    <div className='ph_card responsive_card' onClick={()=>navigate(`${ph?.measurement_type_id}`)}>
        <div className='ph_body'>
            <p>{ph?.measure_value}</p>
            <h3>pH</h3>
        </div>
        <img src='/assets/images/cards/ph.png' className='responsive_img'/>
        {/* {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>} */}
    </div>
    <hr/>
</div>
  )
}
