import React, { useEffect, useState } from 'react'

export const PhCard = ({ph, userAlarms}) => {
  const [alarm, setAlarm] = useState(false)

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 5){
          setAlarm(true)
          found = true;
        } 
      }
    }, [])

  return (
    <div className='measure_cardCont'>
    <div className='ph_card responsive_card'>
        <div className='ph_body'>
            <p>{ph}</p>
            <h3>pH</h3>
        </div>
        <img src='/assets/images/cards/ph.png' className='responsive_img'/>
        {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
    </div>
    <hr/>
</div>
  )
}
