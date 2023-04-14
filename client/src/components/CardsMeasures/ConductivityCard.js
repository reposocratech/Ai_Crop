
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import axios from 'axios';


export const ConductivityCard = ({conductividad, conductivityAlarm}) => {

  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const { userAlarms, actionReload, setActionReload } =
    useContext(AICropContext);
  const greenhouse_id = parseInt(useParams().greenhouse_id);

  useEffect(() => {

    axios 
    .get(`http://localhost:4000/server/alarm/seeAlarmsByMeasure2/${greenhouse_id}/6`)
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
      {conductividad !== undefined ? (
        <div className="measure_cardCont">
          {alarm && (
            <div className="alarma_measure">
              <img src="/assets/images/alerta.png" />
            </div>
          )}
          <div
            className="conductivity_card responsive_card"
            onClick={() => navigate(`${conductividad?.measurement_type_id}`)}
          >
            <h3>CONDUCTIVIDAD</h3>
            <div className="conductivity_body">
              <div className="cuadro">
                <p>{conductividad?.measure_value} ms/cm</p>
              </div>
              <img
                src="/assets/images/cards/energia.png"
                className="responsive_img"
              />
            </div>
          </div>
          <hr />
        </div>
      ) : (
        <div className="measure_cardCont bl_wh pe-none">
          <div className="conductivity_card responsive_card">
            <h3>CONDUCTIVIDAD</h3>
            <div className="conductivity_body">
              <div className="cuadro">
                <p>{conductividad?.measure_value} ms/cm</p>
              </div>
              <img
                src="/assets/images/cards/energia.png"
                className="responsive_img"
              />
            </div>
          </div>
          <hr />
        </div>
      )}
    </>
  );
};
