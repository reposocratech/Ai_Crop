import React, { useState, useContext, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { AICropContext } from '../../../../context/AICropContext';
import axios from 'axios'
import './allgreenhouses.scss'

export const AllGreenhouses = () => {

  const {user} = useContext(AICropContext);
  const [info, setInfo] = useState()

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
    <div className='cont_greenhouses'>
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
        
        <h2>Invernaderos del usuario</h2>
        <div>
          {info && info.resultOwner.map((elem, index)=>{
                return (
                  <Card style={{ width: '18rem' }} key={index}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>{elem.greenhouse_name}</Card.Title>
                    <Card.Text>
                      Titular del invernadero: {elem.owner_full_name} 
                      Alarmas activas: {elem.active_alarms}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
                )
            })
          }
        </div>
      
      <h2>Invernaderos donde colabora el usuario</h2>
      <div>
        {info && info.resultCollaborator.map((elem, index)=>{
              return (
                <Card style={{ width: '18rem' }} key={index}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{elem.greenhouse_name}</Card.Title>
                  <Card.Text>
                    Titular del invernadero: {elem.owner_full_name}
                    Alarmas activas: {elem.active_alarms}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              )
          })
        }
    </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet, eros elementum molestie cursus, lorem ante tempus mauris, id imperdiet nibh est non tortor. Praesent sit amet dictum lorem. Ut nunc arcu, cursus sit amet justo ac, ornare malesuada magna. Morbi laoreet sem enim, a accumsan felis ullamcorper ornare. In porta turpis a erat bibendum, sit amet finibus sapien consectetur. Vestibulum ut auctor lacus. Integer rhoncus ultricies iaculis. Proin ut est convallis, egestas purus quis, semper massa.

Maecenas euismod accumsan laoreet. Sed mi lectus, vestibulum non lobortis lacinia, tempus sit amet metus. Donec quis sapien ut odio blandit accumsan a eu enim. Nullam quis mattis ligula, eu lacinia nisl. Pellentesque eleifend elit nisi, vitae faucibus dui vehicula nec. Sed rhoncus, odio sit amet eleifend facilisis, mi orci rutrum odio, sed volutpat arcu nisl viverra nisl. Etiam sapien mauris, vehicula sit amet dictum malesuada, vehicula sed ante. Curabitur lorem leo, maximus vitae sem quis, vulputate dignissim orci. Nam nec aliquet risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Pellentesque non ligula eget justo pulvinar fringilla. Sed a bibendum tortor. Fusce facilisis, turpis in pharetra accumsan, nunc risus pharetra eros, eget tristique mauris eros sit amet sapien. Nullam leo dui, consectetur non odio vitae, condimentum malesuada orci. Sed in rhoncus ipsum, in pretium lectus. Vestibulum porta blandit ipsum, id pulvinar sapien. Nullam a lorem dictum, tristique ante eu, dapibus lectus.

Nullam auctor hendrerit ornare. Vestibulum et varius magna. Mauris luctus velit at tellus congue, id cursus dia
Pellentesque non ligula eget justo pulvinar fringilla. Sed a bibendum tortor. Fusce facilisis, turpis in pharetra accumsan, nunc risus pharetra eros, eget tristique mauris eros sit amet sapien. Nullam leo dui, consectetur non odio vitae, condimentum malesuada orci. Sed in rhoncus ipsum, in pretium lectus. Vestibulum porta blandit ipsum, id pulvinar sapien. Nullam a lorem dictum, tristique ante eu, dapibus lectus.

Nullam auctor hendrerit ornare. Vestibulum et varius magna. Mauris luctus velit at tellus congue, id cursus dia
Nullam auctor hendrerit ornare. Vestibulum et varius magna. Mauris luctus velit at tellus congue, id cursus dia
Pellentesque non ligula eget justo pulvinar fringilla. Sed a bibendum tortor. Fusce facilisis, turpis in pharetra accumsan, nunc risus pharetra eros, eget tristique mauris eros sit amet sapien. Nullam leo dui, consectetur non odio vitae, condimentum malesuada orci. Sed in rhoncus ipsum, in pretium lectus. Vestibulum porta blandit ipsum, id pulvinar sapien. Nullam a lorem dictum, tristique ante eu, dapibus lectus.

Nullam auctor hendrerit ornare. Vestibulum et varius magna. Mauris luctus velit at tellus congue, id cursus dia</p>
      </main>
    </div>
  )
}