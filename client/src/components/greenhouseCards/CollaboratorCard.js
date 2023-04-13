import React, { useContext, useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';
import "./greenhousecard.scss"
import { saveLocalStorageAICropGreenhouse } from '../../helpers/localStorage/localStorageAICrop';
import axios from 'axios';
import { ModalExitCollab } from '../ConfirmationModals/ModalExitCollab';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { Typography } from '@mui/material';

export const CollaboratorCard = ({elem}) => {
  const navigate = useNavigate();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const {user, setActionReload, actionReload} = useContext(AICropContext);

  const onSubmit = () => {
    navigate(`greenhouse/${elem.greenhouse_id}`)
  }

  const handleModal = () => {
    setOpenConfirmModal(true);
  }

  const onDeleteCollab = () => {
    axios
    .delete(`http://localhost:4000/greenhouse/deleteGreenhouseCollaborator/${elem.greenhouse_id}/${user.user_id}`)
    .then((res)=>{
        console.log("delete collab");
        setActionReload(!actionReload);
        handleClose();
    })
    .catch((err)=> {
        console.log(err)
    })
} 

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (!elem.active_alarms){
    elem.active_alarms = 0
  }

  return (
    <>
    {/* <ModalExitCollab
      setOpenConfirmModal={setOpenConfirmModal}
      openConfirmModal={openConfirmModal}
      elem={elem}
    /> */}
      <div className='cont_card_greenhouse'>
          <header className='card_header_colab'>
          </header>
          <div onClick={onSubmit} className='img_greenhouse'><img src='/assets/images/greenhouse.png'/></div>
          <main className='card_description'>
            <p className='title'>{elem.greenhouse_name}</p>
            <hr className='lineaGris'/>
            <p>Titular: {elem.owner_full_name}</p>
            <p>Alarmas activas: {elem.active_alarms}</p>
          </main>
          <section className='bottom_bots'>
            <img aria-describedby={id} variant="contained" onClick={handleClick} className='delete'src='/assets/images/delete.png'/>
            {elem.active_alarms ?
            <img className='alerta' src='/assets/images/alerta.png'/> :
            <div className='alerta'></div>}
          </section>
      </div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
      Open Popover
      </Button> */}
      <Popover
        className='popoverExitCollab'
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        <section className='popover_sect'>
            <h4 className='paratext'>¿Quieres dejar de colaborar en este invernadero?</h4>
          <div  className='botones_pop'>
            <img className='atras' onClick={handleClose} src='/assets/images/back1.png'/>
            <button className='botonCrops' onClick={onDeleteCollab}> Aceptar </button>
          </div>
      </section>
      </Popover>
    </>
  )
}