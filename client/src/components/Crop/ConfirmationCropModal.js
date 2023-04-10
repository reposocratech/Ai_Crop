import axios from 'axios';
import React from 'react'
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './cropModal.scss'

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


    <>
      <Modal show={showDeleteCrop} onHide={handleClose}>
        
        <Modal.Body className='divMaster'>

          
        <section className='d-flex secPpal '>

<div className='d-flex justify-content-center magicdiv '>
        <h1 className='paratext'>Vas a desactivar este cultivo, ¿Estás seguro?</h1>
        <p className='paratext2'>Una vez desactivado, no podrás volver a activar este cultivo </p>
        <div  className='botoneraCrops'>
            <button className='botonCrops2' onClick={onDelete}> Aceptar </button>
            <button className='botonCrops' onClick={handleClose}> Cancelar </button>
        </div>
        

</div>


</section>

        </Modal.Body>

      </Modal>
    </>
    
    
  )
}
