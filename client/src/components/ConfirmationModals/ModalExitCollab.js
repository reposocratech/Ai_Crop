import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { AICropContext } from '../../context/AICropContext';
import axios from 'axios';

export const ModalExitCollab = ({elem, setOpenConfirmModal, openConfirmModal}) => {
  const {user, actionReload, setActionReload} = useContext(AICropContext);

  const handleClose = () => {
    setOpenConfirmModal(false);
  }

  const onDeleteCollab = () => {
    axios
    .delete(`http://localhost:4000/greenhouse/deleteGreenhouseCollaborator/${elem.greenhouse_id}/${user.user_id}`)
    .then((res)=>{
        console.log("delete collab");
        setActionReload(!actionReload);
    })
    .catch((err)=> {
        console.log(err)
    })
} 

  return (
    <>
      <Modal show={openConfirmModal} onHide={handleClose}>
        <Modal.Body className='divMaster'>
      <section className='d-flex secPpal '>
      <div className='d-flex justify-content-center magicdiv flex-column align-items-center'>
          <h1 className='paratext'>¿Quieres dejar de colaborar en este invernadero?</h1>
        <div  className='botoneraCrops'>
            <button className='botonCrops2' onClick={onDeleteCollab}> Aceptar </button>
            <button className='botonCrops' onClick={handleClose}> Cancelar </button>
        </div>
      </div>
      </section>
        </Modal.Body>
      </Modal>
    </>
  )
}
