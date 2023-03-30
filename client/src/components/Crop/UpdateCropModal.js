import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import './cropModal.scss' 

export const UpdateCropModal = ({showUpdateCrop, setShowUpdateCrop,selectedCrop,setSelectedCrop}) => {

  const greenhouse_id = useParams().greenhouse_id;

  const [showEdit, setShowEdit] = useState(false);
  const {actionReload, setActionReload} = useContext(AICropContext);
  const [editCropInfo, setEditCropInfo] = useState()

  const handleChange = (e)=>{

    const { name,value} = e.target;
    setEditCropInfo({...editCropInfo, [name]:value,greenhouse_id:greenhouse_id})
  
   }


  const handleClose = ()=>{
    setShowUpdateCrop(false);
  }


  const handleSubmit = ()=> {

     axios
         .put(`http://localhost:4000/Crop/editCrop/${selectedCrop}`, editCropInfo)
        .then((res)=>{ 
          
          setShowUpdateCrop(false);
          setActionReload(!actionReload);
         })
        .catch((err)=>{console.log(err);})

  
 }
  const handleSubmit2 = ()=> {

     axios
        .delete(`http://localhost:4000/crop/deleteCrop/${selectedCrop}`)
        .then((res)=>{ 
          setShowUpdateCrop(false);
          setActionReload(!actionReload);
        })
        .catch((err)=>{console.log(err);})
 
  
 }

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


 
  return (
    <>
      <Modal show={showUpdateCrop} onHide={handleClose}>
        
        <Modal.Body className='divMaster'>

          
        <section className='d-flex secPpal '>

<div className='d-flex justify-content-center'>

<input
 className='note'
type="text"
placeholder='Nombre del cultivo'
value={editCropInfo?.crop_name}
onChange={handleChange}
name="crop_name"
/>
</div>
<div className='d-flex justify-content-center'>

<input
className='note'
type="text"
placeholder='especie vegetal'
value={editCropInfo?.crop_plant_variety}
onChange={handleChange}
name="crop_plant_variety"
/>
</div>
<div className='d-flex justify-content-center'>

<input
className='note'
type="number"
placeholder='duración estimada'
value={editCropInfo?.crop_duration}
onChange={handleChange}
name="crop_duration"
/>
</div>
<div className='d-flex justify-content-center'>

<input
className='note'
type="number"
placeholder='Extensión'
value={editCropInfo?.crop_size}
onChange={handleChange}
name="crop_size"
/>
</div>

{/* <div className='d-flex justify-content-center'>

<input
className='note'
type="number"
placeholder='Extensión'
value={editCropInfo?.crop_size}
onChange={handleChange}
name="crop_size"
/>
</div> */}

<div className='botoneraCrops'>
<button className='botonCrops' onClick={handleSubmit}>Editar</button>

<button className='botonCrops2' onClick={handleSubmit2}>Eliminar</button>

</div>


</section>

        </Modal.Body>

      </Modal>
    </>
  )
}
