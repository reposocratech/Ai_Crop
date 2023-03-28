import React, { useEffect, useState } from 'react'

export const Co2Card = ({co2, userAlarms}) => {
  const [alarm, setAlarm] = useState(false)

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 2){
          setAlarm(true)
          found = true;
        } 
      }
    }, [])
  return (
    <div className='measure_cardCont'>
        <div className='co2_card responsive_card'>
            <img src='/assets/images/cards/co2.png' className='responsive_img'/>
            <div className='cuadro'><p>{co2} pm</p></div>
          {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
        </div>
        <hr/>
    </div>
  )
}
