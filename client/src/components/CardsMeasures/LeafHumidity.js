import React, { useEffect, useState } from 'react'

export const LeafHumidity = ({humedadHoja, userAlarms}) => {
  const [alarm, setAlarm] = useState(false)

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 7){
          setAlarm(true)
          found = true;
        } 
      }
    }, [])
  return (
    <div className='measure_cardCont'>
        <div className='leafhumidity_card responsive_card'>
            <div className='leafhumidity_body'>
                <p>{humedadHoja}%</p>
                <img src='/assets/images/cards/leaf_humidity.png' className='responsive_img'/>
            </div>
            <h3>HUMEDAD DE HOJA</h3>
            {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
        </div>
        <hr/>
    </div>
  )
}
