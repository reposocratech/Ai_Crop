
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import axios from 'axios';


export const PhCard = ({ph, phAlarm}) => {

  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const { userAlarms, actionReload } = useContext(AICropContext);
  const greenhouse_id = parseInt(useParams().greenhouse_id);

  useEffect(() => {

    axios 
    .get(`http://localhost:4000/server/alarm/seeAlarmsByMeasure2/${greenhouse_id}/5`)
    .then((res)=>{
      if(res.data.length > 0){
        setAlarm(true);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  
  }, [actionReload])


  return (
    <>
      {ph !== undefined ? (
        <div className="measure_cardCont">
          {alarm && (
            <div className="alarma_measure">
              <img src="/assets/images/alerta.png" />
            </div>
          )}
          <div
            className="ph_card responsive_card"
            onClick={() => navigate(`${ph?.measurement_type_id}`)}
          >
            <div className="ph_body">
              <p>{ph?.measure_value}</p>
              <h3>pH</h3>
            </div>
            <img src="/assets/images/cards/ph.png" className="responsive_img" />
            {/* {alarm &&
          <div className='alarma_measure'><img src='/assets/images/alerta.png'/></div>} */}
          </div>
          <hr />
        </div>
      ) : (
        <div className="measure_cardCont bl_wh pe-none">
          <div className="ph_card responsive_card">
            <div className="ph_body">
              {/* <p>{ph?.measure_value}</p> */}
              <h3>pH</h3>
            </div>
            <img src="/assets/images/cards/ph.png" className="responsive_img" />
          </div>
          <hr />
        </div>
      )}
    </>
  );
};
