import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const GreenhouseInfo = ({greenhouse_id, setGreenhouse_id, ver}) => {
  const [activeAlarms, setActiveAlarms] = useState(0);
  const [activeCrops, setActiveCrops] = useState();
  const [greenhouse, setGreenhouse] = useState();
  const [parameters, setParameters] = useState();



  useEffect(() => {

    axios
      .get(`http://localhost:4000/greenhouse/details/${greenhouse_id}`)
      .then((res)=>{
        console.log(res.data);
        setActiveAlarms(res.data.resultActiveAlarms.length);
        setActiveCrops(res.data.resultActiveCrops);
        setGreenhouse(res.data.resultGreenhouse[0]);
        setParameters(res.data.resultParameters);
      })
      .catch((err)=>{
        console.log(err)
      })

  }, [greenhouse_id, ver])
  if (greenhouse){
    return (
      <div className='greenhouseInfo'>
        <h2>{greenhouse.greenhouse_name} - <span className='alarmas'>{activeAlarms} alarmas activas</span></h2>
        <p>{greenhouse.greenhouse_location}</p>
        <br />
        <h4>Parámetros mínimos y máximos para las alarmas</h4>
        <p>Temperatura: {parameters[0].min}{parameters[0].unit} - {parameters[0].max}{parameters[0].unit}</p>
        <p>CO2: {parameters[1].min}{parameters[1].unit} - {parameters[1].max}{parameters[1].unit}</p>
        <p>Humedad: {parameters[2].min}{parameters[2].unit} - {parameters[2].max}{parameters[2].unit}</p>
        <p>Luz solar: {parameters[3].min}{parameters[3].unit} - {parameters[3].max}{parameters[3].unit}</p>
        <p>PH: {parameters[4].min}{parameters[4].unit} - {parameters[4].max}{parameters[4].unit}</p>
        <p>Conductividad eléctrica: {parameters[5].min}{parameters[5].unit} - {parameters[5].max}{parameters[5].unit}</p>
        <p>Humedad de la hoja: {parameters[6].min}{parameters[6].unit} - {parameters[6].max}{parameters[6].unit}</p>
      </div>
    )
  }
}
