// PRUEBA DEL SIMULATOR

import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export const BotonSubmit = ({datosForm}) => {

    const onSubmit = () => {

        axios
            .post('http://localhost:4000/simulator', {datosForm})
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

  return (
    <div>
        <Button onClick={onSubmit}>MANDALE</Button>
    </div>
  )
}
