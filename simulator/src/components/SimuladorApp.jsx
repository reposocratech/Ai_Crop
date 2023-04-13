import React, { useContext, useEffect, useState } from "react";
import { FormularioSimulador } from "./FormularioSimulador";
import { GreenhouseInfo } from "./GreenhouseInfo";
import { TopNavBar } from "./TopNavBar/TopNavBar";
import { SimulatorContext } from "../context/SimulatorContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

export const SimuladorApp = () => {
  const [showGreenhouse, setShowGreenhouse] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [selectedGreenhouse, setSelectedGreenhouse] = useState();
  const [action, setAction] = useState(false);

  return (
    <>
      <Row className="cont_simulator">
        <TopNavBar />
        <div className="simulator">
          <FormularioSimulador
            setShowGreenhouse={setShowGreenhouse}
            messageError={messageError}
            setMessageError={setMessageError}
            action={action}
            setAction={setAction}
            selectedGreenhouse={selectedGreenhouse}
            setSelectedGreenhouse={setSelectedGreenhouse}
          />
          <div className="derecha">
            <section>
              {showGreenhouse && (
                <GreenhouseInfo
                  messageError={messageError}
                  setMessageError={setMessageError}
                  action={action}
                  setAction={setAction}
                  selectedGreenhouse={selectedGreenhouse}
                  setSelectedGreenhouse={setSelectedGreenhouse}
                />
              )}
            </section>
          </div>
        </div>
      </Row>
    </>
  );
};
