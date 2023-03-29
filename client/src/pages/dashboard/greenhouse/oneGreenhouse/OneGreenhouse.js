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
import { ModalInvitation } from '../../../../components/greenhouseCards/ModalInvitation'
import { UpdateCropModal } from '../../../../components/Crop/UpdateCropModal'



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
  const [showModalInvitation, setShowModalInvitation] = useState(false)
  //-------------------el cropito-----------------------------------
  const [cropsCards, setCropsCards] = useState([]);
  const [showUpdateCrop, setShowUpdateCrop] = useState(false)
  const navigate = useNavigate();

  console.log(userAlarms, "PONTE ALGO QUE TE VAS A LIAR");
  
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
  

  console.log(cropsCards,"lainfo");


  
  


  const onDelete = ()=>{

    axios
        .get(`http://localhost:4000/crop/deleteCrop/${cropsCards[0]?.crop_id}`)
        .then((res)=>{
          // navigate(`greenhouse/${greenhouse_id}`)
          console.log(res.data,"aqui estoy");
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
        <ModalInvitation showModalInvitation={showModalInvitation} setShowModalInvitation={setShowModalInvitation} />
        <UpdateCropModal  showUpdateCrop={showUpdateCrop} setShowUpdateCrop={setShowUpdateCrop}></UpdateCropModal>

      </section>
      <header className='header_greenhouses'>
        <section className='title_row'>
          <h1>mi invernadero</h1>
          <article className='input_sect'>
          <div className='search_add'>
            <img alt='buscar' src='/assets/images/search.png'/>
            <input placeholder='Buscar cultivo'/>
          </div>
          <button className='search_add' onClick={() => setShowModalInvitation(true)}>
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
          <TemperatureCard temperatura = {temperatura} userAlarms = {userAlarms}/>}
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
        <section className='cardCrop'>
            
            {cropsCards?.map((crop, index)=> {
              
              return(
              <Card key={index} >
                  <p>Nombre: {crop.crop_name}</p>
                  <p>Especie: {crop.crop_plant_variety}</p>
                  <p>Extensión: {crop.crop_size}</p>
                  <p>Duración: {crop.crop_duration}</p>
                  <Button className='m-2' onClick={onDelete} >Eliminar </Button>
                  <Button className='m-2'onClick={() => setShowUpdateCrop(true)}>Editar </Button>
              </Card>
              )
          })}

        
        
        </section>
        
    </div>
  )
}
