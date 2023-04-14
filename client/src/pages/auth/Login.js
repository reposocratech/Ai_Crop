import React, { useContext, useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TopNavBar } from "../../components/NavBars/TopNavBar/TopNavBar";
import { saveLocalStorageAICrop } from "../../helpers/localStorage/localStorageAICrop";
import { AICropContext } from "../../context/AICropContext";
import axios from "axios";
import "./auth.scss";

const initialValue = {
  email: "",
  password: "",
};

export const Login = () => {

  const [login, setLogin] = useState(initialValue)
  const [messageError, setMessageError] = useState("")
  const [messageError2, setMessageError2] = useState("")
  const {setUser, setIsLogged} = useContext(AICropContext)
  const [emailValidation, setEmailValidation] = useState(false)


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    setMessageError("");
    setMessageError2("");
  };

  const validateEmail = () => {
    let string = login.email
    if (!string.includes("@") || !string.includes(".") || string.includes("@.")){
      setMessageError("El correo no es correcto");
      return false;
    } else {
      setMessageError("")
      setEmailValidation(true)
      return true;
    }

  }

  const currentUrl = window.location.href;
  const currentPath = window.location.pathname;
  console.log(currentUrl);
  console.log(currentPath);

  const handleSubmit = () => {
    if (validateEmail()){
      if (!login.email || !login.password){
        setMessageError("Debes rellenar todos los campos");
      } else{
        axios
        .post("http://localhost:4000/user/login", login)
        .then((res)=> {
          saveLocalStorageAICrop(res.data.token)
          setMessageError("");
          setMessageError2("");
          setUser(res.data.user)
          setIsLogged(true)
          const type = res.data.user.user_type;

          if (currentPath === '/login'){
            
            if (type === 2 || type === 3){
              navigate('/user')
            } else if (type === 1){
              navigate('/admin')
            } else {
              navigate('/error');
            }      
          } else {
            navigate(currentPath)
          }
        })
        .catch((err)=>{
          console.log(err);
          setMessageError2("Credenciales Incorrectas");
        })
      }
    }
    
  }

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <div>
      <Row className="cont_auth d-flex flex-column p-0">
        <TopNavBar />
        <main className="form">
          <h5 className="company_name">AI crop</h5>
          <div className="title">
            <h1 className="mb-5 mt-5">
              Login<span className="punto ms-1">.</span>
            </h1>
          </div>
          <p className="ms-1">
            ¿Aún no te has registrado?{" "}
            <span className="etiq_login" onClick={() => navigate("/register")}>
              Regístrate
            </span>
          </p>

          <main className="form_registro">
            <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">Email</label>
                  <input type="email" maxLength="50" 
                  name='email' 
                  value={login.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  />
            </div>

            <div id="floatContainer" className="float-container">
              <label htmlFor="floatField" className="verde2">
                Password
              </label>
              <input
                className="password"
                type="password"
                maxLength="20"
                name="password"
                value={login.password}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
              />
            </div>

            <article className="button_section">
              <button onClick={() => navigate("/info")}>Suscripciones</button>
              <button className="bg_verde" onClick={handleSubmit}>
                Login
              </button>
            </article>

            <p className="ms-1 mt-5">
              ¿Olvidaste la contraseña?{" "}
              <span
                className="etiq_login"
                onClick={() => {
                  navigate("../forgotpassword");
                }}
              >
                Recupérala
              </span>
            </p>
            <p className="mensajeError">{messageError}</p>
            <p className="mensajeError">{messageError2}</p>
          </main>
        </main>
      </Row>
    </div>
  );
};
