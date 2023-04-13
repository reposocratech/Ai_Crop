import React from "react";
import { Row } from "react-bootstrap";
import { TopNavBar } from "../../../components/NavBars/TopNavBar/TopNavBar";
import "./contact.scss";

export const Contact = () => {
  return (
    <Row className="cont_auth d-flex flex-column p-0">
      <TopNavBar />
      <section className="firstSectionContact">
        <div>
          <h1 className="title3">
            Datos de Contacto<span className="puntoFinal">.</span>
          </h1>
        </div>
        <div>
          <div className="bloqueParr">
            <p>
              Para cualquier consulta, podéis contactar directamente con nuestro
              servicio técnico
            </p>
          </div>
          <div className="contenedorEmail">
            <a className="special" href="http://">
              <p className="specialTwo two">
                <img
                  className="iconico upp"
                  src="assets/images/social/email.png"
                  alt="iconEmail"
                />{" "}
                AiCrops@hotmail.com
              </p>
            </a>
            <a className="special" href="http://">
              <p className="specialTwo two">
                <img
                  className="iconico upp"
                  src="/assets/images/social/telefono.png"
                  alt="iconphone"
                />
                +34 611 691 525
              </p>
            </a>
          </div>
        </div>
      </section>
    </Row>
  );
};
