import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const GreenhouseInfo = ({greenhouse_id, setMessageError}) => {
  const [activeAlarms, setActiveAlarms] = useState(0);
  const [activeCrops, setActiveCrops] = useState();
  const [greenhouseDetails, setGreenhouseDetails] = useState();
  const [parameters, setParameters] = useState();
  const [errorParameters, setErrorParameters] = useState("")

  useEffect(() => {

    axios
      .get(`http://localhost:4000/greenhouse/details/${greenhouse_id}`)
      .then((res)=>{

        setActiveAlarms(res.data.resultActiveAlarms.length);
        setActiveCrops(res.data.resultActiveCrops);
        setGreenhouseDetails(res.data.resultGreenhouse[0]);

        if(res.data.resultParameters.length != 0){
          setParameters(res.data.resultParameters)
        } else {
          setErrorParameters("Este invernadero no tiene parámetros establecidos")
          setParameters()
        }

        !res.data.resultGreenhouse[0] && setMessageError(`No existe un invernadero con id ${greenhouse_id}. Intenta nuevamente`)
      })
      .catch((err)=>{
        console.log(err)
      })

  }, [greenhouse_id])

  if (greenhouseDetails){
    return (
      <div className='greenhouseInfo'>
        <h2>{greenhouseDetails.greenhouse_name} - <span className='alarmas'>{activeAlarms} alarmas activas</span></h2>
        <p>{greenhouseDetails.greenhouse_location}</p>
        <br />
        {parameters ?
        <>
          <h4>Parámetros mínimos y máximos para las alarmas</h4>
          <p>Temperatura: {parameters[0].min}{parameters[0].unit} - {parameters[0].max}{parameters[0].unit}</p>
          <p>CO2: {parameters[1].min}{parameters[1].unit} - {parameters[1].max}{parameters[1].unit}</p>
          <p>Humedad: {parameters[2].min}{parameters[2].unit} - {parameters[2].max}{parameters[2].unit}</p>
          <p>Luz solar: {parameters[3].min}{parameters[3].unit} - {parameters[3].max}{parameters[3].unit}</p>
          <p>PH: {parameters[4].min}{parameters[4].unit} - {parameters[4].max}{parameters[4].unit}</p>
          <p>Conductividad eléctrica: {parameters[5].min}{parameters[5].unit} - {parameters[5].max}{parameters[5].unit}</p>
          <p>Humedad de la hoja: {parameters[6].min}{parameters[6].unit} - {parameters[6].max}{parameters[6].unit}</p>
        </>
        : <h4 className='text-center mt-3 text-danger'>{errorParameters}</h4>
        }
      </div>
    )
  }
}
