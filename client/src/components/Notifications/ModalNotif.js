import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { AICropContext } from '../../context/AICropContext'
import './notification.scss'

export const ModalNotif = ({showModalNotif, setShowModalNotif}) => {
   
    const {user, actionReload} = useContext(AICropContext)   
    const [activeAlarms, setActiveAlarms] = useState() 

    useEffect(() => {
        axios
        .get(`http://localhost:4000/server/alarm/seeActiveAlarms/${user?.user_id}`)
        .then((res)=>{
            setActiveAlarms(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

    }, [actionReload])
    
    const handleClose = () => {
        setShowModalNotif(false);
    }
    
  return (
    <Modal className='modalNotification' show={showModalNotif} onHide={handleClose}>
        <Modal.Body className='modalCont'>

        {activeAlarms?.map((alarma, index)=> {

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

            
            
        
  
