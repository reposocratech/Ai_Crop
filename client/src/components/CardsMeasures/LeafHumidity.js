
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import axios from 'axios';


export const LeafHumidity = ({humedadHoja, humedadHojaAlarm}) => {
  const [alarm, setAlarm] = useState(false)

  const navigate = useNavigate();
  const { userAlarms, actionReload } = useContext(AICropContext);
  const greenhouse_id = parseInt(useParams().greenhouse_id);

  useEffect(() => {

    axios 
    .get(`http://localhost:4000/server/alarm/seeAlarmsByMeasure2/${greenhouse_id}/7`)
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
      {humedadHoja !== undefined ? (
        <div className="measure_cardCont">
          {alarm && (
            <div className="alarma_measure">
              <img src="/assets/images/alerta.png" />
            </div>
          )}
          <div
            className="leafhumidity_card responsive_card"
            onClick={() => navigate(`${humedadHoja?.measurement_type_id}`)}
          >
            <div className="leafhumidity_body">
              <p>{humedadHoja?.measure_value}%</p>
              <img
                src="/assets/images/cards/leaf_humidity.png"
                className="responsive_img"
              />
            </div>
            <h3>HUMEDAD DE HOJA</h3>
          </div>
          <hr />
        </div>
      ) : (
        <div className="measure_cardCont bl_wh pe-none">
          <div className="leafhumidity_card responsive_card">
            <div className="leafhumidity_body">
              <img
                src="/assets/images/cards/leaf_humidity.png"
                className="responsive_img"
              />
            </div>
            <h3>HUMEDAD DE HOJA</h3>
          </div>
          <hr />
        </div>
      )}
    </>
  );
};
