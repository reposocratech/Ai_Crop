import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios';
import './onegreenhouse.scss'
import '../allGreenhouses/allgreenhouses.scss'
import { AICropContext } from '../../../../context/AICropContext';

export const OneGreenhouse = () => {
  const {user, selectedGreenhouse} = useContext(AICropContext);
  const [measuresInfo, setMeasuresInfo] = useState();
  const [greenhouseInfo, setGreenhouseInfo] = useState();

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
      {/* <h1>Vista de un invernadero</h1>
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
      } */}


    <div className='cont_greenhouses'>
      <section className='botones_user'>
        <button><img alt='ir atrás' src='/assets/images/go_back.png'/></button>
        <button><img alt='configuracion invernadero'/></button>
        <button><img alt='ver colaboradores'/></button>
        <button><img alt='notificaciones' src='/assets/images/notification.png'/></button>
      </section>
      <header className='header_greenhouses'>
        <section className='title_row'>
          <h1>mi invernadero</h1>
          <article className='input_sect'>
          <div>
            <img alt='buscar' src='/assets/images/search.png'/>
            <input placeholder='Buscar cultivo'/>
          </div>
          <div>
          <img alt='añadir colaboradores' src='/assets/images/add_collaborator.png'/>
            <input placeholder='Añadir colaboradores'/>
          </div>
          </article>
        </section>
        <p>Nombre del invernadero</p>
      </header>
      <main>
        <div className='card_measure'>

          {
            measuresInfo && "asd"
          }
        </div>
      </main>
    </div>


    </div>
  )
}
