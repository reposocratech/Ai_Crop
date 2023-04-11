import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import './cropModal.scss' 

export const UpdateCropModal = ({showUpdateCrop, setShowUpdateCrop, selectedCrop}) => {

  const greenhouse_id = useParams().greenhouse_id;

  const {actionReload, setActionReload} = useContext(AICropContext);
  const [editCropInfo, setEditCropInfo] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(selectedCrop){
      axios
        .get(`http://localhost:4000/crop/getOneCrop/${selectedCrop}`)
        .then((res)=>{
          console.log(selectedCrop);
          setEditCropInfo(res.data[0]);
          console.log(res.data[0],"soy el cropitoinfo");
        })
    }
  }, [selectedCrop])

  const handleChange = (e)=>{
    const { name,value} = e.target;
    setEditCropInfo({...editCropInfo, [name]:value,greenhouse_id:greenhouse_id})
    setErrorMessage("");
  }

  const handleClose = ()=>{
    setShowUpdateCrop(false);
    setErrorMessage("");
  }

  const handleSubmit = ()=> {
    if(editCropInfo?.crop_name && editCropInfo?.crop_plant_variety && editCropInfo?.crop_duration && editCropInfo?.crop_size){

      axios
        .put(`http://localhost:4000/Crop/editCrop/${selectedCrop}`, editCropInfo)
        .then((res)=>{ 
          setErrorMessage("");
          setShowUpdateCrop(false);
          setActionReload(!actionReload);
        })
        .catch((err)=>{console.log(err)})
    } else {
      setErrorMessage("Debes rellenar todos los campos");
    }

  }

  const handleSubmit2 = ()=> {

    axios
      .delete(`http://localhost:4000/crop/deleteCrop/${selectedCrop}`)
      .then((res)=>{ 
        setShowUpdateCrop(false);
        setActionReload(!actionReload);
      })
      .catch((err)=>{console.log(err)})
  
  }
 
  return (
    <Modal show={showUpdateCrop} onHide={handleClose} className='modalCropPpal'>
      <Modal.Body className='divMasterCrop'>

        <section className='d-flex secPpal '>
            <h2>Editar cultivo</h2>

            <input
              className='note'
              type="text"
              placeholder='Nombre del cultivo'
              value={editCropInfo?.crop_name}
              onChange={handleChange}
              name="crop_name"
              autoComplete='off'
            />

            <input
              className='note'
              type="text"
              placeholder='especie vegetal'
              value={editCropInfo?.crop_plant_variety}
              onChange={handleChange}
              name="crop_plant_variety"
              autoComplete='off'
            />

            <input
              className='note'
              type="number"
              placeholder='duración estimada'
              value={editCropInfo?.crop_duration}
              onChange={handleChange}
              name="crop_duration"
              autoComplete='off'
            />

            <input
              className='note'
              type="number"
              placeholder='Extensión'
              value={editCropInfo?.crop_size}
              onChange={handleChange}
              name="crop_size"
              autoComplete='off'
            />
            
            <div className='botoneraCrops'>
            <button className='botonCrops' onClick={handleSubmit}>Editar</button>
            <button className='botonCrops' onClick={handleSubmit2}>Eliminar</button>
            </div>
            <p className='text-center text-danger mt-1 mb-1'> {errorMessage && errorMessage}</p>

        </section>

      </Modal.Body>
    </Modal>
  )
}
