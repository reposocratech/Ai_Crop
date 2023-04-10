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
  const { user, actionReload, setActionReload } = useContext(AICropContext);
  const [message, setMessage] = useState("")

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
  const [collabInfo, setCollabInfo] = useState(datosCollab);
  const [helperInfo, setHelperInfo] = useState(datosHelper);

  const handleClose = () => {
    setShowModalInvitation(false);
    setMessage("");
    setShowForm(false);
    setShowForm2(false);
    setShowButton(true);
    setCollabInfo(datosCollab);
    setHelperInfo(datosHelper);
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
    setCollabInfo(datosCollab);
    setHelperInfo(datosHelper);
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollabInfo({ ...collabInfo, [name]: value, greenhouse_name: greenhouse_name});
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setHelperInfo({ ...helperInfo, [name]: value, greenhouse_name: greenhouse_name});
  };

  const inviteCollab = () => {
    if (collabInfo.email === "" )
    axios
      .post("http://localhost:4000/greenhouse/inviteCollaborator", collabInfo)
      .then((res) => {
          console.log(res.data);
          setShowModalInvitation(false)
          setActionReload(!actionReload)
          handleClose()
      })
      .catch((err) => {
        if (err.response.data === "dup"){
          setMessage("Este usuario ya existe como colaborador de este invernadero")
        } else {
          console.log(err);
        }
      });
  };

  const inviteHelper = () => {
    axios
      .post('http://localhost:4000/greenhouse/createHelper', helperInfo)
      .then((res) => {
        setShowModalInvitation(false)
        setActionReload(!actionReload)
        handleClose()
      })
      .catch((err) => {
        if (err.response.data === "dup"){
          setMessage("Este usuario ya existe como ayudante de este invernadero")
        } else {
          console.log(err);
        }
      });
  };


  return (
    <>
      <Modal show={showModalInvitation} onHide={handleClose}>
        <Modal.Body className="divMaster">
          {/* <section className="d-flex secPpal"> */}
            {showForm && (
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h1 className="titular">colaborador</h1>
                  <input
                    className="note"
                    type="text"
                    placeholder="Nombre"
                    value={collabInfo.name}
                    onChange={handleChange}
                    name="name"
                    autoComplete="off"
                  />
                  <input
                    className="note"
                    type="text"
                    placeholder="Email"
                    value={collabInfo.email}
                    onChange={handleChange}
                    name="email"
                  />
                <button className="botonInv accept uni" onClick={inviteCollab}> aceptar </button>
                <button className="botonInv accept" onClick={goBack}> volver </button>
                <p>{message}</p>
              </div>
            )}

            {showForm2 && 
            <>
              <h1 className="titular">Invitar un helper</h1>
              <div className="algo">
                <input
                  className="note"
                  type="text"
                  placeholder="Nombre"
                  value={helperInfo.helper_first_name}
                  onChange={handleChange2}
                  name="helper_first_name"
                />
                <input
                  className="note"
                  type="text"
                  placeholder="Apellido"
                  value={helperInfo.helper_last_name}
                  onChange={handleChange2}
                  name="helper_last_name"
                />
                <input
                  className="note"
                  type="text"
                  placeholder="Email"
                  value={helperInfo.helper_email}
                  onChange={handleChange2}
                  name="helper_email"
                />
              <button className="botonInv accept" onClick={inviteHelper}>aceptar</button>
              <button className="botonInv accept" onClick={goBack}> volver </button>
              <p>{message}</p>
              </div>
            </>

            }

            {showButton && 
            <>
              <p className="question">¿Quieres invitar a alguien a tu invernadero?</p>
              <div className="botoneraInv">
                <button className="botonInv coll" onClick={seeForm1}>
                  {" "}
                  Invitar a un Colaborador
                </button>
                <button className="botonInv coll" onClick={seeForm2}>Invitar a un Helper</button>
              </div>
            </>
            }
            {/* // : 
            // <div className="botoneraInv">
            // <button className="botonInv accept" onClick={goBack}> volver </button>
            // </div>
            // } */}
          {/* </section> */}
        </Modal.Body>
      </Modal>
    </>
  );
};
