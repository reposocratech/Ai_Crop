import React from 'react'
import { Button, Card } from 'react-bootstrap'
import './allgreenhouses.scss'

export const AllGreenhouses = () => {
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
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
      </main>
    </div>
  )
}
