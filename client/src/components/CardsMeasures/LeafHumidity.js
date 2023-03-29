import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const LeafHumidity = ({humedadHoja, userAlarms}) => {
  const [alarm, setAlarm] = useState(false)
  const navigate = useNavigate();

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
        <div className='leafhumidity_card responsive_card' onClick={()=>navigate(`${humedadHoja.measurement_type_id}`)}>
            <div className='leafhumidity_body'>
                <p>{humedadHoja.measure_value}%</p>
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
