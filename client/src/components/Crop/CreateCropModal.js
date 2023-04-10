import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { AICropContext } from '../../context/AICropContext'
import './cropModal.scss'

 
const initialValueInfo = {

  crop_name: "",
  crop_plant_variety:"",
  crop_duration: "",
  crop_size: "",
  greenhouse_id: 0,
}

export const CreateCropModal = ({showModalCrop, setShowModalCrop}) => {

  const greenhouse_id = useParams().greenhouse_id;
  
  const [cropInfo, setcropInfo] = useState(initialValueInfo);
  const [errorMessage, setErrorMessage] = useState("")
  const {actionReload, setActionReload} = useContext(AICropContext);
  const navigate = useNavigate()

  const handleClose = ()=>{
    setShowModalCrop(false);
    setActionReload(!actionReload);
  }

 
 const handleChange = (e)=>{

  const { name,value} = e.target;
  setcropInfo({...cropInfo, [name]:value,greenhouse_id:greenhouse_id})
  setErrorMessage("")

 }

 const handleSubmit = ()=> {
    if (cropInfo?.crop_name && cropInfo?.crop_plant_variety && cropInfo?.crop_duration && cropInfo?.crop_size){

      axios
        .post(`http://localhost:4000/crop/createCrop`, cropInfo)
        .then((res)=>{ 
          setShowModalCrop(false);
          setActionReload(!actionReload);
          setcropInfo(initialValueInfo);
          setErrorMessage("")

        })
        .catch((err)=>{console.log(err);})
        
    } else {
      setErrorMessage("Debes completar todos los campos")
    }
 }
 
  

  return (
    <Modal show={showModalCrop} onHide={handleClose}>
      <Modal.Body className='divMaster'>

        <section className='secPpal'>

          <input
            className='note'
            type="text"
            placeholder='Nombre del cultivo'
            value={cropInfo?.crop_name}
            onChange={handleChange}
            name="crop_name"
            autoComplete='off'
          />

          <input
            className='note'
            type="text"
            placeholder='Especie vegetal'
            value={cropInfo?.crop_plant_variety}
            onChange={handleChange}
            name="crop_plant_variety"
            autoComplete='off'
          />
        
          <input
            className='note'
            type="number"
            placeholder='Duración estimada'
            value={cropInfo?.crop_duration}
            onChange={handleChange}
            name="crop_duration"
            autoComplete='off'
          />  

          <input
            className='note'
            type="number"
            placeholder='Extensión'
            value={cropInfo?.crop_size}
            onChange={handleChange}
            name="crop_size"
            autoComplete='off'
          />

          <button className='botonCrops' onClick={handleSubmit}>Añadir</button>
          <p className='text-center text-danger mt-1 mb-1'> {errorMessage && errorMessage}</p>

        </section>

      </Modal.Body>
    </Modal>

  )
}


         
        