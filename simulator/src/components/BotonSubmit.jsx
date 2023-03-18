// PRUEBA DEL SIMULATOR

import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export const BotonSubmit = ({datosForm}) => {

    const onSubmit = () => {
        console.log("DATOS ENVIADOS: ", datosForm);
        axios
            .post('http://localhost:4000/simulator', {datosForm})
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                // err.status(500).json(err);
            })
    }

  return (
    <div>
        <Button onClick={onSubmit}>MANDALE</Button>
    </div>
  )
}
