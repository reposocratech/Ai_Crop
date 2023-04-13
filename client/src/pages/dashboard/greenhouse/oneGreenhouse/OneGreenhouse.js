import React, { useContext, useEffect, useState } from "react";
import { TemperatureCard } from "../../../../components/CardsMeasures/TemperatureCard";
import { Co2Card } from "../../../../components/CardsMeasures/Co2Card";
import { HumidityCard } from "../../../../components/CardsMeasures/HumidityCard";
import { SunlightCard } from "../../../../components/CardsMeasures/SunlightCard";
import { PhCard } from "../../../../components/CardsMeasures/PhCard";
import { ConductivityCard } from "../../../../components/CardsMeasures/ConductivityCard";
import { LeafHumidity } from "../../../../components/CardsMeasures/LeafHumidity";
import { AICropContext } from "../../../../context/AICropContext";
import { useNavigate } from "react-router-dom";
import { ButtonNotif } from "../../../../components/Notifications/ButtonNotif";
import { ModalNotif } from "../../../../components/Notifications/ModalNotif";
import { ButtonCollaborator } from "../../../../components/Notifications/ButtonCollaborator";
import { ModalCollaborator } from "../../../../components/Notifications/ModalCollaborator";

import axios from "axios";
import "./onegreenhouse.scss";
import "../allGreenhouses/allgreenhouses.scss";

import { useParams } from "react-router-dom";
import { ModalInvitation } from "../../../../components/greenhouseCards/ModalInvitation";
import { UpdateCropModal } from "../../../../components/Crop/UpdateCropModal";
import { ConfirmationCropModal } from "../../../../components/Crop/ConfirmationCropModal";
import { ChartCrop } from "../../../../components/Crop/ChartCrop";

export const OneGreenhouse = () => {
  const { actionReload, setActionReload } = useContext(AICropContext);

  const [temperatura, setTemperatura] = useState();
  const [co2, setCo2] = useState();
  const [humedad, setHumedad] = useState();
  const [luzSolar, setLuzSolar] = useState();
  const [ph, setPh] = useState();
  const [conductividad, setConductividad] = useState();
  const [humedadHoja, setHumedadHoja] = useState();
  const [showModalNotif, setShowModalNotif] = useState(false);
  const [showModalCollab, setShowModalCollab] = useState(false);
  const [userCollaborators, setUserCollaborators] = useState();
  const [helpers, setHelpers] = useState();
  const [greenhouseData, setGreenhouseData] = useState();
  const [showModalInvitation, setShowModalInvitation] = useState(false);
  // ------------------- {-- el cropito --} ------------------- //
  const [cropsCards, setCropsCards] = useState([]);
  const [showUpdateCrop, setShowUpdateCrop] = useState(false);
  const [showDeleteCrop, setShowDeleteCrop] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState();
  const navigate = useNavigate();

  const greenhouse_id = useParams().greenhouse_id;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/greenhouse/details/${greenhouse_id}`)
      .then((res) => {
        setUserCollaborators(res.data.resultCollaborators);
        setHelpers(res.data.resultHelpers);
        setGreenhouseData(res.data.resultGreenhouse[0]);
        setCropsCards(res.data.resultActiveCrops);
        for (let i = 0; i < res.data.resultMeasure.length; i++) {
          switch (res.data.resultMeasure[i].measurement_type_id) {
            case 1:
              setTemperatura(res.data.resultMeasure[i]);
              break;
            case 2:
              setCo2(res.data.resultMeasure[i]);
              break;
            case 3:
              setHumedad(res.data.resultMeasure[i]);
              break;
            case 4:
              setLuzSolar(res.data.resultMeasure[i]);
              break;
            case 5:
              setPh(res.data.resultMeasure[i]);
              break;
            case 6:
              setConductividad(res.data.resultMeasure[i]);
              break;
            case 7:
              setHumedadHoja(res.data.resultMeasure[i]);
              break;
            default:
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [actionReload, greenhouse_id]);

  const openModalUdateCrop = (crop_id) => {
    setSelectedCrop(crop_id);
    setShowUpdateCrop(true);
  };

  const openModalDeleteCrop = (crop_id, is_active) => {
    if (is_active === 1) {
      setSelectedCrop(crop_id);
      setShowDeleteCrop(true);
    }
  };

  return (
    <div className="cont_greenhouses">
      <section className="botones_user">
        <button onClick={() => navigate("/user")}>
          <img alt="ir atrás" src="/assets/images/go_back.png" />
        </button>

        <button
          onClick={() => navigate(`/user/editGreenhouse/${greenhouse_id}`)}
        >
          <img
            className="config_invernadero"
            alt="configuracion invernadero"
            src="/assets/images/editar_greenhouse.png"
          />
        </button>

        {/* Modal Collaborator */}
        <ButtonCollaborator setShowModalCollab={setShowModalCollab} />

        <ModalCollaborator
          showModalCollab={showModalCollab}
          setShowModalCollab={setShowModalCollab}
          userCollaborators={userCollaborators}
          helpers={helpers}
        />

        {/* Modal */}
        <ButtonNotif setShowModalNotif={setShowModalNotif} />

        <ModalNotif
          showModalNotif={showModalNotif}
          setShowModalNotif={setShowModalNotif}
        />

        <ModalInvitation
          showModalInvitation={showModalInvitation}
          setShowModalInvitation={setShowModalInvitation}
          greenhouse_name={greenhouseData?.greenhouse_name}
        />

        <UpdateCropModal
          showUpdateCrop={showUpdateCrop}
          setShowUpdateCrop={setShowUpdateCrop}
          setSelectedCrop={setSelectedCrop}
          selectedCrop={selectedCrop}
        />

        <ConfirmationCropModal
          setShowDeleteCrop={setShowDeleteCrop}
          showDeleteCrop={showDeleteCrop}
          setSelectedCrop={setSelectedCrop}
          selectedCrop={selectedCrop}
          setActionReload={setActionReload}
          actionReload={actionReload}
        />
      </section>

      <header className="header_greenhouses">
        <section className="title_row">
          <h1>mi invernadero</h1>
          <article className="input_sect">
            <button
              className="search_add"
              onClick={() => setShowModalInvitation(true)}
            >
              <img
                alt="añadir colaboradores"
                src="/assets/images/add_collaborator.png"
              />
              Añadir colaboradores
            </button>
          </article>
        </section>
        <p>Nombre del invernadero: {greenhouseData?.greenhouse_name}</p>
        <p>Localidad: {greenhouseData?.greenhouse_location}</p>
      </header>

      <main className="user-select-none">
        <section className="cards_measures">
          <TemperatureCard temperatura={temperatura} />
          <Co2Card co2={co2} />
          <HumidityCard humedad={humedad} />
          <SunlightCard luzSolar={luzSolar} />
          <PhCard ph={ph} />
          <ConductivityCard conductividad={conductividad} />
          <LeafHumidity humedadHoja={humedadHoja} />
        </section>
      </main>

      <section className="cards_crop">
        {cropsCards?.map((crop, index) => {
          let filterdisabled = "";

          if (crop.is_active === 0) {
            filterdisabled = "disabledGreenhouse";
          }
          return (
            <div className={`card_crop ${filterdisabled}`} key={index}>
              <h4>{crop.crop_name.toUpperCase()}</h4>
              <p>{crop.crop_plant_variety}</p>
              <p>Extensión: {crop.crop_size}m²</p>
              <p>Duración: {crop.crop_duration} día(s)</p>
              <ChartCrop
                cropDuration={crop.crop_duration}
                cropDays={crop.days_passed}
              />
              <section className="buttons">
                <div
                  onClick={() => {
                    openModalUdateCrop(crop.crop_id);
                  }}
                >
                  <img
                    alt="icono editar"
                    className="edit"
                    src="/assets/images/config_admin2.png"
                  />
                </div>
                <div
                  onClick={() => {
                    openModalDeleteCrop(crop.crop_id, crop.is_active);
                  }}
                >
                  <img
                    alt="icono recoger cultivo"
                    className="harvest"
                    src="/assets/images/cards/done.png"
                  />
                </div>
              </section>
            </div>
          );
        })}
      </section>
    </div>
  );
};
