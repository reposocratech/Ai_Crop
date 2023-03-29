import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import './measure.scss'
import { useNavigate, useParams } from 'react-router-dom';

export const Measure = () => {

  const navigate = useNavigate();
  const {greenhouse_id, measurement_type_id} = useParams();
  // console.log(greenhouse_id, "gh aidIIIII");
  // console.log(measurement_type_id, "typeee aidIIIII");

  return (
    <div className='cont_measure'>
      <section className='botones_user'>
        <p>Alerta generada x</p>
        <div>
          <button onClick={() => navigate(-1)}><img alt='ir atrás' src='/assets/images/go_back.png'/></button>
        </div>
      </section>
      <header className="title_row">
        <h1>medida</h1>
        <hr/>
      </header>
      <p>Nombre de invernadero</p>
      <main className='main_measure'>
        <section className='cards_izq'>
          <div className='card_measure'>
            <h3>MEDIDA</h3>
            <p className='medida'>24ºC</p>
            <p>A las 00:00, del L-D X de E-D</p>
          </div>
          <div className='card_maxMin'>
            <h3>MÁXIMO <span>24ºC</span></h3>
            <h3>MÍNIMO <span>13ºC</span></h3>
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
