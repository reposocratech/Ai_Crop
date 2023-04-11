import axios from 'axios';
import React from 'react'
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
// import './cropModal.scss'
import'./cropConfirmation.scss'

export const ConfirmationCropModal = ({setShowDeleteCrop,showDeleteCrop,setSelectedCrop,selectedCrop,setActionReload,actionReload}) => {

  const greenhouse_id = useParams().greenhouse_id; 

  const onDelete = ()=>{
    axios
      .put(`http://localhost:4000/crop/endCrop/${selectedCrop}`)
      .then((res)=>{
        setActionReload(!actionReload);
        setShowDeleteCrop(false)
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  const handleClose = ()=>{
    setShowDeleteCrop(false);
  }

  return (
    <Modal show={showDeleteCrop} onHide={handleClose} className='modalCropConfirm'>
      <Modal.Body className='divMasterCrop'>

        <section className='secPpal'>

          <div className='magicdiv'>
            <h1 className='paratext'>Vas a desactivar este cultivo.</h1>
            <h1 className='paratext'>¿Estás seguro?</h1>
            <p className='text-danger mt-2'>Una vez desactivado, no podrás volver a activar este cultivo </p>
            <div  className='botoneraCrops'>
                <button className='botonCrops aceptar' onClick={onDelete}> Desactivar </button>
                <button className='botonCrops cancelar' onClick={handleClose}> x </button>
            </div>
          </div>

        </section>

      </Modal.Body>
    </Modal>
  )
}
