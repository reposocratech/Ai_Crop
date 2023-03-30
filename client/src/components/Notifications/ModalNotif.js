import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { AICropContext } from '../../context/AICropContext'
import './notification.scss'

export const ModalNotif = ({showModalNotif, setShowModalNotif}) => {

    const handleClose = () => {
        setShowModalNotif(false);
    }

    const {userAlarms} = useContext(AICropContext)    

  return (
    <Modal className='modalNotification' show={showModalNotif} onHide={handleClose}>
        <Modal.Body className='modalCont'>

        {userAlarms?.map((alarma, index)=> {

            return(
            <div className='emergencia' key={index}>
                <p>{alarma?.alarm_message}</p>
            </div>
            )
        })}
    </Modal.Body>
    </Modal>
    ) 
}

            
            
        
  
