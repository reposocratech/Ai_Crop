import React, { useEffect, useState } from 'react'
import './cardsmeasures.scss'

export const TemperatureCard = ({temperatura, userAlarms}) => {
  console.log(userAlarms, "temperaturaaaaaaaa");
  const [alarm, setAlarm] = useState(false)

  useEffect(() => {
    let found = false;
    for (let i = 0; i < userAlarms.length && !found; i++){
      if (userAlarms[i].measurement_type_id === 1){
        setAlarm(true)
        found = true;
      } 
    }
  }, [])
  console.log(alarm, "alarmaAAAAA")
  
  return (
    <div className='measure_cardCont'>
        <div className='temperature_card responsive_card'>
            <h3>TEMPERATURA</h3>
            <p>{temperatura} ºC</p>
          {alarm &&
          <div className='alarma_measure'><img className='medida' src='/assets/images/alerta.png'/></div>}
        </div>
        <hr/>
    </div>
  )
}
