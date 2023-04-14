import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { TopNavBar } from "../../../components/NavBars/TopNavBar/TopNavBar";
import "./error.scss";
import { AICropContext } from "../../../context/AICropContext";

export const Error = () => {
  const [loading, setLoading] = useState(true);
  // const {} = useContext(AICropContext)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {!loading ? (
        <Row className="error d-flex flex-column justify-content-end">
          <TopNavBar />
          <Col className="main d-flex flex-column justify-content-center align-items-center">
            <div className="title text-center">
              <h1>Error</h1>
              <h2>La página que está buscando no existe</h2>
            </div>
          </Col>
        </Row>
      ) : (
        <div></div>
      )}
    </>
  );
};
