import React, { useState } from 'react';
import './style.scss'
import axios from 'axios';

const initialValue = {
  temperatura: "",
  co2: "",
  humedad: "",
  luz_solar: "",
  ph: "",
  ce: "",
  humedad_hoja: ""
}

const initialGreenhouse = {
  greenhouse_id: "",
  greenhouse_name: ""
}

export const FormularioSimulador = ({setGreenhouse_id, setShowGreenhouse, messageError, setMessageError}) => {

    const [datosForm, setDatosForm] = useState(initialValue);
    const [greenhouse, setGreenhouse] = useState(initialGreenhouse);
    const [messageValid, setMessageValid] = useState("");

    const handleChange = (e) => {
        let {name, value} = e.target;
        setDatosForm({...datosForm,[name]: value})    
    }

    const handleGreenhouse = (e) => {
      let {name, value} = e.target;
      setGreenhouse({...greenhouse,[name]: value})  
    }

    const seeGreenhouse = () => {
      setGreenhouse_id(greenhouse.greenhouse_id)
      setShowGreenhouse(true)
    }

    const handleSubmit = () => {

      if(!datosForm.temperatura && !datosForm.co2 && !datosForm.humedad && !datosForm.luz_solar && !datosForm.ph && !datosForm.ce && !datosForm.humedad_hoja ) {
          setMessageError("Formulario vacío. Ingrese medidas a simular")
      } else {
          console.log("DATOS ENVIADOS: ", {datosForm, greenhouse});
          axios
              .post('http://localhost:4000/simulator', {datosForm, greenhouse})
              .then((res)=>{
                console.log(res.data);
                setMessageError("")
                setMessageValid("Datos recibidos correctamente!")

              })
              .catch((err)=>{
                  console.log(err)
              })
      }      
  }

  return (
    <section className='formulario'>
      { messageValid != "" &&  
      <p className='messageSended'>{messageValid}</p>}
      <article className='greenhouse'>
      <div id="floatContainer" className="float-container">
          {/* <label htmlFor="floatField">ID de invernadero</label> */}
          <input 
            type="number"
            placeholder='ID de Invernadero'
            value={greenhouse.greenhouse_id}
            name="greenhouse_id"
            onChange={handleGreenhouse}
          />
      </div>
      <div id="floatContainer" className="float-container">
        {/* <label htmlFor="floatField">Nombre del invernadero</label> */}
        <input 
          type="text"
          placeholder='Nombre del invernadero'
          value={greenhouse.greenhouse_name}
          name="greenhouse_name"
          onChange={handleGreenhouse}
        />
      </div>
      </article>

      <div id="floatContainer" className="float-container">
          {/* <label htmlFor="floatField">Temperatura</label> */}
          <input type="number" 
          placeholder='Temperatura (C)'
          name='temperatura' 
          value={greenhouse.temperatura}
          onChange={handleChange}
          />
          <img src='./assets/termometro.png'/>
      </div>

      <div id="floatContainer" className="float-container">
          {/* <label htmlFor="floatField">CO2</label> */}
          <input type="number" 
          placeholder='CO2 (ppm)'
          name='co2' 
          value={greenhouse.co2}
          onChange={handleChange}/>
          <img src='./assets/nube-de-co2.png'/>
      </div>
      <div id="floatContainer" className="float-container">
          {/* <label htmlFor="floatField">Humedad</label> */}
          <input type="number" 
          placeholder='Humedad (%)'
          name='humedad' 
          value={greenhouse.humedad}
          onChange={handleChange}/>
          <img src='./assets/humedad.png'/>
      </div>
      <div id="floatContainer" className="float-container">
          {/* <label htmlFor="floatField">Luz solar</label> */}
          <input type="number" 
          placeholder='Luz solar (nm)'
          name='luz_solar' 
          value={greenhouse.luz_solar}
          onChange={handleChange}/>
          <img src='./assets/soleado.png'/>
      </div>
      <div id="floatContainer" className="float-container">
          {/* <label htmlFor="floatField">PH</label> */}
          <input type="number" 
          placeholder='PH'
          name='ph' 
          value={greenhouse.ph}
          onChange={handleChange}/>
          <img src='./assets/doctorado.png'/>
      </div>
      <div id="floatContainer" className="float-container">
          {/* <label htmlFor="floatField">Conductividad Eléctrica</label> */}
          <input type="number" 
          placeholder='CE (mS/cm)'
          name='ce' 
          value={greenhouse.ce}
          onChange={handleChange}/>
          <img src='./assets/energia-renovable.png'/>
      </div>
      <div id="floatContainer" className="float-container">
          {/* <label htmlFor="floatField">Humedad de la hoja</label> */}
          <input type="number" 
          placeholder='Humedad de la hoja (%)'
          name='humedad_hoja' 
          value={greenhouse.humedad_hoja}
          onChange={handleChange}/>
          <img src='./assets/agua.png'/>
      </div>

      <article className='button_section'>
        <button onClick={seeGreenhouse}>Ver Invernadero</button>
        <button className='bg_verde' onClick={handleSubmit}>Simular</button>
      </article>
      <p className='text-center mt-3 text-danger'>{messageError}</p>

    </section> 

  )
}
