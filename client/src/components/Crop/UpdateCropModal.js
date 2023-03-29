import React from 'react'
import { Modal } from 'react-bootstrap'


export const UpdateCropModal = ({showUpdateCrop, setShowUpdateCrop}) => {

  const handleClose = ()=>{
    setShowUpdateCrop(false);
    
  }
  return (
    <>
      <Modal show={showUpdateCrop} onHide={handleClose}>
        
        <Modal.Body>
          <h1>holita</h1>

        </Modal.Body>

      </Modal>
    </>
  )
}
