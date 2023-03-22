import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios';
import './onegreenhouse.scss'
import { AICropContext } from '../../../../context/AICropContext';

export const OneGreenhouse = () => {
  const {user, selectedGreenhouse} = useContext(AICropContext);
  const [measuresInfo, setMeasuresInfo] = useState()
  const [greenhouseInfo, setGreenhouseInfo] = useState()

    useEffect(() => {
      if(selectedGreenhouse){
        axios
          .get(`http://localhost:4000/greenhouse/details/${selectedGreenhouse}`)
          .then((res)=>{
            console.log(res.data);
            setGreenhouseInfo(res.data);
            setMeasuresInfo(res.data.resultMeasures);
          })
          .catch((err)=>{
            console.log(err);
          })
      }
  }, [])

  return (
    <div>
      <h1>Vista de un invernadero</h1>
      {greenhouseInfo &&
        <>
          <h2>{greenhouseInfo.resultGreenhouse[0].greenhouse_name}</h2>
          <h4>{greenhouseInfo.resultGreenhouse[0].greenhouse_name}</h4>
          <h4>{greenhouseInfo.resultGreenhouse[0].greenhouse_name}</h4>
          <h4>{greenhouseInfo.resultGreenhouse[0].greenhouse_name}</h4>
          <h4>{greenhouseInfo.resultGreenhouse[0].greenhouse_name}</h4>
          <h4>{greenhouseInfo.resultGreenhouse[0].greenhouse_name}</h4>
          <h4>{greenhouseInfo.resultGreenhouse[0].greenhouse_name}</h4>
        </>
      }

    </div>
  )
}
