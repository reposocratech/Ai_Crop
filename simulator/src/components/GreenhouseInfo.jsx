import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const GreenhouseInfo = ({setMessageError, action, setAction, selectedGreenhouse, setSelectedGreenhouse}) => {
  const [activeAlarms, setActiveAlarms] = useState(0);
  const [greenhouseDetails, setGreenhouseDetails] = useState();
  const [parameters, setParameters] = useState();
  const [collaborators, setCollaborators] = useState([])
  const [helpers, setHelpers] = useState([])
  const [errorParameters, setErrorParameters] = useState("")
  // const [color, setColor] = useState("")

  useEffect(() => {
      axios
      .get(`http://localhost:4000/greenhouse/details/${selectedGreenhouse}`)
      .then((res)=>{
        setActiveAlarms(res.data.resultActiveAlarms?.length);
        setGreenhouseDetails(res.data.resultGreenhouse[0]); 
        setCollaborators(res.data.resultCollaborators)
        setHelpers(res.data.resultHelpers)
        if(res.data.resultParameters.length != 0){
          setParameters(res.data.resultParameters)
        } else {
          setErrorParameters("Este invernadero no tiene parámetros establecidos")
          setParameters()
        }

        !res.data.resultGreenhouse[0] && setMessageError(`No existe un invernadero con id ${""}. Intenta nuevamente`)
      })
      .catch((err)=>{
        console.log(err)
      })
  }, [action])

  let color = "";
  if (activeAlarms != 0){
    color = "rojo"
  }  

  if (greenhouseDetails){
    return (
      <div className='greenhouseInfo'>

        <div className='cont_card_greenhouse'>
          <header className='card_header'>
            <h2>{greenhouseDetails?.greenhouse_name}</h2>
            <h5>Dueño/a: {greenhouseDetails?.owner_full_name}</h5>
            <h5>Ubicación: {greenhouseDetails?.greenhouse_location}</h5>
          </header>
          <div className='img_greenhouse'><img src='/assets/greenhouse.png'/></div>
          <main className='card_description'>
            <p className={`title ${color}`}>Alarmas activas: {activeAlarms}</p>
            <p>Cantidad de Colaboradores: {collaborators?.length}</p>
            <p>Cantidad de ayudantes: {helpers?.length}</p>
            <hr className='lineaGris'/>
            
            <table>
              <thead>
                <tr>
                  <th>Parámetro</th>
                  <th>Mínimo</th>
                  <th>Máximo</th>             
                </tr>
              </thead>

              <tbody>
              {parameters?.map((elem, index)=>{
                return (
                  <tr key={index}>
                    <td>{elem.measurement_type_name} ({elem.unit})</td>
                    <td>{elem.min}</td>
                    <td>{elem.max}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
            <p></p>
            <div></div>
          </main>
        </div>
      </div>
    )
  }
}
