import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";

const initialValue = {
  temperatura: "",
  co2: "",
  humedad: "",
  luz_solar: "",
  ph: "",
  ce: "",
  humedad_hoja: "",
};

export const FormularioSimulador = ({
  setShowGreenhouse,
  messageError,
  setMessageError,
  action,
  setAction,
  selectedGreenhouse,
  setSelectedGreenhouse,
}) => {
  const [datosForm, setDatosForm] = useState(initialValue);
  const [messageValid, setMessageValid] = useState("");
  const [greenhousesList, setGreenhousesList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/simulator/getGreenhousesList`)
      .then((res) => {
        setGreenhousesList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setDatosForm({ ...datosForm, [name]: value });
    setMessageError("");
    setMessageValid("");
  };

  const handleGreenhouse = (e) => {
    setSelectedGreenhouse(e.target.value);
    if (e.target.value != "") {
      setShowGreenhouse(true);
      setAction(!action);
    } else {
      console.log("ERRORRR NO ELEGISTE NINGUN GH PAVOTE!");
    }
  };

  const handleSubmit = () => {
    if (
      !datosForm.temperatura &&
      !datosForm.co2 &&
      !datosForm.humedad &&
      !datosForm.luz_solar &&
      !datosForm.ph &&
      !datosForm.ce &&
      !datosForm.humedad_hoja
    ) {
      setMessageError("Formulario vacío. Ingrese medidas a simular");
      setMessageValid("");
    } else {
      if (selectedGreenhouse === "") {
        setMessageError("Elija un invernadero existente.");
        setMessageValid("");
      } else {
        axios
          .post("http://localhost:4000/simulator", {
            datosForm,
            selectedGreenhouse,
          })
          .then((res) => {
            setMessageError("");
            setMessageValid("Datos recibidos correctamente!");
            setDatosForm(initialValue);
            setAction(!action);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <section className="formulario">
      <div id="floatContainer" className="float-container">
        {/* <label htmlFor="floatField">Nombre del invernadero</label> */}
        <select
          id="greenhouse_id"
          required
          name="greenhouse_id"
          value={selectedGreenhouse}
          onChange={handleGreenhouse}
        >
          <option value={""}>Elije un invernadero</option>
          {greenhousesList?.map((elem, index) => {
            return (
              <option
                key={index}
                value={elem.greenhouse_id}
              >{`${elem.greenhouse_name} (${elem.greenhouse_owner_full_name})`}</option>
            );
          })}
        </select>
      </div>

      <div id="floatContainer" className="float-container">
        {/* <label htmlFor="floatField">Temperatura</label> */}
        <input
          type="number"
          placeholder="Temperatura (C)"
          name="temperatura"
          value={datosForm.temperatura}
          onChange={handleChange}
          max="9999"
        />
        <img src="./assets/termometro.png" />
      </div>

      <div id="floatContainer" className="float-container">
        {/* <label htmlFor="floatField">CO2</label> */}
        <input
          type="number"
          placeholder="CO2 (ppm)"
          name="co2"
          value={datosForm.co2}
          onChange={handleChange}
        />
        <img src="./assets/nube-de-co2.png" />
      </div>
      <div id="floatContainer" className="float-container">
        {/* <label htmlFor="floatField">Humedad</label> */}
        <input
          type="number"
          placeholder="Humedad (%)"
          name="humedad"
          value={datosForm.humedad}
          onChange={handleChange}
        />
        <img src="./assets/humedad.png" />
      </div>
      <div id="floatContainer" className="float-container">
        {/* <label htmlFor="floatField">Luz solar</label> */}
        <input
          type="number"
          placeholder="Luz solar (nm)"
          name="luz_solar"
          value={datosForm.luz_solar}
          onChange={handleChange}
        />
        <img src="./assets/soleado.png" />
      </div>
      <div id="floatContainer" className="float-container">
        {/* <label htmlFor="floatField">PH</label> */}
        <input
          type="number"
          placeholder="PH"
          name="ph"
          value={datosForm.ph}
          onChange={handleChange}
        />
        <img src="./assets/doctorado.png" />
      </div>
      <div id="floatContainer" className="float-container">
        {/* <label htmlFor="floatField">Conductividad Eléctrica</label> */}
        <input
          type="number"
          placeholder="CE (mS/cm)"
          name="ce"
          value={datosForm.ce}
          onChange={handleChange}
        />
        <img src="./assets/energia-renovable.png" />
      </div>
      <div id="floatContainer" className="float-container">
        {/* <label htmlFor="floatField">Humedad de la hoja</label> */}
        <input
          type="number"
          placeholder="Humedad de la hoja (%)"
          name="humedad_hoja"
          value={datosForm.humedad_hoja}
          onChange={handleChange}
        />
        <img src="./assets/agua.png" />
      </div>

      <button className="bg_verde" onClick={handleSubmit}>
        Simular
      </button>
      <p className="text-center mt-3 messageSent text-danger">{messageError}</p>
      {messageValid != "" && <p className="messageSent">{messageValid}</p>}
    </section>
  );
};
