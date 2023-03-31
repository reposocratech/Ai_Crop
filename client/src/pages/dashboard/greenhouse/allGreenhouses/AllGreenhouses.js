import React, { useState, useContext, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { AICropContext } from '../../../../context/AICropContext';
import axios from 'axios'
import './allgreenhouses.scss'
import { OwnerCard } from '../../../../components/greenhouseCards/OwnerCard';
import { CollaboratorCard } from '../../../../components/greenhouseCards/CollaboratorCard';
import { ButtonNotif } from '../../../../components/Notifications/ButtonNotif';
import { ModalNotif } from '../../../../components/Notifications/ModalNotif';
import { useNavigate } from 'react-router-dom';
import { deleteLocalStorageAICropGreenhouse } from '../../../../helpers/localStorage/localStorageAICrop';

export const AllGreenhouses = () => {

  const {user} = useContext(AICropContext);
  const [greenhousesInfo, setGreenhousesInfo] = useState()
  const [showModalNotif, setShowModalNotif] = useState(false)


  const navigate = useNavigate();

  let numberOfGreenHouses = greenhousesInfo?.resultOwner.length + greenhousesInfo?.resultCollaborator.length;

    useEffect(() => {
      if(user){
        axios
          .get(`http://localhost:4000/greenhouse/getAllGreenhouses/${user.user_id}`)
          .then((res)=>{
            setGreenhousesInfo(res.data);
            // VVVV STO K ES VVV -------------------------------------------------
            deleteLocalStorageAICropGreenhouse()
          })
          .catch((err)=>{
            console.log(err);
          })
        }
      }, [user])
      
      console.log(greenhousesInfo, "greenhouseefdsf")
  return (
    <div className='cont_greenhouses'>
      <section className='botones_user'>
        <button onClick={()=>navigate('/')}><img src='/assets/images/go_back.png'/></button>
        <ButtonNotif setShowModalNotif={setShowModalNotif}/>
        <ModalNotif showModalNotif={showModalNotif} setShowModalNotif={setShowModalNotif}/>
      </section>
      <header className='header_greenhouses'>
        <section className='title_row'>
          <h1>mis invernaderos</h1>
          <article className='input_sect'>
          {/* <div className='search_add'>
            <img alt='buscar' src='/assets/images/search.png'/>
            <input placeholder='Buscar invernadero'/>
          </div> */}
          {/* <div className='add_colaborators'>
          <img alt='añadir colaboradores' src='/assets/images/add_collaborator.png'/>
            <input placeholder='Añadir colaboradores'/>
          </div> */}
          </article>
        </section>
        {greenhousesInfo && <p>Actualmente hay {numberOfGreenHouses} invernadero(s) activo(s)</p>}
      </header>
      <main>
        
        {user?.user_type === 2 && 
        <>
        <h2>Invernaderos del usuario</h2>
        <section className='greenhouse_list'>
        {greenhousesInfo && greenhousesInfo.resultOwner.map((elem, index)=>{
              return (
                <div key={index}>
                  <OwnerCard 
                  elem = {elem} 
                  />
                </div>
              )
          })
        }
        </section>
        </> }
      
      <h2>Invernaderos donde colabora el usuario</h2>
      <section className='greenhouse_list'>
        {greenhousesInfo && greenhousesInfo.resultCollaborator.map((elem, index)=>{
              return (
                <div key={index}>
                  <CollaboratorCard 
                  elem = {elem}
                  />
                </div>
              )
          })
        }
    </section>
      </main>
    </div>
  )
}