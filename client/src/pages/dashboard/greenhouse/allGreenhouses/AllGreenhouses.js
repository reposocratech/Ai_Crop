import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { AICropContext } from '../../../../context/AICropContext';
import './allgreenhouses.scss'
import axios from 'axios'

export const AllGreenhouses = () => {

  const [info, setInfo] = useState([]);
  const {user} = useContext(AICropContext)
  
  useEffect(() => {
    if(user){
      axios
        .get(`http://localhost:4000/greenhouse/getAllGreenhouses/${user.user_id}`)
        .then((res)=>{
          console.log(res.data);
          setInfo(res.data);
        })
        .catch((err)=>{
          console.log(err);
        })
    }
}, [user])
 
return (
  <div className='cont_Allgreenhouses'>
    <section className='botones_user'>
      <button><img src='/assets/images/go_back.png'/></button>
      <button><img src='/assets/images/notification.png'/></button>
    </section>
    <header className='header_Allgreenhouses'>
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
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
    </main>
  </div>
)
}
  
  




