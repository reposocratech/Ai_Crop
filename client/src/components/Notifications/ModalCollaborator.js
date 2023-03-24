import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap';
import { AICropContext } from '../../context/AICropContext';
import './notification.scss'

export const ModalCollaborator = ({showModalCollab, setShowModalCollab, userCollaborator, setUserCollaborator}) => {

    const handleClose2 = () => {
        setShowModalCollab(false);
    }

  return (
    <>
    <Modal className='ModalTop' show={showModalCollab} onHide={handleClose2}>
        <Modal.Body className='modalCont'>

        {userCollaborator?.map((collab, index)=> {
            console.log(collab);
            return(
            <div key={index} className='emergencia'>
                <p>{collab.email}</p>
            </div>
            )
        })}
    </Modal.Body>
    </Modal>
     </>
    ) 
  
}
