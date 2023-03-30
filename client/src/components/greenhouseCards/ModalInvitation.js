import axios from "axios";
import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AICropContext } from "../../context/AICropContext";



export const ModalInvitation = ({
  showModalInvitation,
  setShowModalInvitation,
  greenhouse_name,
}) => {



  const greenhouse_id = useParams().greenhouse_id; // ESTE GH ID SE CAPTURA BIEN
  const { user } = useContext(AICropContext);
 let datos = {
    name: "",
    email: "",
    user_id: user?.user_id,
    first_name: user?.first_name,
    last_name: user?.last_name,
    greenhouse_id: greenhouse_id,
    greenhouse_name: greenhouse_name
  };

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [collabInfo, setCollabInfo ] = useState(datos);
  const [helperInfo, setHelperInfo ] = useState(datos);


 

  const handleClose = () => {
    setShowModalInvitation(false);
  };

  const seeForm1 = () => {
    setShowForm(true);
    setShowForm2(false);
    setShowButton(false);
  };
  const seeForm2 = () => {
    setShowForm2(true);
    setShowForm(false);
    setShowButton(false);
  };
  const goBack = () => {
    setShowButton(true);
    setShowForm2(false);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollabInfo({ ...collabInfo, [name]: value });
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setHelperInfo({ ...helperInfo, [name]: value });
  };

  

 
  // ------------esto esta hardcodeado al boton, hay que y mirando como hacerlo dinamico.
  const inviteCollab = () => {
    axios
      .post("http://localhost:4000/greenhouse/inviteCollaborator", collabInfo)
      .then((res) => {
        setShowModalInvitation(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const inviteHelper = () => {
    axios
      .post('http://localhost:4000/greenhouse/createHelper',helperInfo)
      .then((res) => {
        setShowModalInvitation(false)
        console.log(res,"el ressss");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <Modal show={showModalInvitation} onHide={handleClose}>
        <Modal.Body>
          <section>
            {showForm && (
              <>
                <h1> Para colaborador </h1>

                <div>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={collabInfo.name}
                    onChange={handleChange}
                    name="name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    value={collabInfo.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>

                <button onClick={inviteCollab}> aceptar </button>
              </>
            )}
            {showForm2 && 
            
            <>
            <h1> Para helper </h1>

            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={helperInfo.name}
                onChange={handleChange2}
                name="name"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={helperInfo.email}
                onChange={handleChange2}
                name="email"
              />
            </div>

            <button onClick={inviteHelper}> aceptar </button>
          </>

            }

            {showButton ? 
              <>
                <button onClick={seeForm1}>
                  {" "}
                  quiere invitar un colaborador?
                </button>
                <button onClick={seeForm2}> quiere invitar un helper?</button>
              </>
            : 
              <button onClick={goBack}> volver </button>
            }
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
};
