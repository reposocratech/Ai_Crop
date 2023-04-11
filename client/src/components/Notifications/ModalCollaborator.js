import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap';
import { AICropContext } from '../../context/AICropContext';
import './notificationTwo.scss'
import axios from 'axios';

export const ModalCollaborator = ({showModalCollab, setShowModalCollab, userCollaborators, helpers}) => {

    const {setActionReload, actionReload} = useContext(AICropContext)

    const handleClose2 = () => {
        setShowModalCollab(false);
    }

  return (
    <Modal className='modalCollaborator' show={showModalCollab} onHide={handleClose2}>
        <Modal.Body className='modalCont2'>
         {userCollaborators?.length !== 0 || helpers?.length !== 0 ? 
         <>
        {userCollaborators?.map((collab, index)=> {
            const onDeleteCollab = () => {
                axios
                .delete(`http://localhost:4000/greenhouse/deleteGreenhouseCollaborator/${collab.greenhouse_id}/${collab.user_id}`)
                .then((res)=>{
                    console.log("delete collab");
                    setActionReload(!actionReload);
                })
                .catch((err)=> {
                    console.log(err)
                })
            } 
            
        
            return(
            <div key={index} className='emergencia2'>
                <p>Colaborador: {collab.email}</p>
                <img src='/assets/images/remove.png' onClick={onDeleteCollab}/>
            </div> 
            ) 
        })} 

        {helpers?.map((helper, index)=> {
            
            const onDeleteHelper = () => {
                axios
                .delete(`http://localhost:4000/greenhouse/deleteHelper/${helper.helper_id}`)
                .then((res)=>{
                    console.log("aaaaaaa");
                    setActionReload(!actionReload);
                })
                .catch((err)=> {
                    console.log(err)
                })
            }
            return(
            <div key={index} className='emergencia2'>
                <p>Ayudante: {helper.helper_email}</p>
                <img src='/assets/images/remove.png' onClick={onDeleteHelper}/>
            </div>
            )
        })}
        
        </>
        : <div className='d-flex justify-content-center text-center text-danger'>
        <h4>No existe ningún colaborador o ayudante. </h4>
     </div>}
        </Modal.Body>
    </Modal> 
    ) 
  
}
