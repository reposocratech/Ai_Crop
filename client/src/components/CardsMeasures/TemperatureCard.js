
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import './cardsmeasures.scss'
import axios from 'axios';

export const TemperatureCard = ({temperatura, temperaturaAlarm}) => {

  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const { userAlarms, actionReload } = useContext(AICropContext);
  const greenhouse_id = parseInt(useParams().greenhouse_id);

  useEffect(() => {

    axios 
    .get(`http://localhost:4000/server/alarm/seeAlarmsByMeasure2/${greenhouse_id}/1`)
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
    {temperatura !== undefined ? 
    <div className='measure_cardCont'>
      {alarm &&
       <div className='alarma_measure'><img className='medida' src='/assets/images/alerta.png'/></div>
       }
       <div className='temperature_card responsive_card' onClick={()=>navigate(`${temperatura?.measurement_type_id}`)}>
         <div className='d-flex flex-column'>
           <h3>TEMPERATURA</h3>
           <p>{temperatura?.measure_value} ºC</p>
         </div>
         <img src='/assets/images/cards/thermometer.png' className='responsive_img'/>    
       </div>
       <hr />
     </div>
    :
    <div className='measure_cardCont bl_wh pe-none'>
      <div className='temperature_card responsive_card'>
        <div className='d-flex flex-column'>
          <h3>TEMPERATURA</h3>
        </div>
        <img src='/assets/images/cards/thermometer.png' className='responsive_img'/>
      </div>
      <hr/>
     </div>
     }
   </>
  );
};
