import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AICropContext } from '../../context/AICropContext'
import './modalclosealarm.scss'


export const ModalCloseAlarm = ({showModalCloseAlarm, setShowModalCloseAlarm, onClose, closeMessage, setCloseMessage}) => {

    const navigate = useNavigate();

    const handleClose = () =>{
        setShowModalCloseAlarm(false)
    }

    const handleCloseAlarm = () => {
        setShowModalCloseAlarm(false)
        onClose();
        setActionReload(true);
    }
    
    const handleChange = (e) => {
        setCloseMessage(e.target.value)
        console.log(closeMessage, "clousemeseech")
    }

    const {actionReload, setActionReload} = useContext(AICropContext)

  return (
    <div className='modalCloseAlarm'>
    <Modal className='modal' show={showModalCloseAlarm} onHide={handleClose}>
        <div className='alarmm'>
        <h1 className='tituloAlarm'>Desactivar Alarma</h1>
        </div>

        <Modal.Body className='modalCont'>
            <div>
                <p className='parrafAlarm'>Explique brevemente el manejo de la alerta</p>
            </div>
            <div className='noseque'>
                <textarea value={closeMessage} onChange={handleChange}></textarea> 
            </div>
            <div className='d-flex justify-content-center'>
                <button className='botonInv alrm' onClick={handleCloseAlarm}>Cerrar alarma</button>
            </div>
           
        </Modal.Body>
    </Modal>
    </div>
  )
}
