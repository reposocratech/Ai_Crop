import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';

export const PhCard = ({ph}) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const {userAlarms, actionReload} = useContext(AICropContext)
  const greenhouse_id = parseInt(useParams().greenhouse_id);

    useEffect(() => {
      let found = false;
      for (let i = 0; i < userAlarms?.length && !found; i++){
        if (userAlarms[i].measurement_type_id === 5 && userAlarms[i].greenhouse_id === greenhouse_id){
          setAlarm(true)
          found = true;
        } 
      }
    }, [actionReload])

  return (
    <>
    {ph !== undefined ? 
    <div className='measure_cardCont'>
      {alarm &&
      <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>}
    <div className='ph_card responsive_card' onClick={()=>navigate(`${ph?.measurement_type_id}`)}>
        <div className='ph_body'>
            <p>{ph?.measure_value}</p>
            <h3>pH</h3>
        </div>
        <img src='/assets/images/cards/ph.png' className='responsive_img'/>
        {/* {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>} */}
    </div>
    <hr/>
    </div>
    :
    <div className='measure_cardCont bl_wh pe-none'>
    <div className='ph_card responsive_card'>
      <div className='ph_body'>
          {/* <p>{ph?.measure_value}</p> */}
          <h3>pH</h3>
      </div>
      <img src='/assets/images/cards/ph.png' className='responsive_img'/>
    </div>
    <hr/>
    </div>
    }
    </>
  )
}
