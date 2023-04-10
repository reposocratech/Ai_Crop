import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';

export const Co2Card = ({co2}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const {userAlarms, actionReload} = useContext(AICropContext)
  const greenhouse_id = parseInt(useParams().greenhouse_id);

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms?.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 2 && userAlarms[i].greenhouse_id === greenhouse_id){
          setAlarm(true)
          found = true;
        } 
      }
    }, [actionReload])

  return (
    <>
    {co2 !== undefined ?
    <div className='measure_cardCont'>
        {alarm &&
        <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
        <div className='co2_card responsive_card' onClick={()=>navigate(`${co2?.measurement_type_id}`)}>
            <img src='/assets/images/cards/co2.png' className='responsive_img'/>
            <div className='cuadro'><p>{co2?.measure_value} pm</p></div>
        </div>
        <hr/>
    </div>
    :
    <div className='measure_cardCont bl_wh pe-none'>
        <div className='co2_card responsive_card'>
            <img src='/assets/images/cards/co2.png' className='responsive_img'/>
            <div className='cuadro'></div>
        </div>
        <hr/>
    </div>
    }
    </>
  )
}
