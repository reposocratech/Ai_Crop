import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AICropContext } from "../../context/AICropContext";

export const HumidityCard = ({ humedad }) => {
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const { userAlarms, actionReload } = useContext(AICropContext);
  const greenhouse_id = parseInt(useParams().greenhouse_id);

  useEffect(() => {
    let found = false;
    for (let i = 0; i < userAlarms?.length && !found; i++) {
      if (
        userAlarms[i].measurement_type_id === 3 &&
        userAlarms[i].greenhouse_id === greenhouse_id
      ) {
        setAlarm(true);
        found = true;
      }
    }
  }, [actionReload]);

  return (
    <>
      {humedad !== undefined ? (
        <div className="measure_cardCont">
          {alarm && (
            <div className="alarma_measure">
              <img src="/assets/images/alerta.png" />
            </div>
          )}
          <div
            className="humidity_card responsive_card"
            onClick={() => navigate(`${humedad?.measurement_type_id}`)}
          >
            <div className="humidity_body">
              <p>{humedad?.measure_value}%</p>
              <h3>HUMEDAD</h3>
            </div>
            <img
              src="/assets/images/cards/humidity.png"
              className="responsive_img"
            />
          </div>
          <hr />
        </div>
      ) : (
        <div className="measure_cardCont bl_wh pe-none">
          <div className="humidity_card responsive_card">
            <div className="humidity_body">
              {/* <p>{humedad?.measure_value}%</p> */}
              <h3 className="mt-5">HUMEDAD</h3>
            </div>
            <img
              src="/assets/images/cards/humidity.png"
              className="responsive_img"
            />
          </div>
          <hr />
        </div>
      )}
    </>
  );
};
