import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./measure.scss";
import { useNavigate, useParams } from "react-router-dom";
import { AICropContext } from "../../../context/AICropContext";
import { ModalCloseAlarm } from "../../../components/ConfirmationModals/ModalCloseAlarm";
import { MeasureChart } from "../../../components/Measure/MeasureChart";

export const Measure = () => {
  const { actionReload, setActionReload } = useContext(AICropContext);
  const [measure, setMeasure] = useState();
  const [alarma, setAlarma] = useState();
  const [closeMessage, setCloseMessage] = useState("");
  const { greenhouse_id, measurement_type_id } = useParams();
  const [showModalCloseAlarm, setShowModalCloseAlarm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/server/parameters/current/${greenhouse_id}/${measurement_type_id}`
      )
      .then((res) => {
        setMeasure(res.data[0]);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `http://localhost:4000/server/alarm/seeAlarm/${greenhouse_id}/${measurement_type_id}`
      )
      .then((res) => {
        setAlarma(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    
  }, [actionReload, greenhouse_id, measurement_type_id]);

  const onClose = () => {
    axios
      .put(`http://localhost:4000/server/alarm/closeAlarm/${alarma.alarm_id}`, {
        closeMessage,
      })
      .then((res) => {
          setActionReload(!actionReload);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const goBack = () => {
    setActionReload(!actionReload);
    navigate(`../greenhouse/${greenhouse_id}`);
  };

  return (
    <div className="cont_measure">
      <section className="botones_user">
        <div className="alerta">
          {alarma && (
            <div className="d-flex alerta_cont">
              <img alt="alerta" src="/assets/images/alerta.png" />
              <p>{alarma.alarm_message}</p>
              <img
                alt="cerrar"
                className="cerrar"
                src="/assets/images/cerrar.png"
                onClick={() => {
                  setShowModalCloseAlarm(true);
                }}
              />
              <ModalCloseAlarm
                onClose={onClose}
                setShowModalCloseAlarm={setShowModalCloseAlarm}
                showModalCloseAlarm={showModalCloseAlarm}
                closeMessage={closeMessage}
                setCloseMessage={setCloseMessage}
              />
            </div>
          )}
        </div>
        <div>
          <button onClick={goBack}>
            <img alt="ir atrás" src="/assets/images/go_back.png" />
          </button>
        </div>
      </section>
      <header className="title_row">
        <h1>{measure?.measurement_type_name.toLowerCase()}</h1>
        <hr />
      </header>
      <p>{measure?.greenhouse_name}</p>
      <main className="main_measure">
        <section className="cards_izq">
          <div className="card_measure">
            <h3>{measure?.measurement_type_name.toUpperCase()}</h3>
            <p className="medida">
              {measure?.measure_value}
              {measure?.unit}
            </p>
          </div>
          <div className="card_maxMin">
            <h3>
              MÁXIMO{" "}
              <span>
                {measure?.max}
                {measure?.unit}
              </span>
            </h3>
            <h3>
              MÍNIMO{" "}
              <span>
                {measure?.min}
                {measure?.unit}
              </span>
            </h3>
            <img alt="dibujo de planta" src="/assets/images/cards/roots.png" />
          </div>
        </section>
        <section className="chart_cont">
          <div >
            <h4>MEDIDAS HISTORICAS</h4>
            <div className="chart">
              <MeasureChart measure={measure}/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
