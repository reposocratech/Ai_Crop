import React, { useContext, useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'
import { AICropContext } from '../../context/AICropContext';
import "./greenhousecard.scss"
import { saveLocalStorageAICropGreenhouse } from '../../helpers/localStorage/localStorageAICrop';
import axios from 'axios';
import { ModalExitCollab } from '../ConfirmationModals/ModalExitCollab';

export const CollaboratorCard = ({elem}) => {
  const navigate = useNavigate();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  // const {user, setActionReload, actionReload} = useContext(AICropContext);

  const onSubmit = () => {
    navigate(`greenhouse/${elem.greenhouse_id}`)
  }

  const handleModal = () => {
    setOpenConfirmModal(true);
  }

//   const onDeleteCollab = () => {
//     axios
//     .delete(`http://localhost:4000/greenhouse/deleteGreenhouseCollaborator/${elem.greenhouse_id}/${user.user_id}`)
//     .then((res)=>{
//         console.log("delete collab");
//         setActionReload(!actionReload);
//     })
//     .catch((err)=> {
//         console.log(err)
//     })
// } 

  if (!elem.active_alarms){
    elem.active_alarms = 0
  }

  console.log(elem, "collabbbb");
  return (
    <>
    <ModalExitCollab
      setOpenConfirmModal={setOpenConfirmModal}
      openConfirmModal={openConfirmModal}
      elem={elem}
    />
      <div className='cont_card_greenhouse'>
          <header className='card_header_colab'>
          </header>
          <div onClick={onSubmit} className='img_greenhouse'><img src='/assets/images/greenhouse.png'/></div>
          <main className='card_description'>
            <p className='title'>{elem.greenhouse_name}</p>
            <hr className='lineaGris'/>
            <p>Titular: {elem.owner_full_name}</p>
            <p>Alarmas activas: {elem.active_alarms}</p>
            <div onClick={handleModal}><img className='delete'src='/assets/images/delete.png'/></div>
            {elem.active_alarms ?
            <div className='alerta_cont'><img className='alerta' src='/assets/images/alerta.png'/></div> :
            <div></div>}
          </main>
      </div>
    </>
  )
}