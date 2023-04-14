import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import axios from 'axios';


export const SunlightCard = ({luzSolar, luzSolarAlarm}) => {
    const [alarm, setAlarm] = useState(false)
    const navigate = useNavigate();
    const {userAlarms, actionReload} = useContext(AICropContext)
    const greenhouse_id = parseInt(useParams().greenhouse_id);

    useEffect(() => {
      axios 
      .get(`http://localhost:4000/server/alarm/seeAlarmsByMeasure2/${greenhouse_id}/4`)
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
    {luzSolar !== undefined ?
    <div className='measure_cardCont'>
    {alarm &&
    <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
    <div className='sunlight_card responsive_card' onClick={()=>navigate(`${luzSolar?.measurement_type_id}`)}>
        <img src='/assets/images/cards/sunlight.png' className='responsive_img'/>
        <div>
            <h3>LUZ SOLAR</h3>
            <div className='cuadro'>
                <p>{luzSolar?.measure_value} nm</p>
            </div>
        </div>
        {/* {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>} */}
    </div>
    <hr/>
    </div>
    :
    <div className='measure_cardCont bl_wh pe-none'>
    <div className='sunlight_card responsive_card'>
        <img src='/assets/images/cards/sunlight.png' className='responsive_img'/>
        <div>
            <h3>LUZ SOLAR</h3>
            <div className='cuadro'>
                <p>{luzSolar?.measure_value} nm</p>
            </div>
        </div>
        {/* {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>} */}
    </div>
    <hr/>
    </div>
    }
    </>
  )
}
