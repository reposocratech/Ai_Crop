import React, { useContext, useEffect, useState } from 'react'
import { TemperatureCard } from '../../../../components/CardsMeasures/TemperatureCard'
import { Co2Card } from '../../../../components/CardsMeasures/Co2Card'
import { HumidityCard } from '../../../../components/CardsMeasures/HumidityCard'
import { SunlightCard } from '../../../../components/CardsMeasures/SunlightCard'
import { PhCard } from '../../../../components/CardsMeasures/PhCard'
import { ConductivityCard } from '../../../../components/CardsMeasures/ConductivityCard'
import { LeafHumidity } from '../../../../components/CardsMeasures/LeafHumidity'
import { AICropContext } from '../../../../context/AICropContext'
import { useNavigate } from 'react-router-dom'
import { ButtonNotif } from '../../../../components/Notifications/ButtonNotif'
import { ModalNotif } from '../../../../components/Notifications/ModalNotif'
import { ButtonCollaborator } from '../../../../components/Notifications/ButtonCollaborator'
import { ModalCollaborator } from '../../../../components/Notifications/ModalCollaborator'
import axios from 'axios'
import './onegreenhouse.scss'
import '../allGreenhouses/allgreenhouses.scss'


import { useParams } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'



export const OneGreenhouse = () => {

  const {user,actionReload,userAlarms,setActionReload} = useContext(AICropContext);

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

  //-------------------el cropito-----------------------------------
  const [cropsCards, setCropsCards] = useState([]);

  const navigate = useNavigate();
  
  const greenhouse_id = useParams().greenhouse_id; // ESTE GH ID SE CAPTURA BIEN

  useEffect(() => {
    
    axios
      .get(`http://localhost:4000/greenhouse/details/${(greenhouse_id)}`)
      .then((res)=>{

        setUserCollaborators(res.data.resultCollaborators);
        setHelpers(res.data.resultHelpers);
        console.log(res.data);
        setGreenhouseData(res.data.resultGreenhouse[0]);
        setCropsCards(res.data.resultActiveCrops)

        for (let i = 0; i < res.data.resultMeasure.length; i++){
          switch (res.data.resultMeasure[i].measurement_type_id){
            case 1:
              setTemperatura(res.data.resultMeasure[i])
              break;
            case 2:
              setCo2(res.data.resultMeasure[i])
              break;
            case 3:
              setHumedad(res.data.resultMeasure[i])
              break;
            case 4:
              setLuzSolar(res.data.resultMeasure[i])
              break;
            case 5:
              setPh(res.data.resultMeasure[i])
              break;
            case 6:
              setConductividad(res.data.resultMeasure[i])
              break;
            case 7:
              setHumedadHoja(res.data.resultMeasure[i])
              break;
            default:
              console.log("pringao")
          }
        }
      })
      .catch((err)=>{
        console.log(err);
      })

    // axios
    //   .get(`http://localhost:4000/server/alarm//seeActiveGreenhouseAlarms/${greenhouse_id}`)
    //   .then((res)=>{
    //     console.log(res.data, "todas las alarmassss del ghhhh")
    //   })
    //   .catch((err)=>{
    //     console.log(err)
    //   })



  }, [actionReload])

  //------------------------para traer la info del cropmodal----------------------
  // useEffect(() => {
  //   axios
  //       .get(`http://localhost:4000/crop/getAllCrops/${(greenhouse_id)}`)
  //       .then((res)=>{
  //           setcropsCards(res.data);
  //       })
  //       .catch((err)=>{console.log(err)})
  // }, [actionReload])

 //------------------------para traer la info del cropmodal----------------------
  

  // console.log(cropsCards,"lainfo");
  let datos = {
    name: "Nasza",
    email: "naza@gmail.com",
    user_id: user?.user_id,
    first_name: user?.first_name,
    last_name: user?.last_name,
    greenhouse_id: greenhouse_id,
    // greenhouse_name: "Invernadero de Carlitos"  
  }

  const inviteCollab = () => {
    axios
      .post('http://localhost:4000/greenhouse/inviteCollaborator', datos)
      .then((res)=>{
        console.log(res.data);
     })
      .catch((err)=>{
        console.log(err);
      })
  }


  const onDelete = (crop_id)=>{

    axios
        .get(`http://localhost:4000/crop/deleteCrop/${crop_id}`)
        .then((res)=>{
          // navigate(`greenhouse/${greenhouse_id}`)
          setActionReload(!actionReload);
        })
        .catch((err)=>{
          console.log(err);
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
          {/* <div className='search_add'>
            <img alt='buscar' src='/assets/images/search.png'/>
            <input placeholder='Buscar cultivo'/>
          </div> */}
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
          <TemperatureCard temperatura = {temperatura} userAlarms = {userAlarms} greenhouse_id = {greenhouse_id}/>}
          {co2 &&
          <Co2Card co2 = {co2} userAlarms = {userAlarms}/>} 
          {humedad &&
          <HumidityCard humedad = {humedad} userAlarms = {userAlarms}/>}
          {luzSolar &&
          <SunlightCard luzSolar = {luzSolar} userAlarms = {userAlarms}/>}
          {ph &&
          <PhCard ph = {ph} userAlarms = {userAlarms}/>}
          {conductividad &&
          <ConductivityCard conductividad = {conductividad} userAlarms = {userAlarms}/>}
          {humedadHoja &&
          <LeafHumidity humedadHoja = {humedadHoja} userAlarms = {userAlarms}/>}
        </section> 
        }
      </main>
        <section className='cards_crop'>
            
            {cropsCards?.map((crop, index)=> {
              
              return(
              <div className='card_crop' key={index} >
                  <h4>{crop.crop_name.toUpperCase()}</h4>
                  <p>{crop.crop_plant_variety}</p>
                  <p>Extensión: {crop.crop_size}m²</p>
                  <p>{crop.crop_duration} día(s)</p>
                  <section className='buttons'>
                  <div><img className='edit'src='/assets/images/config_admin2.png'/></div>
                  <div onClick={() =>{onDelete(crop.crop_id)}}><img className='harvest'src='/assets/images/cards/done.png'/></div>
                  </section>
              </div>
              )
          })}

        </section>
        
    </div>
  )
}
