import React from 'react'
import './notification.scss'

export const ButtonNotif = ({setShowModalNotif}) => {

  const openModal = () => {
      setShowModalNotif(true);
  }

  return (
    <button className='notificationButton'onClick={openModal}><img src='/assets/images/notification.png'/></button>
  )
}
