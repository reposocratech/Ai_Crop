import React from 'react'
import './onegreenhouse.scss'
import '../allGreenhouses/allgreenhouses.scss'

export const OneGreenhouse = () => {
  return (
    <div className='cont_greenhouses'>
      <section className='botones_user'>
        <button><img alt='ir atrás' src='/assets/images/go_back.png'/></button>
        <button><img alt='configuracion invernadero'/></button>
        <button><img alt='ver colaboradores'/></button>
        <button><img alt='notificaciones' src='/assets/images/notification.png'/></button>
      </section>
      <header className='header_Allgreenhouses'>
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

        </div>
      </main>
    </div>
  )
}
