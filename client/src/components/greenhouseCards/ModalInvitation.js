import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { AICropContext } from '../../context/AICropContext';

export const ModalInvitation = ({showModalInvitation, setShowModalInvitation}) => {

    const greenhouse_id = useParams().greenhouse_id; // ESTE GH ID SE CAPTURA BIEN
    const {user} = useContext(AICropContext);

    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(false);



    const handleClose = ()=>{
        setShowModalInvitation(false);
    }


    const seeForm1 = ()=>{
        setShowForm(!showForm);
        setShowForm2(false);
    }
    const seeForm2 = ()=>{
        setShowForm2(!showForm2);
        setShowForm(false);


    }

    let datos = {
        name: "Nasza",
        email: "gadetru@gmail.com",
        user_id: user?.user_id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        greenhouse_id: greenhouse_id,
        // greenhouse_name: "Invernadero de Carlitos"  
      }
// ------------esto esta hardcodeado al boton, hay que y mirando como hacerlo dinamico.
    const inviteCollab = () => {
    axios
    .post('http://localhost:4000/greenhouse/inviteCollaborator', datos)
    .then((res)=>{
      console.log(res.data);
   })
    .catch((err)=>{
      console.log(err);
    })
} 

  return (
    <>
      <Modal show={showModalInvitation} onHide={handleClose}>
        
        <Modal.Body>
          <section>

            {showForm &&
            <>
               <h1> pincha aqui,está harcodeado </h1>
                <button onClick={inviteCollab}> aceptar </button>
            </> 
         
            }
            {showForm2 &&
            <h1>Tu madre </h1>
            }
            <button onClick={seeForm1}> quiere invitar un colaborador?</button>
            <button onClick={seeForm2}> quiere invitar un helper?</button>
        
          </section>
         
        

        </Modal.Body>

      </Modal>
    </>
  )
}
