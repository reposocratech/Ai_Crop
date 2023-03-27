import React, { useContext, useEffect, useState } from 'react'
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

import './onegreenhouse.scss'
import '../allGreenhouses/allgreenhouses.scss'


import { useParams } from 'react-router-dom'


export const OneGreenhouse = () => {

  const {user} = useContext(AICropContext);
  const [temperatura, setTemperatura] = useState();
  const [co2, setCo2] = useState();
  const [humedad, setHumedad] = useState();
  const [luzSolar, setLuzSolar] = useState();
  const [ph, setPh] = useState();
  const [conductividad, setConductividad] = useState();
  const [humedadHoja, setHumedadHoja] = useState();
  const [showModalNotif, setShowModalNotif] = useState(false)
  const [showModalCollab, setShowModalCollab] = useState(false)
  const [userCollaborators, setUserCollaborators] = useState();
  const [helpers, setHelpers] = useState();
  const [greenhouseData, setGreenhouseData] = useState();
  
  const navigate = useNavigate();
  
  const greenhouse_id = useParams().greenhouse_id;

  useEffect(() => {
    
    axios
      .get(`http://localhost:4000/greenhouse/details/${(greenhouse_id)}`)
      .then((res)=>{

        setUserCollaborators(res.data.resultCollaborators);
        setHelpers(res.data.resultHelpers);
        console.log(res.data);
        setGreenhouseData(res.data.resultGreenhouse[0]);

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

  }, [])

  let datos = {
    name: "Gabi",
    email: "gd@h",
    user_id: user?.user_id,
    first_name: user?.first_name,
    last_name: user?.last_name,
    greenhouse_id: greenhouse_id,
    // greenhouse_name: "Invernadero de Carlitos"
  }

  const inviteCollab = () => {
    axios // CAMBIAR METODO A POST, AQUÍ Y EN LA RUTA DEL BACK
    .post('http://localhost:4000/greenhouse/inviteCollaborator', {datos})
    .then((res)=>{
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err.response.data.error);
    })
  }

  return (
    <div className='cont_greenhouses'>
      <section className='botones_user'>
        
        <button onClick={() => navigate('/user')}><img alt='ir atrás' src='/assets/images/go_back.png'/></button>

        <button onClick={() => navigate(`/user/editGreenhouse/${greenhouse_id}`)}><img className='config_invernadero' alt='configuracion invernadero' src='/assets/images/editar_greenhouse.png'/></button>
        
         {/* Modal Collaborator */}
         <ButtonCollaborator setShowModalCollab={setShowModalCollab}/>
         
         <ModalCollaborator showModalCollab={showModalCollab} setShowModalCollab={setShowModalCollab} userCollaborators={userCollaborators} helpers={helpers}/>

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
          <button className='search_add' onClick={inviteCollab}>
          <img alt='añadir colaboradores' src='/assets/images/add_collaborator.png'/>
            Añadir colaboradores
          </button>
          </article>
        </section>
        <p>Nombre del invernadero: {greenhouseData?.greenhouse_name}</p>
      </header>
      <main>
        {!temperatura && !co2 && !humedad && !luzSolar && !ph && !conductividad && !humedadHoja ?
        <div><p>No hay ningún parámetro</p></div>
        :
        <section className='cards_measures'>
          {temperatura &&
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
          <LeafHumidity humedadHoja = {humedadHoja}/>}
        </section> 
        }
      </main>
    </div>
  )
}
