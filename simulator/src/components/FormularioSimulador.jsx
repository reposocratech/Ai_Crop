import React, { useEffect, useState } from 'react';
import './style.scss'
import axios from 'axios';

const initialValue = {
  temperature: "",
  co2: "",
  humidity: "",
  sunlight: "",
  ph: "",
  conductivity: "",
  leaf_humidity: ""
}


export const FormularioSimulador = ({setShowGreenhouse, messageError, setMessageError, action, setAction, selectedGreenhouse, setSelectedGreenhouse}) => {

    const [datosForm, setDatosForm] = useState(initialValue);
    const [messageValid, setMessageValid] = useState("");
    const [messageError2, setMessageError2] = useState("");
    const [messageError3, setMessageError3] = useState("");
    const [greenhousesList, setGreenhousesList] = useState([]);


    useEffect(() => {
      axios
      .get(`http://localhost:4000/simulator/getGreenhousesList`)
      .then((res)=>{
        setGreenhousesList(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    
    }, [])

    const handleChange = (e) => {
        let {name, value} = e.target;
        setDatosForm({...datosForm, [name]: value});
        setMessageValid("");
        setMessageError2("")
    }

    const handleGreenhouse = (e) => {
      setSelectedGreenhouse(e.target.value); 
      if (e.target.value != ""){
        setShowGreenhouse(true);
        setAction(!action);
      }
    }

    useEffect(() => {

        if(datosForm.temperature !== "" && (datosForm.temperature > 50 || datosForm.temperature < 0)){
          setMessageError2("La temperatura debe tener un valor entre 0 C y 50 C");
        } else if (datosForm.temperature < 50 && datosForm.temperature > 0){
          setMessageError2("");
        }
  
        if (datosForm.co2 !== "" && (datosForm.co2 > 9999.99 || datosForm.co2 < 0)){
          setMessageError2("El CO2 debe tener un valor entre 0ppm y 9999,99ppm");
        } else if (datosForm.co2 < 9999,99 && datosForm.co2 > 0){
          setMessageError2("");
        }
  
        if (datosForm.humidity !== "" && (datosForm.humidity > 100 || datosForm.humidity < 0)){
          setMessageError2("La humedad debe tener un valor entre 0% y 100%");
        } else if (datosForm.humidity < 100 && datosForm.humidity > 0){
          setMessageError2("");
        }
  
        if (datosForm.sunlight !== "" && (datosForm.sunlight > 9999.99 || datosForm.sunlight < 0)){
          setMessageError2("La luz solar debe tener un valor entre 0nm y 9999,99nm");
        } else if (datosForm.sunlight < 9999,99 && datosForm.sunlight > 0){
          setMessageError2("");
        }
  
        if (datosForm.ph !== "" && (parseInt(datosForm.ph) > 14 || parseInt(datosForm.ph) < 0)){
          setMessageError3("El PH debe tener un valor entre 0 y 14");
        } else if (datosForm.ph < 14 && datosForm.ph > 0){
          setMessageError3("");
        } else if (datosForm.ph === ""){
          setMessageError3("");
        }
  
        if (datosForm.conductivity !== "" && (datosForm.conductivity > 9999.99 || datosForm.conductivity < 0)){
          setMessageError2("La conductividad debe tener un valor entre 0 mS/cm y 9999,99 mS/cm");
        } else if (datosForm.conductivity < 9999,99 && datosForm.ph > 0){
          setMessageError2("");
          
        }
  
        if (datosForm.leaf_humidity !== "" && (datosForm.leaf_humidity > 100 || datosForm.leaf_humidity < 0)){
          setMessageError2("La humedad de la hoja debe tener un valor entre 0% y 100%");
        } else if (datosForm.leaf_humidity < 100 && datosForm.ph > 0){
          setMessageError2("");
      }
    }, [datosForm])
    


    const handleSubmit = () => {
      if(messageError2 !== "" || messageError3 !== ""){
        return
      }
      if(!datosForm.temperature && !datosForm.co2 && !datosForm.humidity && !datosForm.sunlight && !datosForm.ph && !datosForm.conductivity && !datosForm.leaf_humidity ) {
        setMessageError2("Formulario vacío. Ingrese medidas a simular")
          setMessageValid("");
      } else {
        if(selectedGreenhouse === ""){
          setMessageError2("Elija un invernadero existente.")
          setMessageValid("");

        } else {
          axios
            .post('http://localhost:4000/simulator', {datosForm, selectedGreenhouse})
            .then((res)=>{
              setMessageError2("");
              setMessageValid("Datos recibidos correctamente!");
              setDatosForm(initialValue);
              setAction(!action);
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        }
      }     
  

  return (
    <section className='formulario'>
      <div id="floatContainer" className="float-container">

        <select id="greenhouse_id"
          required 
          name='greenhouse_id' 
          value={selectedGreenhouse}
          onChange={handleGreenhouse}>
          <option value={""}>Elije un invernadero</option>
          {greenhousesList?.map((elem, index)=>{
              return (
                <option key={index} value={elem.greenhouse_id}>{`${elem.greenhouse_name} (${elem.greenhouse_owner_full_name})`}</option>
              )
            })}
          </select>
      </div>

      <div id="floatContainer" className="float-container">

          <input type="number" 
          placeholder='Temperatura (C)'
          name='temperature' 
          value={datosForm.temperature}
          onChange={handleChange}
          />
          <img src='./assets/termometro.png'/>
      </div>

      <div id="floatContainer" className="float-container">
        
          <input type="number" 
          placeholder='CO2 (ppm)'
          name='co2' 
          value={datosForm.co2}
          onChange={handleChange}/>
          <img src='./assets/nube-de-co2.png'/>
      </div>
      <div id="floatContainer" className="float-container">
        
          <input type="number" 
          placeholder='Humedad (%)'
          name='humidity' 
          value={datosForm.humidity}
          onChange={handleChange}/>
          <img src='./assets/humedad.png'/>
      </div>
      <div id="floatContainer" className="float-container">
        
          <input type="number" 
          placeholder='Luz solar (nm)'
          name='sunlight' 
          value={datosForm.sunlight}
          onChange={handleChange}/>
          <img src='./assets/soleado.png'/>
      </div>
      <div id="floatContainer" className="float-container">
        
          <input type="number" 
          placeholder='PH'
          name='ph' 
          value={datosForm.ph}
          onChange={handleChange}/>
          <img src='./assets/doctorado.png'/>
      </div>
      <div id="floatContainer" className="float-container">
        
          <input type="number" 
          placeholder='CE (mS/cm)'
          name='conductivity' 
          value={datosForm.conductivity}
          onChange={handleChange}/>
          <img src='./assets/energia-renovable.png'/>
      </div>
      <div id="floatContainer" className="float-container">
        
          <input type="number" 
          placeholder='Humedad de la hoja (%)'
          name='leaf_humidity' 
          value={datosForm.leaf_humidity}
          onChange={handleChange}/>
          <img src='./assets/agua.png'/>
      </div>

      <button className='bg_verde' onClick={handleSubmit}>Simular</button>
      <p className='text-center mt-3 messageSent text-danger'>{messageError2}</p>
      <p className='text-center mt-3 messageSent text-danger'>{messageError3}</p>
      { messageValid != "" &&  
      <p className='messageSent'>{messageValid}</p>}
    </section> 

  )
}
