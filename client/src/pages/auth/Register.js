import React, { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TopNavBar } from "../../components/NavBars/TopNavBar/TopNavBar";
import axios from "axios";
import { Countries } from "./lists/Countries";
import "./auth.scss";

const initialValue = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  dni: "",
  phone: "",
  address: "",
  post_code: "",
  city: "",
  country: "",
  user_knowledge: "",
  user_photo: "",
  user_type: 2,
};

export const Register = () => {
  const [register, setRegister] = useState(initialValue);
  const [messageError, setMessageError] = useState("");
  const [showForm1, setShowForm1] = useState(true);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [dupEmail, setDupEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    setMessageError("");
    setDupEmail("");
  };


  const handleBlur = () => {
    let string = register.email;
    if (
      !string.includes("@") ||
      !string.includes(".") ||
      string.includes("@.")
    ) {
      setMessageError("El correo no es correcto");
      setEmailValidation(false);
    } else {
      setMessageError("");
      setEmailValidation(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  // ---- Show/Dont show forms --- //

  const handleContinue1 = (e) => {
    // Pasa al 2 formulario
    if (
      !register.first_name ||
      !register.last_name ||
      !register.email ||
      !register.password
    ) {
      setMessageError("Debes rellenar todos los campos");
    } else if (!emailValidation) {
      setMessageError("El correo no es correcto");
      setDupEmail("duplicado");
      e.preventDefault();
      return;
    } else {
      setShowForm1(false);
      setShowForm2(true);
      setMessageError("");
      setDupEmail("");
    }
  };

  const handleContinue2 = () => {
    // Pasa al 3 formulario
    if (
      !register.first_name ||
      !register.last_name ||
      !register.email ||
      !register.password ||
      !register.city ||
      !register.country ||
      !register.address ||
      !register.post_code
    ) {
      setMessageError("Debes rellenar todos los campos");
    } else {
      setShowForm2(false);
      setShowForm3(true);
      setMessageError("");
    }
  };

  const handleBack1 = () => {
    // Vuele al 1 formulario
    setShowForm1(true);
    setShowForm2(false);
    setMessageError("");
  };

  const handleBack2 = () => {
    // Vuele al 2 formulario
    setShowForm3(false);
    setShowForm2(true);
    setMessageError("");
  };

  // ----------------- //

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !register.first_name ||
      !register.last_name ||
      !register.email ||
      !register.password ||
      !register.country ||
      !register.city ||
      !register.post_code ||
      !register.phone ||
      !register.user_knowledge
    ) {
      setMessageError("Debes rellenar todos los campos");
    } else if (!emailValidation) {
      setMessageError("El correo no es correcto");
    } else {
      axios
        .post("http://localhost:4000/user/createUser", register)
        .then((res) => {
          navigate("/login");
          setMessageError("");
        })
        .catch((err) => {
          if (err.response.data === "dup") {
            setMessageError("Este correo ya está en uso");
            setShowForm1(true);
            setShowForm2(false);
            setShowForm3(false);
            setDupEmail("duplicado");
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <div>
      <Row className="cont_auth d-flex flex-column p-0">
        <TopNavBar />
        <Form className="form">
          <h5 className="company_name">AI crop</h5>
          <div className="title">
            {showForm1 ? (
              <h1 className="mb-5 mt-5">
                Crear cuenta nueva<span className="punto ms-1">.</span>
              </h1>
            ) : (
              <h1 className="mb-5 mt-5">
                Ya casi estamos<span className="punto">...</span>
              </h1>
            )}
          </div>
          {showForm1 && (
            <p className="ms-1">
              ¿Ya estás registrado?{" "}
              <span className="etiq_login" onClick={() => navigate("/login")}>
                Log in
              </span>
            </p>
          )}

          {showForm1 && (
            // PARTE 1 FORMULARIO

            <section className="form_registro">
              <article className="nombre_apell">
                <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">Nombre</label>
                  <input
                    type="text"
                    maxLength="20"
                    required
                    name="first_name"
                    value={register.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">Apellido</label>
                  <input
                    type="text"
                    maxLength="25"
                    required
                    name="last_name"
                    value={register.last_name}
                    onChange={handleChange}
                  />
                </div>
              </article>

              <div
                id="floatContainer"
                className={`float-container ${dupEmail}`}
              >
                <label htmlFor="floatField">Email</label>
                <input
                  type="email"
                  maxLength="35"
                  required
                  name="email"
                  value={register.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  onBlur={handleBlur}
                />
              </div>

              <div id="floatContainer" className="float-container">
                <label htmlFor="floatField" className="verde2">
                  Password
                </label>
                <input
                  className="password"
                  type="password"
                  maxLength="25"
                  required
                  name="password"
                  value={register.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                />
              </div>

              <article className="button_section">
                <button onClick={() => navigate("/info")}>Suscripciones</button>
                <button className="bg_verde" onClick={handleContinue1}>
                  Continuar
                </button>
              </article>
              <p className="mensajeError">{messageError}</p>
            </section>
          )}

          {showForm2 && (
            // PARTE 2 FORMULARIO

            <section className="form_registro">
              <div id="floatContainer" className="float-container">
                <label htmlFor="countries">País</label>
                <select
                  id="countries"
                  className="select_form"
                  required
                  name="country"
                  value={register.country}
                  onChange={handleChange}
                >
                  <Countries />
                </select>
              </div>

              <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Ciudad</label>
                <input
                  type="text"
                  maxLength="80"
                  required
                  name="city"
                  value={register.city}
                  onChange={handleChange}
                />
              </div>

              <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Dirección</label>
                <input
                  type="text"
                  maxLength="40"
                  required
                  name="address"
                  value={register.address}
                  onChange={handleChange}
                />
              </div>

              <article className="button_section">
                <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">Código postal</label>
                  <input
                    type="text"
                    maxLength="25"
                    required
                    name="post_code"
                    value={register.post_code}
                    onChange={handleChange}
                  />
                </div>
                <button className="bg_verde" onClick={handleContinue2}>
                  Continuar
                </button>
              </article>
              <button className="atras mt-3" onClick={handleBack1}>
                ◄
              </button>
              <p className="mensajeError">{messageError}</p>
            </section>
          )}

          {showForm3 && (
            // PARTE 3 FORMULARIO

            <section className="form_registro">
              <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Conocimientos previos</label>
                <select
                  id="countries"
                  className="select_form"
                  required
                  name="user_knowledge"
                  value={register.user_knowledge}
                  onChange={handleChange}
                >
                  <option></option>
                  <option value="Agricultor tradicional">
                    Agricultor tradicional
                  </option>
                  <option value="Técnico en agricultura tradicional">
                    Técnico en agricultura tradicional
                  </option>
                  <option value="Técnico en agricultura hidropónica">
                    Técnico en agricultura hidropónica
                  </option>
                  <option value="Ingeniero agrónomo especializado en hidroponía">
                    Ingeniero agrónomo especializado en hidroponía
                  </option>
                </select>
              </div>

              <article className="nombre_apell">
                <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">DNI</label>
                  <input
                    type="text"
                    maxLength="15"
                    required
                    name="dni"
                    value={register.dni}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                  />
                </div>
                <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">Teléfono</label>
                  <input
                    type="tel"
                    maxLength="12"
                    required
                    name="phone"
                    value={register.phone}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                  />
                </div>
              </article>

              <article className="button_section">
                <button className="bg_verde" onClick={handleSubmit}>
                  Regístrate
                </button>
              </article>
              <button className="atras mt-3" onClick={handleBack2}>
                ◄
              </button>
              <p className="mensajeError">{messageError}</p>
            </section>
          )}
        </Form>
      </Row>
    </div>
  );
};
