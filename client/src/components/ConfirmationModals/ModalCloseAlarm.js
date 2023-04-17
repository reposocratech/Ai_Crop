import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { AICropContext } from "../../context/AICropContext";
import "./modalclosealarm.scss";

export const ModalCloseAlarm = ({
  showModalCloseAlarm,
  setShowModalCloseAlarm,
  onClose,
  closeMessage,
  setCloseMessage,
}) => {

  const [messageError, setMessageError] = useState()

  const handleClose = () => {
    setShowModalCloseAlarm(false);
  };

  const handleCloseAlarm = () => {
    if(closeMessage !== ""){
    setShowModalCloseAlarm(false);
    onClose();
    setActionReload(!actionReload);
    } else {
      setMessageError("Escribe un mensaje")
    }
  };

  const handleChange = (e) => {
    setCloseMessage(e.target.value);
  };

  const { actionReload, setActionReload } = useContext(AICropContext);

  return (
    <Modal
      className="modalCloseAlarm"
      show={showModalCloseAlarm}
      onHide={handleClose}
    >
      <div className="alarmm">
        <h1 className="tituloAlarm">Desactivar Alarma</h1>
      </div>

      <Modal.Body className="modalCont">
        <div>
          <p className="parrafAlarm">
            Explique brevemente el manejo de la alerta
          </p>
          <p className="text-danger text-center m-0">{messageError}</p>
        </div>
        <textarea value={closeMessage} onChange={handleChange}></textarea>
        <button className="botonInv alrm" onClick={handleCloseAlarm}>
          Cerrar alarma
        </button>
      </Modal.Body>
    </Modal>
  );
};
