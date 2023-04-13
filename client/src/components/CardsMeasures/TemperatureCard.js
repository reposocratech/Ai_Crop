import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import './cardsmeasures.scss'

export const TemperatureCard = ({temperatura}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const {userAlarms, actionReload} = useContext(AICropContext)
  const greenhouse_id = parseInt(useParams().greenhouse_id);

  

  useEffect(() => {
    let found = false;
    for (let i = 0; i < userAlarms?.length && !found; i++){
      if (userAlarms[i]?.measurement_type_id === 1 && userAlarms[i].greenhouse_id === greenhouse_id){
        setAlarm(true)
        console.log(userAlarms[i]);
        found = true;
      } 
    }
  }, [actionReload])
  
  return (
    <>
    {temperatura !== undefined ? 
    <div className='measure_cardCont'>
      {alarm &&
          <div className='alarma_measure'><img className='medida' src='/assets/images/alerta.png'/></div>}
        <div className='temperature_card responsive_card' onClick={()=>navigate(`${temperatura?.measurement_type_id}`)}>
          <div className='d-flex flex-column'>
            <h3>TEMPERATURA</h3>
            <p>{temperatura?.measure_value} ºC</p>
          </div>
            <img src='/assets/images/cards/thermometer.png' className='responsive_img'/>
          {/* {alarm &&
          <div className='alarma_measure'><img className='medida' src='/assets/images/alerta.png'/></div>} */}
        </div>
        <hr/>
    </div>
    :
    <div className='measure_cardCont bl_wh pe-none'>
      <div className='temperature_card responsive_card'>
        <div className='d-flex flex-column'>
          <h3>TEMPERATURA</h3>
          {/* <p>{temperatura?.measure_value} ºC</p> */}
        </div>
          <img src='/assets/images/cards/thermometer.png' className='responsive_img'/>
        {/* {alarm &&
        <div className='alarma_measure'><img className='medida' src='/assets/images/alerta.png'/></div>} */}
      </div>
      <hr/>
  </div>
  }
  </>
  )
}
