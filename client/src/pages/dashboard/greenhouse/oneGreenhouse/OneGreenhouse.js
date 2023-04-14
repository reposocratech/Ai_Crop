import React, { useContext, useEffect, useState } from "react";
import { AICropContext } from "../../../../context/AICropContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Popover from '@mui/material/Popover';

import { TemperatureCard } from "../../../../components/CardsMeasures/TemperatureCard";
import { Co2Card } from "../../../../components/CardsMeasures/Co2Card";
import { HumidityCard } from "../../../../components/CardsMeasures/HumidityCard";
import { SunlightCard } from "../../../../components/CardsMeasures/SunlightCard";
import { PhCard } from "../../../../components/CardsMeasures/PhCard";
import { ConductivityCard } from "../../../../components/CardsMeasures/ConductivityCard";
import { LeafHumidity } from "../../../../components/CardsMeasures/LeafHumidity";

import { ButtonNotif } from "../../../../components/Notifications/ButtonNotif";
import { ModalNotif } from "../../../../components/Notifications/ModalNotif";
import { ButtonCollaborator } from "../../../../components/Notifications/ButtonCollaborator";
import { ModalCollaborator } from "../../../../components/Notifications/ModalCollaborator";
import { ModalInvitation } from "../../../../components/greenhouseCards/ModalInvitation";
import { UpdateCropModal } from "../../../../components/Crop/UpdateCropModal";
import { ConfirmationCropModal } from "../../../../components/Crop/ConfirmationCropModal";
import { ChartCrop } from "../../../../components/Crop/ChartCrop";

import axios from "axios";
import "./onegreenhouse.scss";
import "../allGreenhouses/allgreenhouses.scss";
import { PopoverCollab } from "../../../../components/Notifications/PopoverCollab";



export const OneGreenhouse = () => {

  // CARDS
  const [temperatura, setTemperatura] = useState();
  const [co2, setCo2] = useState();
  const [humedad, setHumedad] = useState();
  const [luzSolar, setLuzSolar] = useState();
  const [ph, setPh] = useState();
  const [conductividad, setConductividad] = useState();
  const [humedadHoja, setHumedadHoja] = useState();

  // CARD ALARM
  const [temperaturaAlarm, setTemperaturaAlarm] = useState({});
  const [co2Alarm, setCo2Alarm] = useState();
  const [humedadAlarm, setHumedadAlarm] = useState({});
  const [luzSolarAlarm, setLuzSolarAlarm] = useState({});
  const [phAlarm, setPhAlarm] = useState({});
  const [conductividadAlarm, setConductividadAlarm] = useState({});
  const [humedadHojaAlarm, setHumedadHojaAlarm] = useState({});

  
  // MODALES
  const [showModalNotif, setShowModalNotif] = useState(false);
  const [showModalCollab, setShowModalCollab] = useState(false);
  const [showModalInvitation, setShowModalInvitation] = useState(false);
  
  // INFO
  const [userCollaborators, setUserCollaborators] = useState();
  const [helpers, setHelpers] = useState();
  const [greenhouseData, setGreenhouseData] = useState();
  const [activeAlarms, setActiveAlarms] = useState();
  const [greenhouseAlarms, setGreenhouseAlarms] = useState([])
  
  // CROPITO
  const [cropsCards, setCropsCards] = useState([]);
  const [showUpdateCrop, setShowUpdateCrop] = useState(false);
  const [showDeleteCrop, setShowDeleteCrop] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState();

  const {actionReload, setActionReload, user} = useContext(AICropContext);
  const greenhouse_id = useParams().greenhouse_id;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/greenhouse/details/${(greenhouse_id)}`)
      .then((res) => {  
        setUserCollaborators(res.data.resultCollaborators);
        setHelpers(res.data.resultHelpers);
        setGreenhouseData(res.data.resultGreenhouse[0]);
        setCropsCards(res.data.resultActiveCrops);
        setGreenhouseAlarms(res.data.resultActiveAlarms);
        console.log(res.data)

        for (let i = 0; i < res.data.resultMeasure.length; i++){
          switch (res.data.resultMeasure[i].measurement_type_id){
            case 1:
              setTemperatura(res.data.resultMeasure[i]);
              break;
            case 2:
              setCo2(res.data.resultMeasure[i]);
              break;
            case 3:
              setHumedad(res.data.resultMeasure[i]);
              break;
            case 4:
              setLuzSolar(res.data.resultMeasure[i]);
              break;
            case 5:
              setPh(res.data.resultMeasure[i]);
              break;
            case 6:
              setConductividad(res.data.resultMeasure[i]);
              break;
            case 7:
              setHumedadHoja(res.data.resultMeasure[i]);
              break;
            default:
          }
        }

        for (let i = 0; i < res.data.resultActiveAlarms.length; i++){
          switch (res.data.resultActiveAlarms[i].measurement_type_id){
            case 1:
              setTemperaturaAlarm(res.data.resultActiveAlarms[i])
              console.log("ENTRÓ AL CASE 1", res.data.resultActiveAlarms[i]);
              break;
            case 2:
              setCo2Alarm(res.data.resultActiveAlarms[i])
              console.log("ENTRÓ AL CASE 2", res.data.resultActiveAlarms[i]);
              break;
            case 3:
              setHumedadAlarm(res.data.resultActiveAlarms[i])
              console.log("ENTRÓ AL CASE 3", res.data.resultActiveAlarms[i]);

              break;
            case 4:
              setLuzSolarAlarm(res.data.resultActiveAlarms[i])
              console.log("ENTRÓ AL CASE 4", res.data.resultActiveAlarms[i]);

              break;
            case 5:
              setPhAlarm(res.data.resultActiveAlarms[i])
              console.log("ENTRÓ AL CASE 5", res.data.resultActiveAlarms[i]);
              
              break;
            case 6:
              setConductividadAlarm(res.data.resultActiveAlarms[i])
              console.log("ENTRÓ AL CASE 6", res.data.resultActiveAlarms[i]);

              break;
            case 7:
              setHumedadHojaAlarm(res.data.resultActiveAlarms[i])
              console.log("ENTRÓ AL CASE 7", res.data.resultActiveAlarms[i]);

              break;
          
          }
        }
        console.log(temperaturaAlarm, "temperatura");
        console.log(co2Alarm, "co2");

      })
      .catch((err) => {
        console.log(err);
      });

      axios
        .get(`http://localhost:4000/server/alarm/seeActiveAlarms/${user?.user_id}`)
        .then((res)=>{
            setActiveAlarms(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

  }, [actionReload, greenhouse_id]);

  const openModalUdateCrop = (crop_id) => {
    setSelectedCrop(crop_id);
    setShowUpdateCrop(true);
  };

  const openModalDeleteCrop = (crop_id, is_active) => {
    if (is_active === 1) {
      setSelectedCrop(crop_id);
      setShowDeleteCrop(true);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAlarmNav = (greenhouse_id, measurement_type_id) => {
    navigate(`../greenhouse/${greenhouse_id}/${measurement_type_id}`)
}

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
      

  return (
    <div className="cont_greenhouses">
      <section className="botones_user">
        <button onClick={() => navigate("/user")}>
          <img alt="ir atrás" src="/assets/images/go_back.png" />
        </button>


        {greenhouseData?.user_owner_id === user?.user_id &&
        <button onClick={() => navigate(`/user/editGreenhouse/${greenhouse_id}`)}>
          <img 
            className='config_invernadero' 
            alt='configuracion invernadero' 
            src='/assets/images/editar_greenhouse.png'
          />
        </button>
        }
        
        {/* Modal Collaborator */}
        {/* <ButtonCollaborator 
          setShowModalCollab={setShowModalCollab}
        />
        <ModalCollaborator 
          showModalCollab={showModalCollab} 
          setShowModalCollab={setShowModalCollab} 
          userCollaborators={userCollaborators} 
          helpers={helpers}
        /> */}
        <PopoverCollab userCollaborators={userCollaborators} 
          helpers={helpers}/>

        {/* Modal Notificaciones*/}
        {/* <ButtonNotif 
          setShowModalNotif={setShowModalNotif}
        />
        <ModalNotif 
          showModalNotif={showModalNotif} 
          setShowModalNotif={setShowModalNotif}
        /> */}
        <button aria-describedby={id} variant="contained" onClick={handleClick} className='notificationButton'><img src='/assets/images/notification.png'/></button>
        <Popover
          className='popoverNotification'
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}>
            <section className='popover_sect'>
              {activeAlarms?.length !== 0 ?

              activeAlarms?.map((alarma, index)=> {

                  return(
                  <div onClick={() => {handleAlarmNav(alarma?.greenhouse_id, alarma?.measurement_type_id)}} className='emergencia' key={index}>
                      <p>{alarma?.alarm_message}</p>
                  </div>
                  )
              })
              : 
              <div className='no_info'>
                  <h4>No tienes alarmas activas</h4>
                  <img src='/assets/images/lirio-de-agua.png'/>
              </div>
              } 
          </section>
        </Popover>

        {/* Modal invitación Colaboradores*/}
        <ModalInvitation 
          showModalInvitation={showModalInvitation} 
          setShowModalInvitation={setShowModalInvitation} 
          greenhouse_name={greenhouseData?.greenhouse_name} 
        />

        {/* Modal editar crop */}
        <UpdateCropModal  
          showUpdateCrop={showUpdateCrop} 
          setShowUpdateCrop={setShowUpdateCrop} 
          setSelectedCrop={setSelectedCrop}
          selectedCrop={selectedCrop}
        />

        {/* Modal borrar crop */}
        <ConfirmationCropModal
          setShowDeleteCrop={setShowDeleteCrop}
          showDeleteCrop={showDeleteCrop}
          setSelectedCrop={setSelectedCrop}
          selectedCrop={selectedCrop}
          setActionReload={setActionReload}
          actionReload={actionReload}
        />
      </section>

      <header className="header_greenhouses">
        <section className="title_row">
          <h1>mi invernadero</h1>

          {greenhouseData?.user_owner_id === user?.user_id &&

            <article className='input_sect'>
            <button className='search_add' onClick={() => setShowModalInvitation(true)}>
            <img alt='añadir colaboradores' src='/assets/images/add_collaborator.png'/>
              Añadir colaboradores
            </button>
            </article>
          }

        </section>
        <div className="flex-column">
        <p>Nombre del invernadero: {greenhouseData?.greenhouse_name}</p>
        <p>Localidad: {greenhouseData?.greenhouse_location}</p>
        </div>
      </header>
      
      <main className='user-select-none'>

        <section className='cards_measures'>
          <TemperatureCard temperatura = {temperatura} temperaturaAlarm = {temperaturaAlarm}/>
          <Co2Card co2 = {co2} co2Alarm = {co2Alarm}/>
          <HumidityCard humedad = {humedad} humedadAlarm = {humedadAlarm}/>
          <SunlightCard luzSolar = {luzSolar} luzSolarAlarm = {luzSolarAlarm}/>
          <PhCard ph = {ph} phAlarm = {phAlarm}/>
          <ConductivityCard conductividad = {conductividad} conductividadAlarm = {conductividadAlarm}/>
          <LeafHumidity humedadHoja = {humedadHoja} humedadHojaAlarm = {humedadHojaAlarm}/>
          
        </section> 

      </main>

      <section className="cards_crop">
        {cropsCards?.map((crop, index) => {
          let filterdisabled = "";

          if (crop.is_active === 0) {
            filterdisabled = "disabledGreenhouse";
          }
          return (
            <div className={`card_crop ${filterdisabled}`} key={index}>
              <h4>{crop.crop_name.toUpperCase()}</h4>
              <p>{crop.crop_plant_variety}</p>

              <p>Duración: {crop.crop_duration} día(s)</p>
              <section className='buttons'>
                {greenhouseData?.user_owner_id === user?.user_id ?

                <div onClick={() =>{openModalUdateCrop(crop.crop_id)}}><img alt='icono editar' className='edit'src='/assets/images/config_admin2.png'/></div> 
                : 
                <div className='edit'></div>
                }

                <div className='chartCrop'>
                  <ChartCrop cropDuration = {crop.crop_duration} cropDays = {crop.days_passed}/>
                </div>

                {greenhouseData?.user_owner_id === user?.user_id ?
                
                <div onClick={() =>{openModalDeleteCrop(crop.crop_id,crop.is_active)}}><img alt='icono recoger cultivo' className='harvest'src='/assets/images/cards/done.png'/></div> 
                : 
                <div className='edit'></div>
                } 
              </section>
              
            </div>
          );
        })}
      </section>
    </div>
  );
};
