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
  const [message, setMessage] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);

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
    setMessage("")
    setCollabInfo({ ...collabInfo, [name]: value, greenhouse_name: greenhouse_name});
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setMessage("")
    setHelperInfo({ ...helperInfo, [name]: value, greenhouse_name: greenhouse_name});
  };

  const handleBlurHelper = () => {
    let string = helperInfo.helper_email

    if (!string.includes("@") || !string.includes(".") || string.includes("@.")){
      setMessage("El correo no es correcto")
      setEmailValidation(false)
    } else {
      setMessage("")
      setEmailValidation(true)
    }
  }

  const handleBlurCollab = () => {
    let string = collabInfo.email

    if (!string.includes("@") || !string.includes(".") || string.includes("@.")){
      setMessage("El correo no es correcto")
      setEmailValidation(false)
    } else {
      setMessage("")
      setEmailValidation(true)
    }
  }


  const inviteCollab = () => {
    if (collabInfo.email === "" || collabInfo.name === ""){

      setMessage("Debes rellenar todos los campos");
      return;

    } else if (!emailValidation) {

      setMessage("El correo no es correcto");
      return;

    } else if (collabInfo.email === user.email){

      setMessage("El correo introducido es el del dueño");
      return;
    
    } else {

    axios
      .post("http://localhost:4000/greenhouse/inviteCollaborator", collabInfo)
      .then((res) => {
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
    }
  };

  const inviteHelper = () => {
    if (helperInfo.helper_first_name === "" || helperInfo.helper_last_name === "" || helperInfo.helper_email === ""){

        setMessage("Debes rellenar todos los campos");
        return;

      } else if (!emailValidation) {

        setMessage("El correo no es correcto");
        return;

      } else if (helperInfo.helper_email === user.email){

        setMessage("El correo introducido es el del dueño");
        return;
      
      } else {

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
      }
  }
 



  return (
    <>
      <Modal show={showModalInvitation} onHide={handleClose} className="modalInv">
        <Modal.Body className="divMaster">
            {showForm && (
              <div className="d-flex justify-content-center align-items-center flex-column div_padre">
                <h1 className="titular">invitar colaborador</h1>
                <p className="warn">Tendrá acceso a ver la información de tu invernadero</p>
                <div className="input_group">
    
                  <input
                    className="note m-2"
                    type="text"
                    placeholder="Nombre"
                    value={collabInfo.name}
                    onChange={handleChange}
                    name="name"
                    autoComplete="off"
                  />
       
                  <input
                    className="note m-2"
                    type="text"
                    placeholder="Email"
                    value={collabInfo.email}
                    onChange={handleChange}
                    onBlur={handleBlurCollab}
                    name="email"
                  />
                  <p className="errorM">{message}</p>
                  
                  <div className="botones">
                    <img onClick={goBack} src="/assets/images/back1.png"/>
                    <button className="botonInv accept uni" onClick={inviteCollab}> aceptar </button>
                  </div>
                  
                </div>
                
              </div>
            )}

            {showForm2 && 
            <>
            <div className="d-flex justify-content-center align-items-center flex-column div_padre">
              <h1 className="titular">invitar helper</h1>
              <div className="input_group">
                <p className="warn">Recibirá emails de las alertas de tu invernadero</p>
                <input
                  className="note m-2"
                  type="text"
                  placeholder="Nombre"
                  value={helperInfo.helper_first_name}
                  onChange={handleChange2}
                  name="helper_first_name"
                />
                <input
                  className="note m-2"
                  type="text"
                  placeholder="Apellido"
                  value={helperInfo.helper_last_name}
                  onChange={handleChange2}
                  name="helper_last_name"
                />
                <input
                  className="note m-2"
                  type="text"
                  placeholder="Email"
                  value={helperInfo.helper_email}
                  onChange={handleChange2}
                  onBlur={handleBlurHelper}
                  name="helper_email"
                />

                <p className="errorM">{message}</p>
                <div className="botones">
                  <img onClick={goBack} src="/assets/images/back1.png"/>
                  <button className="botonInv accept" onClick={inviteHelper}>aceptar</button>
                </div>
                
              </div>
            </div> 
            </>
            }


            {showButton && 
            
            <div className="d-flex flex-column align-items-center">
              <p className="question">¿Quieres invitar a alguien a tu invernadero?</p>

              <div className="botoneraInv">
                <button className="botonColl" onClick={seeForm1}>Invitar a un Colaborador</button>
                <button className="botonColl" onClick={seeForm2}>Invitar a un Helper</button>
              </div>
              
              <img className="img_gh" src="/assets/images/flora.png"/>
            </div>
            }

        </Modal.Body>
      </Modal>
    </>
  );
};
