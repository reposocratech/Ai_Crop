import React, { useContext, useEffect, useState } from 'react'
import './onegreenhouse.scss'
import '../allGreenhouses/allgreenhouses.scss'
import { TemperatureCard } from '../../../../components/CardsMeasures/TemperatureCard'
import { Co2Card } from '../../../../components/CardsMeasures/Co2Card'
import { HumidityCard } from '../../../../components/CardsMeasures/HumidityCard'
import { SunlightCard } from '../../../../components/CardsMeasures/SunlightCard'
import { PhCard } from '../../../../components/CardsMeasures/PhCard'
import { ConductivityCard } from '../../../../components/CardsMeasures/ConductivityCard'
import { LeafHumidity } from '../../../../components/CardsMeasures/LeafHumidity'
import { AICropContext } from '../../../../context/AICropContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ButtonNotif } from '../../../../components/Notifications/ButtonNotif'
import { ModalNotif } from '../../../../components/Notifications/ModalNotif'
import { ButtonCollaborator } from '../../../../components/Notifications/ButtonCollaborator'
import { ModalCollaborator } from '../../../../components/Notifications/ModalCollaborator'

export const OneGreenhouse = () => {

  const {user, selectedGreenhouse} = useContext(AICropContext);
  const [temperatura, setTemperatura] = useState();
  const [co2, setCo2] = useState();
  const [humedad, setHumedad] = useState();
  const [luzSolar, setLuzSolar] = useState();
  const [ph, setPh] = useState();
  const [conductividad, setConductividad] = useState();
  const [humedadHoja, setHumedadHoja] = useState();
  const [showModalNotif, setShowModalNotif] = useState(false)
  const [showModalCollab, setShowModalCollab] = useState(false)
  const [userCollaborator, setUserCollaborator] = useState();

  const navigate = useNavigate();

  console.log()

    useEffect(() => {

      if(selectedGreenhouse){
        axios
          .get(`http://localhost:4000/greenhouse/details/${selectedGreenhouse}`)
          .then((res)=>{
            console.log(res.data.resultTemperatura);
            console.log(res.data)
            console.log(selectedGreenhouse);
            for (let i = 0; i < res.data.resultMeasure.length; i++){
              switch (res.data.resultMeasure[i].measurement_type_id){
                case 1:
                  setTemperatura(res.data.resultMeasure[i].measure_value)
                  break;
                case 2:
                  setCo2(res.data.resultMeasure[i].measure_value)
                  break;
                case 3:
                  setHumedad(res.data.resultMeasure[i].measure_value)
                  break;
                case 4:
                  setLuzSolar(res.data.resultMeasure[i].measure_value)
                  break;
                case 5:
                  setPh(res.data.resultMeasure[i].measure_value)
                  break;
                case 6:
                  setConductividad(res.data.resultMeasure[i].measure_value)
                  break;
                case 7:
                  setHumedadHoja(res.data.resultMeasure[i].measure_value)
                  break;
                default:
                  console.log("pringao")
              }
            }

          })
          .catch((err)=>{
            console.log(err);
          })
      }
  }, [user])

  return (
    <div className='cont_greenhouses'>
      <section className='botones_user'>
        
        <button onClick={() => navigate('/user')}><img alt='ir atrás' src='/assets/images/go_back.png'/></button>

        <button onClick={() => navigate('/user/editGreenhouse')}><img className='config_invernadero' alt='configuracion invernadero' src='/assets/images/editar_greenhouse.png'/></button>
        
         {/* Modal Collaborator */}
         <ButtonCollaborator setShowModalCollab={setShowModalCollab}/>
         <ModalCollaborator showModalCollab={showModalCollab} setShowModalCollab={setShowModalCollab} userCollaborator={userCollaborator} setUserCollaborator={setUserCollaborator}/>

        {/* Modal */}
        <ButtonNotif setShowModalNotif={setShowModalNotif}/>
        <ModalNotif showModalNotif={showModalNotif} setShowModalNotif={setShowModalNotif}/>
        

      </section>
      <header className='header_greenhouses'>
        <section className='title_row'>
          <h1>mi invernadero</h1>
          <article className='input_sect'>
          <div className='search_add'>
            <img alt='buscar' src='/assets/images/search.png'/>
            <input placeholder='Buscar cultivo'/>
          </div>
          <button className='search_add'>
          <img alt='añadir colaboradores' src='/assets/images/add_collaborator.png'/>
            Añadir colaboradores
          </button>
          </article>
        </section>
        <p>Nombre del invernadero</p>
      </header>
      <main>
        <section className='cards_measures'>
          {!temperatura && !co2 && !humedad && !luzSolar && !ph && !conductividad && !humedadHoja ?
          <div><p>No hay ningún parámetro</p></div>
          :
          <div>
            {temperatura && <p>Temperatura: {temperatura}</p>}
            
          {/* {temperatura &&
          <TemperatureCard temperatura = {temperatura}/>}
          {co2 &&
          <Co2Card co2 = {co2}/>} 
          {humedad &&
          <HumidityCard humedad = {humedad}/>}
          {luzSolar &&
          <SunlightCard luzSolar = {luzSolar}/>}
          {ph &&
          <PhCard ph = {ph}/>}
          {conductividad &&
          <ConductivityCard conductividad = {conductividad}/>}
          {humedadHoja &&
          <LeafHumidity humedadHoja = {humedadHoja}/>} */}
          </div>
          }
        </section> 
      </main>
    </div>
  )
}
