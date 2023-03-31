import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap';
import { AICropContext } from '../../context/AICropContext';
import './notificationTwo.scss'

export const ModalCollaborator = ({showModalCollab, setShowModalCollab, userCollaborators, helpers}) => {

    const handleClose2 = () => {
        setShowModalCollab(false);
    }

  return (
    <Modal className='modalCollaborator' show={showModalCollab} onHide={handleClose2}>
        <Modal.Body className='modalCont2'>
        {userCollaborators?.map((collab, index)=> {
            // console.log(collab);
            return(
            <div key={index} className='emergencia2'>
                <p>Colaborador: {collab.email}</p>
            </div> 
            )
        })}
        {helpers?.map((helper, index)=> {
            // console.log(helper);
            return(
            <div key={index} className='emergencia2'>
                <p>Ayudante: {helper.helper_email}</p>
            </div>
            )
        })}
        </Modal.Body>
    </Modal> 
    ) 
  
}
