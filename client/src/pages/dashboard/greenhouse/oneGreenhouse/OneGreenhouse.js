import React, { useContext, useEffect, useState } from 'react'
import './onegreenhouse.scss'
import '../allGreenhouses/allgreenhouses.scss'
import { AICropContext } from '../../../../context/AICropContext';
import axios from 'axios';
import { TemperaturaCard } from '../../../../components/measureCards/TemperaturaCard';
import { Co2Card } from '../../../../components/measureCards/Co2Card';
import { HumedadCard } from '../../../../components/measureCards/HumedadCard';
import { LuzSolarCard } from '../../../../components/measureCards/LuzSolarCard';
import { PhCard } from '../../../../components/measureCards/PhCard';
import { ConductividadCard } from '../../../../components/measureCards/ConductividadCard';
import { HumedadHojaCard } from '../../../../components/measureCards/HumedadHojaCard';

export const OneGreenhouse = () => {

  const {user, selectedGreenhouse} = useContext(AICropContext);
  const [temperatura, setTemperatura] = useState();
  const [co2, setCo2] = useState();
  const [humedad, setHumedad] = useState();
  const [luzSolar, setLuzSolar] = useState();
  const [ph, setPh] = useState();
  const [conductividad, setConductividad] = useState();
  const [humedadHoja, setHumedadHoja] = useState();

    useEffect(() => {

      if(selectedGreenhouse){
        axios
          .get(`http://localhost:4000/server/alarm/seeAlarmsByMeasure/${selectedGreenhouse}`)
          .then((res)=>{
            setTemperatura(res.data.resultTemperatura);
            setCo2(res.data.resultCo2);
            setHumedad(res.data.resultHumedad);
            setLuzSolar(res.data.resultLuz);
            setPh(res.data.resultPh);
            setConductividad(res.data.resultCe);
            setHumedadHoja(res.data.resultHumedadHoja);
          })
          .catch((err)=>{
            console.log(err);
          })
      }
  }, [user])

  return (
    <div className='cont_greenhouses'>
      <section className='botones_user'>
        <button><img alt='ir atrás' src='/assets/images/go_back.png'/></button>
        <button><img alt='configuracion invernadero'/></button>
        <button><img alt='ver colaboradores'/></button>
        <button><img alt='notificaciones' src='/assets/images/notification.png'/></button>
      </section>
      <header className='header_Allgreenhouses'>
        <section className='title_row'>
          <h1>mi invernadero</h1>
          <article className='input_sect'>
          <div>
            <img alt='buscar' src='/assets/images/search.png'/>
            <input placeholder='Buscar cultivo'/>
          </div>
          <div>
          <img alt='añadir colaboradores' src='/assets/images/add_collaborator.png'/>
            <input placeholder='Añadir colaboradores'/>
          </div>
          </article>
        </section>
        <p>Nombre del invernadero</p>
      </header>
      <main>
        <div className='card_measure'>
          <TemperaturaCard temperatura = {temperatura}/>
          <Co2Card co2 = {co2}/>
          <HumedadCard humedad = {humedad}/>
          <LuzSolarCard luzSolar = {luzSolar}/>
          <PhCard ph = {ph}/>
          <ConductividadCard conductividad = {conductividad}/>
          <HumedadHojaCard humedadHoja = {humedadHoja}/>

        </div>
      </main>
    </div>
  )
}
