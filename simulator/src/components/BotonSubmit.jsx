// PRUEBA DEL SIMULATOR

import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export const BotonSubmit = ({datosForm, greenhouse}) => {

    const onSubmit = () => {
        console.log("DATOS ENVIADOS: ", {datosForm, greenhouse});
        axios
            .post('http://localhost:4000/simulator', {datosForm, greenhouse})
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err)
            })
    }

  return (
    <div>
        <Button onClick={onSubmit}>MANDALE</Button>
    </div>
  )
}
