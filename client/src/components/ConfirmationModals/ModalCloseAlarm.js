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
        setActionReload(!actionReload);
    }
    
    const handleChange = (e) => {
        setCloseMessage(e.target.value)
    }

    const {actionReload, setActionReload} = useContext(AICropContext)

  return (
    <Modal className='modalCloseAlarm' show={showModalCloseAlarm} onHide={handleClose}>
        <div className='alarmm'>
        <h1 className='tituloAlarm'>Desactivar Alarma</h1>
        </div>

        <Modal.Body className='modalCont'>
            <div>
                <p className='parrafAlarm'>Explique brevemente el manejo de la alerta</p>
            </div>
            <textarea value={closeMessage} onChange={handleChange}></textarea> 
            <button className='botonInv alrm' onClick={handleCloseAlarm}>Cerrar alarma</button>
        </Modal.Body>
    </Modal>
  )
}
