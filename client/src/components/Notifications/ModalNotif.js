import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AICropContext } from "../../context/AICropContext";
import "./notification.scss";
import { useNavigate } from "react-router-dom";

export const ModalNotif = ({ showModalNotif, setShowModalNotif }) => {
  const { user, actionReload } = useContext(AICropContext);
  const [activeAlarms, setActiveAlarms] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/server/alarm/seeActiveAlarms/${user?.user_id}`
      )
      .then((res) => {
        setActiveAlarms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [actionReload]);

  const handleClose = () => {
    setShowModalNotif(false);
  };

  const handleClick = (greenhouse_id, measurement_type_id) => {
    navigate(`../greenhouse/${greenhouse_id}/${measurement_type_id}`);
  };

  return (
    <Modal
      className="modalNotification"
      show={showModalNotif}
      onHide={handleClose}
    >
      <Modal.Body className="modalCont">
        {activeAlarms?.length !== 0 ? (
          activeAlarms?.map((alarma, index) => {
            return (
              <div
                onClick={() => {
                  handleClick(
                    alarma?.greenhouse_id,
                    alarma?.measurement_type_id
                  );
                }}
                className="emergencia"
                key={index}
              >
                <p>{alarma?.alarm_message}</p>
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center text-center text-danger">
            <h4>no tienes alarmas activas </h4>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};
