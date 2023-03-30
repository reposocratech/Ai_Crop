import axios from "axios";
import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AICropContext } from "../../context/AICropContext";

import './modalstyle.scss'



export const ModalInvitation = ({
  showModalInvitation,
  setShowModalInvitation,
  greenhouse_name
}) => {

  const greenhouse_id = useParams().greenhouse_id;
  const { user } = useContext(AICropContext);

  let datosCollab = {
    name: "",
    email: "",
    user_id: user?.user_id,
    first_name: user?.first_name,
    last_name: user?.last_name,
    greenhouse_id: greenhouse_id,
    greenhouse_name: greenhouse_name
  };

  let datosHelper = {
    helper_first_name: "",
    helper_last_name: "",
    helper_email: "",
    user_id: user?.user_id,
    first_name: user?.first_name,
    last_name: user?.last_name,
    greenhouse_id: greenhouse_id,
    greenhouse_name: greenhouse_name
  };
  
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [collabInfo, setCollabInfo ] = useState(datosCollab);
  const [helperInfo, setHelperInfo ] = useState(datosHelper);

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
    setCollabInfo({ ...collabInfo, [name]: value, greenhouse_name: greenhouse_name});
    console.log(collabInfo);
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setHelperInfo({ ...helperInfo, [name]: value, greenhouse_name: greenhouse_name});
  };

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
      .post('http://localhost:4000/greenhouse/createHelper', helperInfo)
      .then((res) => {
        setShowModalInvitation(false)
        console.log(res.data,"el ressss");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <>
      <Modal show={showModalInvitation} onHide={handleClose}>
        <Modal.Body className="divMaster">
          <section className="d-flex secPpal">
            {showForm && (
              <div className="d-flex flex-column">
                <h1 className="titular">colaborador</h1>

                <div className="d-flex justify-content-center">
                  <input
                    className="note"
                    type="text"
                    placeholder="Nombre"
                    value={collabInfo.name}
                    onChange={handleChange}
                    name="name"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <input
                    className="note"
                    type="text"
                    placeholder="Email"
                    value={collabInfo.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div>
                <button className="botonInv accept uni" onClick={inviteCollab}> aceptar </button>
                </div>
              </div>
            )}
            {showForm2 && 
            
            <>
            <h1 className="titular">helper</h1>

            <div className=" PpalInp d-flex justify-content-center">
              <input
                className="note nam"
                type="text"
                placeholder="Nombre"
                value={helperInfo.helper_first_name}
                onChange={handleChange2}
                name="helper_first_name"
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                className="note"
                type="text"
                placeholder="Apellido"
                value={helperInfo.helper_last_name}
                onChange={handleChange2}
                name="helper_last_name"
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                className="note"
                type="text"
                placeholder="Email"
                value={helperInfo.helper_email}
                onChange={handleChange2}
                name="helper_email"
              />
            </div>
              <div>
            <button className="botonInv accept uni" onClick={inviteHelper}> aceptar </button>
            </div>
          </>

            }

            {showButton ? 
              <>
              <div className="botoneraInv">
                <button className="botonInv coll" onClick={seeForm1}>
                  {" "}
                  Invitar a un Colaborador
                </button>
                <button className="botonInv coll" onClick={seeForm2}>Invitar a un Helper</button>
              </div>
              </>
            : 
              
              <button className="botonInv accept" onClick={goBack}> volver </button>
            }
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
};
