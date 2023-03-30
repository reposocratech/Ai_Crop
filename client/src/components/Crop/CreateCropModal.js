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
  const {actionReload, setActionReload} = useContext(AICropContext);
const navigate = useNavigate()

  



  const handleClose = ()=>{
    setShowModalCrop(false);
    
  }

 
 const handleChange = (e)=>{

  const { name,value} = e.target;
  setcropInfo({...cropInfo, [name]:value,greenhouse_id:greenhouse_id})

 }

 const handleSubmit = ()=> {

    axios
        .post(`http://localhost:4000/crop/createCrop`, cropInfo)
        .then((res)=>{ 
          setShowModalCrop(false);
          setActionReload(!actionReload);
        })
        .catch((err)=>{console.log(err);})

  
 }
 
  

  return (

    <>
      <Modal show={showModalCrop} onHide={handleClose}>
        
        <Modal.Body className='divMaster'>
          <section className='d-flex secPpal'>

            <div className='d-flex justify-content-center'>

          <input
          className='note'
          type="text"
          placeholder='Nombre del cultivo'
          value={cropInfo?.crop_name}
          onChange={handleChange}
          name="crop_name"
          />
         </div>
            <div className='d-flex justify-content-center'>

          <input
          className='note'
          type="text"
          placeholder='especie vegetal'
          value={cropInfo?.crop_plant_variety}
          onChange={handleChange}
          name="crop_plant_variety"
        />
         </div>
            <div className='d-flex justify-content-center'>

          <input
          className='note'
          type="number"
          placeholder='duración estimada'
          value={cropInfo?.crop_duration}
          onChange={handleChange}
          name="crop_duration"
        />
         </div>
            <div className='d-flex justify-content-center'>

          <input
          className='note'
          type="number"
          placeholder='Extensión'
          value={cropInfo?.crop_size}
          onChange={handleChange}
          name="crop_size"
        />
         </div>


            <div>

          <input
          type="number"
          placeholder='Extensión'
          value={cropInfo?.crop_size}
          onChange={handleChange}
          name="crop_size"
        />
         </div>

         <div className='botoneraCrops'>
            <button className='botonCrops' onClick={handleSubmit}>Añadir</button>
         </div>


          </section>
         
        

        </Modal.Body>

      </Modal>
    </>

  )
}