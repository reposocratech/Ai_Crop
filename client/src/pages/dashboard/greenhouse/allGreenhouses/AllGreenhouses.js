import React, { useState, useContext, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { AICropContext } from '../../../../context/AICropContext';
import axios from 'axios'
import './allgreenhouses.scss'
import { OwnerCard } from '../../../../components/greenhouseCards/OwnerCard';
import { CollaboratorCard } from '../../../../components/greenhouseCards/CollaboratorCard';

export const AllGreenhouses = () => {

  const {user} = useContext(AICropContext);
  const [greenhousesInfo, setGreenhousesInfo] = useState()

    useEffect(() => {
      if(user){
        axios
          .get(`http://localhost:4000/greenhouse/getAllGreenhouses/${user.user_id}`)
          .then((res)=>{
            console.log(res.data);
            setGreenhousesInfo(res.data);
          })
          .catch((err)=>{
            console.log(err);
          })
      }
  }, [user])

  return (
    <div className='cont_greenhouses'>
      <section className='botones_user'>
        <button><img src='/assets/images/go_back.png'/></button>
        <button><img src='/assets/images/notification.png'/></button>
      </section>
      <header className='header_greenhouses'>
        <section className='title_row'>
          <h1>mis invernaderos</h1>
          <article className='input_sect'>
          <div>
            <img alt='buscar' src='/assets/images/search.png'/>
            <input placeholder='Buscar invernadero'/>
          </div>
          <div>
          <img alt='añadir colaboradores' src='/assets/images/add_collaborator.png'/>
            <input placeholder='Añadir colaboradores'/>
          </div>
          </article>
        </section>
        <p>Actualmente hay X invernadero(s) activo(s)</p>
      </header>
      <main>
        
        <h2>Invernaderos del usuario</h2>
        <div>
        {greenhousesInfo && greenhousesInfo.resultOwner.map((elem, index)=>{
              return (
                <div key={index}>
                  <OwnerCard elem = {elem} />
                </div>
              )
          })
        }
        </div>
      
      <h2>Invernaderos donde colabora el usuario</h2>
      <div>
        {greenhousesInfo && greenhousesInfo.resultCollaborator.map((elem, index)=>{
              return (
                <div key={index}>
                  <CollaboratorCard elem = {elem}/>
                </div>
              )
          })
        }
    </div>

      </main>
    </div>
  )
}
