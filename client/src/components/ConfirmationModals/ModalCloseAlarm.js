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
        <Modal.Body className='modalCont'>
            <div className='noseque'>
                <p>¿Quieres desactivar esta alerta?</p>
                <label>Aaa</label>
                <textarea value={closeMessage} onChange={handleChange}></textarea>
                <button onClick={handleCloseAlarm}>Cerrar alarma</button>
            </div>
        </Modal.Body>
    </Modal>
    </div>
  )
}
