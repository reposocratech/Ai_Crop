import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './cardsmeasures.scss'

export const TemperatureCard = ({temperatura, userAlarms}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();

  console.log(temperatura, "result measurreeeeee")

  useEffect(() => {
    let found = false;
    for (let i = 0; i < userAlarms.length && !found; i++){
      if (userAlarms[i].measurement_type_id === 1){
        setAlarm(true)
        found = true;
      } 
    }
  }, [])
  
  return (
    <div className='measure_cardCont'>
        <div className='temperature_card responsive_card' onClick={()=>navigate(`${temperatura.measurement_type_id}`)}>
            <h3>TEMPERATURA</h3>
            <p>{temperatura.measure_value} ºC</p>
          {alarm &&
          <div className='alarma_measure'><img className='medida' src='/assets/images/alerta.png'/></div>}
        </div>
        <hr/>
    </div>
  )
}
