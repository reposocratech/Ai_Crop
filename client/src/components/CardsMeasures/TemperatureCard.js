import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import './cardsmeasures.scss'

export const TemperatureCard = ({temperatura}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const {userAlarms} = useContext(AICropContext)

  //console.log(temperatura, "result measurreeeeee")

  useEffect(() => {
    let found = false;
    for (let i = 0; i < userAlarms?.length && !found; i++){
      if (userAlarms[i]?.measurement_type_id === 1){
        setAlarm(true)
        found = true;
      } 
    }
  }, [])
  
  return (
    <div className='measure_cardCont'>
      {alarm &&
          <div className='alarma_measure'><img className='medida' src='/assets/images/alerta.png'/></div>}
        <div className='temperature_card responsive_card' onClick={()=>navigate(`${temperatura.measurement_type_id}`)}>
          <div className='d-flex flex-column'>
            <h3>TEMPERATURA</h3>
            <p>{temperatura.measure_value} ºC</p>
          </div>
            <img src='/assets/images/cards/warm.png' className='responsive_img'/>
          {/* {alarm &&
          <div className='alarma_measure'><img className='medida' src='/assets/images/alerta.png'/></div>} */}
        </div>
        <hr/>
    </div>
  )
}
