import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const GreenhouseInfo = ({greenhouse_id, setMessageError, action, setAction}) => {
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

  }, [action])

  if (greenhouseDetails){
    return (
      <div className='greenhouseInfo'>
        <h2>{greenhouseDetails?.greenhouse_name} - <span className='alarmas'>{activeAlarms} alarmas activas</span></h2>
        <p>{greenhouseDetails?.greenhouse_location}</p>
        <br />
        {parameters ?
        <div className='cont_card_greenhouse'>
          <header className='card_header'>
          </header>
          <div className='img_greenhouse'><img src='/assets/images/greenhouse.png'/></div>
          <main className='card_description'>
            <p className='title'>{"ASDASDASD"}</p>
            <hr className='lineaGris'/>
            <p>Titular:</p>
            <p>Alarmas activas:</p>
            <div onClick={""}><img className='delete'src='/assets/images/delete.png'/></div>

            <div className='alerta_cont'><img className='alerta' src='/assets/images/alerta.png'/></div> :
            <div></div>
          </main>
        </div>
        : <h4 className='text-center mt-3 text-danger'></h4>
        }
      </div>
    )
  }
}
