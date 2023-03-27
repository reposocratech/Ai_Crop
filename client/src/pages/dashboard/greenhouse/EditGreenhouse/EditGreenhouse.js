import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'



const initialValue = {
  greenhouse_name: "",
  greenhouse_location: "",
  greenhouse_orientation: "",
  greenhouse_size: "",
  greenhouse_type: "",
  greenhouse_latitude: "",
  greenhouse_longitude: "",
  
}

export const EditGreenhouse = () => {

  const [editGreenhouse, setEditGreenhouse] = useState(initialValue);
 
  const greenhouse_id = useParams().greenhouse_id;

  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get(`http://localhost:4000/greenhouse/details/${(greenhouse_id)}`)
    .then((res) => {
      setEditGreenhouse(res.data.resultGreenhouse[0]);
    })
    .catch((err) => {
      console.log(err);
    })
  
   
  }, [])
  
  console.log(editGreenhouse);
   
  const handleChange = (e) => {
    const {name, value} = e.target;
    setEditGreenhouse({...editGreenhouse, [name]:value});
  }

  



  const handleSubmit = () => {
    
      axios
        .put(`http://localhost:4000/greenhouse/editGreenhouse/${greenhouse_id}`,editGreenhouse)
        .then((res) => {
          console.log("blablabla",res);
          navigate(`/user/greenhouse/${greenhouse_id}`);
        })
        
        .catch((err) => {
          console.log(err);
        })
  }
  



  return (
      // 1ª PARTE FORMULARIO
      <div>
      <main className='main_creategh'>
        <section className='top_section'>
          <h5>Parece que deseas modificar algunos campos...</h5>
          <img className='leaf_img' src='/assets/images/leaf_form.png'/>
        </section>
        {/* SECCIÓN FORMULARIO */}
        <Form className='form_creategh1'>
          <p>Ponle un nombre:</p>
          <input
          placeholder='Mi huerto de albahaca'
          autoComplete='off'
          className='input_1'
          name='greenhouse_name'
          value={editGreenhouse.greenhouse_name}
          onChange={handleChange}
          />
          {/* LOCALIDAD Y ORIENTACIÓN */}
          <article className='input_group'>
            <div>
              <p>Localidad:</p>
              <input
              placeholder='Torremolinos'
              autoComplete='off'
              className='input_1'
              name='greenhouse_location'
              value={editGreenhouse.greenhouse_location}
              onChange={handleChange}
              />
            </div>
            <div>
              <p>Orientación:</p>
              <input
              className='input_1'
              placeholder='Norte'
              autoComplete='off'
              name='greenhouse_orientation'
              value={editGreenhouse.greenhouse_orientation}
              onChange={handleChange}
              />
            </div>
          </article>
          {/* EXTENSIÓN Y TIPO INVERNADERO */}
          <article className='input_group'>
            <div>
              <p>Extensión (m2):</p>
              <input
              placeholder='15m2'
              autoComplete='off'
              className='input_1'
              name='greenhouse_size'
              value={editGreenhouse.greenhouse_size}
              onChange={handleChange}
              />
            </div>
            <div>
              <p>Tipo:</p>
              <select
              autoComplete='off'
              className='input_1 dark content-select'
              name='greenhouse_type'
              value={editGreenhouse.greenhouse_type}
              onChange={handleChange}
              >   <option>Slecciona Método de cultivo</option>
                <optgroup label="Cultivos en agua">
                  <option value="NFT">NFT</option>
                  <option value="NGS">NGS</option>
                  <option value="Balsa flotante">Balsa flotante</option>
                </optgroup>
                <optgroup label="Cultivos en aire">
                  <option value="Aeropónica">Aeropónica</option>
                </optgroup>
                <optgroup label="Cultivos en sustratps">
                  <option value="Ebb & Flow">Ebb & Flow</option>
                  <option value="De mecha">De meca</option>
                  <option value="Goteo">Goteo</option>
                </optgroup>
              </select>
            </div>
          </article>
        </Form>
      </main>
      <div className='botoneraEdit d-flex flex-column'>
      <button className='botonAcept' onClick={handleSubmit}>Aceptar</button>
      </div>
    
      </div>
  )
}
