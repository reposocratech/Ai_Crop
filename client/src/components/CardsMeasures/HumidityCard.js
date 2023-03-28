import React, { useEffect, useState } from 'react'

export const HumidityCard = ({humedad, userAlarms}) => {
  const [alarm, setAlarm] = useState(false)

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 3){
          setAlarm(true)
          found = true;
        } 
      }
    }, [])
  return (
    <div className='measure_cardCont'>
        <div className='humidity_card responsive_card'>
            <div className='humidity_body'>
                <p>{humedad}%</p>
                <h3>HUMEDAD</h3>
            </div>
            <img src='/assets/images/cards/humidity.png' className='responsive_img'/>
            {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
        </div>
        <hr/>
    </div>
  )
}
