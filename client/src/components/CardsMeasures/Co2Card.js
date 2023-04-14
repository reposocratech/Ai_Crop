import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import axios from 'axios';


export const Co2Card = ({co2, co2Alarm}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const {userAlarms, actionReload} = useContext(AICropContext)
  const greenhouse_id = parseInt(useParams().greenhouse_id);

  useEffect(() => {
    axios 
    .get(`http://localhost:4000/server/alarm/seeAlarmsByMeasure2/${greenhouse_id}/2`)
    .then((res)=>{
      if(res.data.length > 0){
        setAlarm(true);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  
  }, [actionReload])

  return (
    <>
    {co2 !== undefined ?
    <div className='measure_cardCont'>
        {alarm &&
        <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
        <div className='co2_card responsive_card' onClick={()=>navigate(`${co2?.measurement_type_id}`)}>
            <img src='/assets/images/cards/co2.png' className='responsive_img'/>
            <div className='cuadro'><p>{co2?.measure_value} ppm</p></div>
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
