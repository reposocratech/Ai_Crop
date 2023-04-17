import React, { useState, useContext, useEffect } from 'react'
import { AICropContext } from '../../../../context/AICropContext';
import { OwnerCard } from '../../../../components/greenhouseCards/OwnerCard';
import { CollaboratorCard } from '../../../../components/greenhouseCards/CollaboratorCard';
import { ButtonNotif } from '../../../../components/Notifications/ButtonNotif';
import { ModalNotif } from '../../../../components/Notifications/ModalNotif';
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import axios from 'axios'
import './allgreenhouses.scss'
import './notifAlarmsModal.scss'


export const AllGreenhouses = () => {

  const {user, actionReload} = useContext(AICropContext);
  const [greenhousesInfo, setGreenhousesInfo] = useState();
  const [showModalNotif, setShowModalNotif] = useState(false);
  const [activeAlarms, setActiveAlarms] = useState();

  const navigate = useNavigate();

  let numberOfGreenHouses =
    greenhousesInfo?.resultOwner.length +
    greenhousesInfo?.resultCollaborator.length;

  useEffect(() => {
    if(user){
      axios
        .get(`http://localhost:4000/greenhouse/getAllGreenhouses/${user.user_id}`)
        .then((res)=>{
          setGreenhousesInfo(res.data)
        })
        .catch((err)=>{
          console.log(err);
        })
      }

      axios
      .get(`http://localhost:4000/server/alarm/seeActiveAlarms/${user?.user_id}`)
      .then((res)=>{
          setActiveAlarms(res.data);
      })
      .catch((err)=>{
          console.log(err);
      })
  }, [user])

    
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
    <div className='cont_greenhouses'>
      <section className='botones_user'>
        <button onClick={()=>navigate('/')}><img alt='icono atrás' src='/assets/images/go_back.png'/></button>
        {/* <ButtonNotif setShowModalNotif={setShowModalNotif}/> */}
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
        <ModalNotif showModalNotif={showModalNotif} setShowModalNotif={setShowModalNotif}/>
      </section>
      
      <header className="header_greenhouses">
        <section className="title_row">
          <h1>mis invernaderos</h1>
        </section>
        {greenhousesInfo && 
        <p>Actualmente hay {numberOfGreenHouses} invernadero(s) activo(s)</p>}
      </header>
      
      <main>
        {user?.user_type === 2 && 
        <>
          <h2>Invernaderos del usuario</h2>
          <section className='greenhouse_list user-select-none'>
          {greenhousesInfo && greenhousesInfo.resultOwner.map((elem, index)=>{
             return (
               <div key={index}>
                 <OwnerCard elem={elem} />
               </div>
             );
           })}

          </section>
        </>
        }
      
        <h2>Invernaderos donde colabora el usuario</h2>
        <section className='greenhouse_list user-select-none'>
          {greenhousesInfo && greenhousesInfo.resultCollaborator.map((elem, index)=>{
                return (
                  <div key={index}>
                    <CollaboratorCard 
                    elem = {elem}
                    />
                  </div>
                )
            })
          }
        </section>
      
      </main>
    </div>
  );
};
