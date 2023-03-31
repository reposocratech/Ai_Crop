import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const GreenhouseInfo = ({greenhouse_id, setMessageError, action, setAction, greenhouse_name, greenhouse, setGreenhouse}) => {
  const [activeAlarms, setActiveAlarms] = useState(0);
  const [greenhouseDetails, setGreenhouseDetails] = useState();
  const [parameters, setParameters] = useState();
  const [errorParameters, setErrorParameters] = useState("")
  // const [color, setColor] = useState("")

  useEffect(() => {

    if(greenhouse_name){
      axios
      .get(`http://localhost:4000/greenhouse/detailsName/${greenhouse_name}`)
      .then((res)=>{

        setActiveAlarms(res.data.resultActiveAlarms?.length);
        setGreenhouseDetails(res.data.resultGreenhouse[0]);
        setGreenhouse({greenhouse_id: res.data.resultGreenhouse[0].greenhouse_id}) ;  
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

    } else {
      if(greenhouse_id){
        axios
        .get(`http://localhost:4000/greenhouse/details/${greenhouse_id}`)
        .then((res)=>{
  
          setActiveAlarms(res.data.resultActiveAlarms?.length);
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
      }
    }
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
          </header>
          <div className='img_greenhouse'><img src='/assets/greenhouse.png'/></div>
          <main className='card_description'>
            <p className={`title ${color}`}>Alarmas activas: {activeAlarms}</p>
            <hr className='lineaGris'/>
            
            <table>
              <thead>
                <th>Parámetro</th>
                <th>Mínimo</th>
                <th>Máximo</th>             
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
