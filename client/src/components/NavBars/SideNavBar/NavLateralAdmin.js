import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AICropContext } from "../../../context/AICropContext";
import { deleteLocalStorageAICrop } from "../../../helpers/localStorage/localStorageAICrop";
import "./navLateral.scss";

export const NavLateralAdmin = () => {
  const { user, setUser, setIsLogged } = useContext(AICropContext);

  const navigate = useNavigate();

  const onLogOut = () => {
    deleteLocalStorageAICrop();
    setUser();
    navigate("/");
    setIsLogged(false);
  };

  let fotito = user?.user_photo;
  let noFoto = "/assets/images/default_pic.png";

  return (
    <div className="navLat_cont">
      <section className="nav_lateral">
        {/* AI CROP LOGO */}
        <div className="company me-2" onClick={() => navigate("/")}>
          <img src="/assets/images/logo.png" alt="logo" />
          <h5 className="m-0 ms-2">AI crop</h5>
        </div>
        {/* FOTO & NOMBRE USER */}
        <div className="profile_pic text-center">
          <img
            alt="foto de perfil"
            src={fotito === null ? ` ${noFoto} ` : `/images/user/${fotito}`}
          />
          <h6>
            {user?.first_name} {user?.last_name}
          </h6>
        </div>
        {/* OPCIONES NAVBAR */}
        <div className="nav_options">
          <div className="nav_option" onClick={onLogOut}>
            <img src="/assets/images/logout.png" alt="dashboard" />
            <p className="option">Logout</p>
          </div>
        </div>
      </section>
    </div>
  );
};
