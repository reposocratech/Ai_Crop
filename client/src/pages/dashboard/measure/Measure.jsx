import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import './measure.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { AICropContext } from '../../../context/AICropContext';
import { ModalCloseAlarm } from '../../../components/ConfirmationModals/ModalCloseAlarm';

export const Measure = () => {

  const [measure, setMeasure] = useState();
  const [alarma, setAlarma] = useState()
  const [closeMessage, setCloseMessage] = useState("noseque")
  const {greenhouse_id, measurement_type_id} = useParams();
  const [showModalCloseAlarm, setShowModalCloseAlarm] = useState(false)
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/server/parameters/current/${greenhouse_id}/${measurement_type_id}`)
      .then((res)=>{
        setMeasure(res.data[0])
      })
      .catch((err)=>{
        console.log(err)
      })

    axios
      .get(`http://localhost:4000/server/alarm/seeAlarm/${greenhouse_id}/${measurement_type_id}`)
      .then((res)=>{
        console.log(res.data, "alarmAAAAAAAA");
        setAlarma(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
      
    },[])

    console.log(alarma);
    // setCloseMessage("noseque")

    const onClose = () => {
      axios
        .put(`http://localhost:4000/server/alarm/closeAlarm/${alarma.alarm_id}`, {closeMessage})
        .then((res)=>{
          console.log(closeMessage, "otracosa");
          
        })
        .catch((err)=>{
          console.log(err);
        })
    } 
    

  return (
    <div className='cont_measure'>
      <section className='botones_user'>
        <div className='alerta'>
        {alarma &&
        <div className='d-flex'>
        <p>{alarma.alarm_message}</p>
        <button onClick={() => {setShowModalCloseAlarm(true)}}>desactivar</button>
        <ModalCloseAlarm onClose = {onClose} setShowModalCloseAlarm = {setShowModalCloseAlarm} showModalCloseAlarm = {showModalCloseAlarm} closeMessage = {closeMessage} setCloseMessage = {setCloseMessage}/>
        </div>
        }
        </div>
        <div>
          <button onClick={() => navigate(-1)}><img alt='ir atrás' src='/assets/images/go_back.png'/></button>
        </div>
      </section>
      <header className="title_row">
        <h1>{measure?.measurement_type_name.toLowerCase()}</h1>
        <hr/>
      </header>
      <p>{measure?.greenhouse_name}</p>
      <main className='main_measure'>
        <section className='cards_izq'>
          <div className='card_measure'>
            <h3>{measure?.measurement_type_name.toUpperCase()}</h3>
            <p className='medida'>{measure?.measure_value}{measure?.unit}</p>
            <p>A las 00:00, del L-D X de E-D</p>
          </div>
          <div className='card_maxMin'>
            <h3>MÁXIMO <span>{measure?.max}{measure?.unit}</span></h3>
            <h3>MÍNIMO <span>{measure?.min}{measure?.unit}</span></h3>
            <img src='/assets/images/cards/roots.png'/>
          </div>
        </section>
        <section className='chart_cont'>
          <div className='chart_options'>
            <div className='wk_mnth_year'>
              <button>SEMANA</button>
              <button>MES</button>
              <button>AÑO</button>
            </div>
            <div className='media'>
              <button>VER LA MEDIA TOTAL</button>
            </div>
          </div>
          <div className='chart'>
            <h4>MEDIDAS HISTORICAS</h4>
          </div>
        </section>
      </main>
    </div>
  )
}
