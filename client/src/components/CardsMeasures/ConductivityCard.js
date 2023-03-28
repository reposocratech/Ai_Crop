import React, { useEffect, useState } from 'react'

export const ConductivityCard = ({conductividad, userAlarms}) => {
  const [alarm, setAlarm] = useState(false)

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms.length && !found ; i++){
        if (userAlarms[i].measurement_type_id === 6){
          setAlarm(true)
          found = true;
        } 
      }
    }, [])
  return (
    <div className='measure_cardCont'>
    <div className='conductivity_card responsive_card'>
        <h3>CONDUCTIVIDAD</h3>
        <div className='conductivity_body'>
            <div className='cuadro'>
                <p>{conductividad} ms/cm</p>
            </div>
            <img src='/assets/images/cards/energia.png' className='responsive_img'/>
            {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
        </div>
    </div>
    <hr/>
</div>
  )
}
