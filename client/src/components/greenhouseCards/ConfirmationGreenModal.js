import axios from "axios";
import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AICropContext } from "../../context/AICropContext";

export const ConfirmationGreenModal = ({
  openConfirmModal,
  setOpenConfirmModal,
  elem,
}) => {
  const { user, setActionReload, actionReload } = useContext(AICropContext);

  const navigate = useNavigate();

    const {user, setActionReload, actionReload} = useContext(AICropContext);

    const navigate = useNavigate();
    
    const handleClose = () => {
      setOpenConfirmModal(false);
    }

    const onDelete = () => {
      axios
        .get(`http://localhost:4000/greenhouse/deleteGreenhouse/${elem.greenhouse_id}`)
        .then((res)=>{
            navigate('/user');
            setOpenConfirmModal(false);
            setActionReload(!actionReload);
            
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <>
        <Modal show={openConfirmModal} onHide={handleClose}>
          <Modal.Body className='divMaster'>
        <section className='d-flex secPpal '>
        <div className='d-flex justify-content-center magicdiv flex-column align-items-center'>
            <h1 className='paratext'>Estas a punto de eliminar este invernadero</h1>
            <p className='paratext2'>¿Deseas Continuar?</p>
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

