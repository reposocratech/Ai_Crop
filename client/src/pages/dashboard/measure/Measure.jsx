import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import './measure.scss'
import { useNavigate } from 'react-router-dom';

export const Measure = () => {

  const navigate = useNavigate();
  

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
      <h3>MEDIDA ACTUAL</h3>

      <h4>MEDIDAS HISTORICAS</h4>
      <div>
        MAPEO
      </div>
    </div>
  )
}
