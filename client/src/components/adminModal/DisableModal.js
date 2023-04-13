import axios from 'axios'
import React from 'react'
import { Modal } from 'react-bootstrap'



export const DisableModal = ({showDisable, setShowDisable, action, setAction,selectedElem}) => {

    const onDisable = (user_id) => {
        axios
          .get(`http://localhost:4000/admin/disableUser/${user_id}`)
          .then((res)=>{
            setAction(!action);
            setShowDisable(false);
          })
          .catch((err)=>{
            console.log(err);
          })
      }
  
      const onEnable = (user_id) => {
        axios
          .get(`http://localhost:4000/admin/enableUser/${user_id}`)
          .then((res)=>{
            setAction(!action);
            setShowDisable(false);
          })
          .catch((err)=>{
            console.log(err);
          })
      }


    const handleClose = ()=>{
    setShowDisable(false)
    }

    console.log(showDisable,"llegas?");
  return (
    <Modal className='modalCloseAlarm' show={showDisable} onHide={handleClose}>
    
    <Modal.Body className='modalCont'>
        <div>
        {!selectedElem.is_disabled ?

           <h4>
                estás a punto de deshabilitar al usuario,¿estás seguro?</h4>:
           <h4>
                El usuario va a ser Habilitado,bist du sicher
            </h4>}

           {!selectedElem.is_disabled ? 

                <button onClick={()=> {onDisable(selectedElem.user_id)}}> Aceptar </button> 
                :
                <button onClick={()=> {onEnable(selectedElem.user_id)}}> Aceptar </button> 
                } 

        </div>
        
    </Modal.Body>
</Modal>
  )
}
