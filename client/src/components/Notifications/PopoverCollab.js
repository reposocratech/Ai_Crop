import React, { useContext, useState } from 'react'
import { AICropContext } from '../../context/AICropContext';
import Popover from '@mui/material/Popover';
import axios from 'axios';

import './popoverCollabs.scss'

export const PopoverCollab = ({userCollaborators, helpers}) => {

  const { setActionReload, actionReload } = useContext(AICropContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  const numberCollabs =
    helpers?.length + userCollaborators?.length;

  return (
    <>
    <button  className="ver colaboradores" onClick={handleClick}>
      <img src="/assets/images/ver_colaboradores.png" alt="imgCollaborator" />
    </button>
    <Popover
        className='popoverCollabs'
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
        }}>
          <section className='popover_sect'>
            {userCollaborators?.length !== 0 || helpers?.length !== 0 ? 
              <>
              <h5>COLABORADORES DEL INVERNADERO</h5>
              <p className='col_num'>Actualmente hay {numberCollabs} colaborador(es)</p>
              <div className='info_colabs'>
                {userCollaborators?.map((collab, index) => {
                const onDeleteCollab = () => {
                    axios
                    .delete(
                        `http://localhost:4000/greenhouse/deleteGreenhouseCollaborator/${collab.greenhouse_id}/${collab.user_id}`
                    )
                    .then((res) => {
                        setActionReload(!actionReload);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                };

                return (
                    <div key={index} className="emergencia2">
                    <p>Colaborador: {collab.email}</p>
                    <img
                        src="/assets/images/remove.png"
                        onClick={onDeleteCollab}
                    />
                    </div>
                );
                })}

                {helpers?.map((helper, index) => {
                const onDeleteHelper = () => {
                    axios
                    .delete(
                        `http://localhost:4000/greenhouse/deleteHelper/${helper.helper_id}`
                    )
                    .then((res) => {
                        setActionReload(!actionReload);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                };
                return (
                    <div key={index} className="emergencia2">
                    <p>Ayudante: {helper.helper_email}</p>
                    <img
                        src="/assets/images/remove.png"
                        onClick={onDeleteHelper}
                    />
                    </div>
                );
                })}
                </div>

                <div className='hoja'>
                <img  src='/assets/images/hoja.png'/></div>
              </>  
              : 
              
              <div className="no_info">
                  <h4>Actualmente este invernadero no tiene colaboradores.</h4>
                  <article>
                  <p>¡Prueba a invitar a alguien!</p>
                  <img src='/assets/images/regando-plantas.png'/>
                  </article>
              </div>
            }
        </section>
    </Popover>
    </>
  )
}
