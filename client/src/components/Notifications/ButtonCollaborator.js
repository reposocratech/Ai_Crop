import React from 'react'
import './notification.scss'

export const ButtonCollaborator = ({setShowModalCollab}) => {

    const openModal2 = () => {
        setShowModalCollab(true);
    }
  return (
    <button className='ver colaboradores'onClick={openModal2}><img src='/assets/images/ver_colaboradores.png'/></button>
  )
}
