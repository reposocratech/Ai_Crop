import React, { useState } from 'react';
import { BotonSubmit } from './BotonSubmit';
import './style.scss';

const initialValue = {
  greenhouse_id: "",
  temperatura: "",
  co2: "",
  humedad: "",
  luz_solar: "",
  ph: "",
  ce: "",
  humedad_hoja: ""
}

export const FormularioSimulador = () => {

    const [datosForm, setDatosForm] = useState(initialValue);

    const handleChange = (e) => {
        let {name, value} = e.target;
        setDatosForm({...datosForm,[name]: value})    
        console.log(datosForm);
    }

  return (
    <div className='formCont'>
        <h1>MICROFRONT SIMULADOR</h1>
        <input 
        placeholder='greenhouse id'
        value={datosForm.greenhouse_id}
        name="greenhouse_id"
        onChange={handleChange}
        required
        />
        <input 
        placeholder='temperatura'
        value={datosForm.temperatura}
        name="temperatura"
        onChange={handleChange}
        required
        />
        <input 
        placeholder='co2'
        value={datosForm.co2}
        name="co2"
        onChange={handleChange}
        required
        />
        <input 
        placeholder='humedad'
        value={datosForm.humedad}
        name="humedad"
        onChange={handleChange}
        required
        />
        <input 
        placeholder='Luz Solar'
        value={datosForm.luz_solar}
        name="luz_solar"
        onChange={handleChange}
        />
        <input 
        placeholder='PH del agua'
        value={datosForm.ph}
        name="ph"
        onChange={handleChange}
        />
        <input 
        placeholder='Conductividad'
        value={datosForm.ce}
        name="ce"
        onChange={handleChange}
        />
        <input 
        placeholder='Humedad de la hoja'
        value={datosForm.humedad_hoja}
        name="humedad_hoja"
        onChange={handleChange}
        />
        <BotonSubmit 
        datosForm = {datosForm}
        />
    </div>
  )
}
