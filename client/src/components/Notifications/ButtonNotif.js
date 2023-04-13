import React, { useContext } from "react";
import { AICropContext } from "../../context/AICropContext";
import "./notification.scss";

export const ButtonNotif = ({ setShowModalNotif }) => {
  const { setActionReload, actionReload } = useContext(AICropContext);

  const openModal = () => {
    setActionReload(!actionReload);
    setShowModalNotif(true);
  };

  return (
    <button className="notificationButton" onClick={openModal}>
      <img src="/assets/images/notification.png" />
    </button>
  );
};
