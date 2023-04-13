import axios from "axios";
import React from "react";
import { Modal } from "react-bootstrap";
import "./cropConfirmation.scss";

export const ConfirmationCropModal = ({
  setShowDeleteCrop,
  showDeleteCrop,
  setSelectedCrop,
  selectedCrop,
  setActionReload,
  actionReload,
}) => {
 

  const onDelete = () => {
    axios
      .put(`http://localhost:4000/crop/endCrop/${selectedCrop}`)
      .then((res) => {
        setActionReload(!actionReload);
        setShowDeleteCrop(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setShowDeleteCrop(false);
  };

  return (
    <Modal show={showDeleteCrop} onHide={handleClose} className='modalCropConfirm'>
      <Modal.Body className='divMasterCrop'>

        <section className='secPpal'>

          <div className='magicdiv'>
            <h1 className='paratext'>¿Quieres desactivar este cultivo?</h1>
            <p className=' mt-2'>Una vez desactivado, no podrás volver a activar este cultivo </p>
            <div  className='botoneraCrops'>
                <button className='botonCrops cancelar' onClick={handleClose}> x </button>
                <button className='botonCrops aceptar' onClick={onDelete}> Desactivar </button>
            </div>
          </div>
          
        </section>
      </Modal.Body>
    </Modal>
  );
};
