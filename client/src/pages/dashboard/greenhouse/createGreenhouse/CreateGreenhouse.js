import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './creategreenhouse.scss'
import '../allGreenhouses/allgreenhouses.scss'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { AICropContext } from '../../../../context/AICropContext'

const initialValueInfo = {
    user_owner_id : "",
    greenhouse_name : "",
    greenhouse_location: "",
    greenhouse_orientation: "",
    greenhouse_size: "",
    greenhouse_type: "",
    responsibility_acknowledged: 0
}


const initialValueValidation = {
  temperature: {
    measurement_type_id: 1,
    max : 50,
    min : 0
  },
  co2: {
    measurement_type_id: 2,
    max : 9999.99,
    min : 0
  },
  humidity: {
    measurement_type_id: 3,
    max : 100,
    min : 0
  },
  sunlight: {
    measurement_type_id: 4,
    max : 9999.99,
    min : 0
  },
  ph: {
    measurement_type_id: 5,
    max : 14,
    min : 0
  },
  conductivity: {
    measurement_type_id: 6,
    max : 9999.99,
    min : 0
  },
  leafHumidity: {
    measurement_type_id: 7,
    max : 100,
    min : 0
  }
}

export const CreateGreenhouse = () => {

  const initialValueParameters = {
    temperature: {
      measurement_type_id: 1,
      max : "",
      min : "",
      error: "",
      nombre: "temperatura",
      unit: "ºC"
    },
    co2: {
      measurement_type_id: 2,
      max : "",
      min : "",
      error : "",
      nombre: "CO2",
      unit: "ppm"
    },
    humidity: {
      measurement_type_id: 3,
      max : "",
      min : "",
      error : "",
      nombre: "humedad",
      unit: "%"
    },
    sunlight: {
      measurement_type_id: 4,
      max : "",
      min : "",
      error : "",
      nombre: "luz solar",
      unit: "nm"
    },
    ph: {
      measurement_type_id: 5,
      max : "",
      min : "",
      error : "",
      nombre: "PH",
      unit: ""
    },
    conductivity: {
      measurement_type_id: 6,
      max : "",
      min : "",
      error : "",
      nombre: "conductividad",
      unit: "mS/cm"
    },
    leafHumidity: {
      measurement_type_id: 7,
      max : "",
      min : "",
      error : "",
      nombre: "humedad de la hoja",
      unit: "%"
    }
  }

  const user_id = useContext(AICropContext).user?.user_id;

  const [showForm2, setShowForm2] = useState(false);
  const [greenhouseInfo, setGreenhouseInfo] = useState(initialValueInfo);
  const [greenhouseParameters, setGreenhouseParameters] = useState(initialValueParameters);
  const [parametersValidation, setParametersValidation] = useState(initialValueValidation)
  const [error, setError] = useState("");  

  const navigate = useNavigate();

  let arrayMeasures = [];

  useEffect(() => {
    setGreenhouseParameters(initialValueParameters)
  }, [])
  

  const handleResponsability = (e) => {
    const name = e.target.name;
    let value = e.target.checked;
    value? value = 1 : value = 0;
    setGreenhouseInfo({...greenhouseInfo, [name]:value})
  }

  let disable = false;
  if (!greenhouseInfo?.greenhouse_name || !greenhouseInfo?.greenhouse_location || !greenhouseInfo?.greenhouse_orientation || !greenhouseInfo?.greenhouse_size || !greenhouseInfo?.greenhouse_type || greenhouseInfo?.greenhouse_type == ""){
    disable = true;
  }

  const handleChangeGreenhouseInfo = (e) => {
    const {name, value} = e.target;
    setGreenhouseInfo({...greenhouseInfo, [name]:value, user_owner_id:user_id})
  }

  const handleChangeParams = (e) => {
    const { title, name, value } = e.target;
    const { min, max } = parametersValidation[title];
    const { nombre, unit } = greenhouseParameters[title];

    let aux = { ...greenhouseParameters };
 
    const errorMessages = {
      minMaxEqual: `Los valores mínimos y máximos de ${nombre} no pueden ser iguales`,
      outOfRange: `El parámetro ${nombre} debe estar entre ${min}${unit} y ${max}${unit}`,
      minMaxComparison: `Los valores mínimos de ${nombre} no pueden ser mayores a los máximos`,
    };
  
    if (value < parseFloat(min) || value > parseFloat(max)) {
      aux[title] = { ...aux[title], error: errorMessages.outOfRange, [name]: value };
    } else if (name === "max" && parseFloat(greenhouseParameters[title].min) > value) {
      aux[title] = { ...aux[title], error: errorMessages.minMaxComparison, [name]: value };
    } else if (name === "min" && parseFloat(greenhouseParameters[title].max) !== "" && value > parseFloat(greenhouseParameters[title].max)) {
      aux[title] = { ...aux[title], error: errorMessages.minMaxComparison, [name]: value };
    } else if (name === "min" && value !== "" && value === greenhouseParameters[title].max) {
      aux[title] = { ...aux[title], error: errorMessages.minMaxEqual, [name]: value };
    } else if (name === "max" && value !== "" && value === greenhouseParameters[title].min) {
      aux[title] = { ...aux[title], error: errorMessages.minMaxEqual, [name]: value };
    } else {
      aux[title][name] = value;
      if ((name === "max" && greenhouseParameters[title]["max"] <= max && greenhouseParameters[title]["min"] >= min) || (name === "min" && value >= min && greenhouseParameters[title]["max"] <= max)) {
        aux[title].error = "";
      }
    }
  
    setGreenhouseParameters(aux);
  };

  // -----------------------------------

  useEffect(() => {

    if (greenhouseParameters.temperature.error !== ""){
      setError(greenhouseParameters.temperature.error)
    } else if (greenhouseParameters.co2.error !== ""){
      setError(greenhouseParameters.co2.error)
    } else if (greenhouseParameters.humidity.error !== ""){
      setError(greenhouseParameters.humidity.error)
    } else if (greenhouseParameters.sunlight.error !== ""){
      setError(greenhouseParameters.sunlight.error)
    } else if (greenhouseParameters.conductivity.error !== ""){
      setError(greenhouseParameters.conductivity.error)
    } else if (greenhouseParameters.ph.error !== ""){
      setError(greenhouseParameters.ph.error)
    } else if (greenhouseParameters.leafHumidity.error !== ""){
      setError(greenhouseParameters.leafHumidity.error)
    } else {
      setError("");
    }

  }, [greenhouseParameters])

  const handleContinue = () => {
    setShowForm2(true)
  }

  const handleBack = () => {
    setShowForm2(false)
  }
  
  const handleSubmit = () => {
    arrayMeasures.push(greenhouseParameters.temperature, greenhouseParameters.co2, greenhouseParameters.humidity, greenhouseParameters.sunlight, greenhouseParameters.ph, greenhouseParameters.conductivity, greenhouseParameters.leafHumidity);

    axios
      .post("http://localhost:4000/greenhouse/createGreenhouse", {greenhouseInfo, arrayMeasures})
      .then((res)=> {
        navigate('/user');
      })
      .catch((err)=>{
        console.log(err);
      })
  }


  return (
    <div className='cont_greenhouses'>
      <section className='botones_user'>
        <button onClick={()=>navigate(-1)}><img alt='icono atrás' src='/assets/images/go_back.png'/></button>
      </section>
      <header className='header_greenhouses'>
        <h1 className='create_gh'>crear invernadero</h1>
        <p className='conoces'>Tú conoces tu cultivo mejor que nosotros...</p>
      </header>
    {!showForm2 ? 
      // 1ª PARTE FORMULARIO
      <div>
      <main className='main_creategh'>
        <section className='top_section'>
          <h5>Empecemos por lo básico</h5>
          <img alt='imagen hoja' className='leaf_img' src='/assets/images/leaf_form.png'/>
        </section>
        {/* SECCIÓN FORMULARIO */}
        <Form className='form_creategh1'>
          <p>Ponle un nombre:</p>
          <input
          placeholder='Mi huerto de albahaca'
          maxLength={25}
          autoComplete='off'
          className='input_1'
          name='greenhouse_name'
          value={greenhouseInfo.greenhouse_name}
          onChange={handleChangeGreenhouseInfo}
          />
          {/* LOCALIDAD Y ORIENTACIÓN */}
          <article className='input_group'>
            <div>
              <p>Localidad:</p>
              <input
              placeholder='Torremolinos'
              maxLength={80}
              autoComplete='off'
              className='input_1'
              name='greenhouse_location'
              value={greenhouseInfo.greenhouse_location}
              onChange={handleChangeGreenhouseInfo}
              />
            </div>
            <div>
              <p>Orientación:</p>

              <select
              autoComplete='off'
              className='input_1 dark content-select'
              name='greenhouse_orientation'
              value={greenhouseInfo.greenhouse_orientation}
              onChange={handleChangeGreenhouseInfo}
              required> 
                <option value="">Selecciona orientación</option>
                <option value="Norte">Norte</option>
                <option value="Noreste">Noreste</option>
                <option value="Este">Este</option>
                <option value="Sureste">Sureste</option>
                <option value="Sur">Sur</option>
                <option value="Suroeste">Suroeste</option>
                <option value="Oeste">Oeste</option>
                <option value="Noroeste">Noroeste</option>
              </select>
              
            </div>
          </article>
          {/* EXTENSIÓN Y TIPO INVERNADERO */}
          <article className='input_group'>
            <div>
              <p>Extensión (m2):</p>
              <input
              placeholder='15'
              autoComplete='off'
              className='input_1'
              name='greenhouse_size'
              type="number"
              value={greenhouseInfo.greenhouse_size}
              onChange={handleChangeGreenhouseInfo}
              />
            </div>
            <div>
              <p>Tipo:</p>
              <select
              autoComplete='off'
              className='input_1 dark content-select'
              name='greenhouse_type'
              value={greenhouseInfo.greenhouse_type}
              onChange={handleChangeGreenhouseInfo}
              required> 
                <option value="">Selecciona método de cultivo</option>
                  <optgroup label="Cultivos en agua">
                    <option value="NFT">NFT</option>
                    <option value="NGS">NGS</option>
                    <option value="Balsa flotante">Balsa flotante</option>
                  </optgroup>
                  <optgroup label="Cultivos en aire">
                    <option value="Aeropónica">Aeropónica</option>
                  </optgroup>
                  <optgroup label="Cultivos en sustratps">
                    <option value="Ebb & Flow">Ebb & Flow</option>
                    <option value="De mecha">De meca</option>
                    <option value="Goteo">Goteo</option>
                  </optgroup>
              </select>
            </div>
          </article>
        </Form>
      </main>
      <div className='bottom_sect'>
       <button onClick={handleContinue} disabled={disable} ><img alt='icono continuar' src='/assets/images/next1.png'/></button>
        <img alt='icono invernadero' className='gh_img' src='/assets/images/greenhouse.png'/>
      </div>
      </div>
      :
      // 2ª PARTE FORMULARIO
      <main className='main2_creategh'>
        {/* SECCIÓN IZQ */}
        <section className='sect_1'>
          <h5>¿Cuáles son sus límites?</h5>
          {/* TEMPERATURA */}
          <div className='measure'>
            <p>Temperatura</p>
            <article className='input_group'>
              <div className='container'>
                <label>Mínimo ºC</label>
                <input 
                type="number"
                title="temperature"
                name='min'
                value={greenhouseParameters.temperature.min}
                onChange={handleChangeParams}
                />
              </div>
              <div className='container'>
                <label>Máximo ºC</label>
                <input 
                type="number"
                title="temperature"
                name='max'
                value={greenhouseParameters.temperature.max}
                onChange={handleChangeParams}
                />
              </div>
            </article>
          </div>
          <div className='measure'>
            <p>Co2</p>
            <article className='input_group'>
            <div className='container'>
                <label>Mínimo ppm</label>
                <input 
                type="number"
                title="co2"
                name='min'
                value={greenhouseParameters.co2.min}
                onChange={handleChangeParams}
                />
              </div>
              <div className='container'>
                <label>Máximo ppm</label>
                <input 
                type="number"
                title="co2"
                name='max'
                value={greenhouseParameters.co2.max}
                onChange={handleChangeParams}
                />
              </div>
            </article>
          </div>
          {/* HUMEDAD */}
          <div className='measure'>
            <p>Humedad</p>
            <article className='input_group'>
              <div className='container'>
                <label>Mínimo %</label>
                <input 
                type="number"
                title="humidity"
                name='min'
                value={greenhouseParameters.humidity.min}
                onChange={handleChangeParams}
                />
              </div>
              <div className='container'>
                <label>Máximo %</label>
                <input 
                type="number"
                title="humidity"
                name='max'
                value={greenhouseParameters.humidity.max}
                onChange={handleChangeParams}
                />
              </div>
            </article>
          </div>
          {/* LUZ SOLAR */}
          <div className='measure'>
            <p>Luz solar</p>
            <article className='input_group'>
              <div className='container'>
                <label>Mínimo nm</label>
                <input 
                type="number"
                title="sunlight"
                name='min'
                value={greenhouseParameters.sunlight.min}
                onChange={handleChangeParams}
                />
              </div>
              <div className='container'>
                <label>Máximo nm</label>
                <input 
                type="number"
                title="sunlight"
                name='max'
                value={greenhouseParameters.sunlight.max}
                onChange={handleChangeParams}
                />
              </div>
            </article>
          </div>
        </section>
        {/* SECCION DCHA */}
        <section className='sect_1'>
        {error === "" ? 
          <h6 className=''>Te notificaremos en cuanto se excendan estos límites</h6>
          :
          <p className='advise'>{error}</p>
          }
          
          <section className='l-measures'>
          {/* PH */}
          <div className='measure'>
            <p>pH</p>
            <article className='input_group'>
              <div className='container'>
                <label>Mínimo</label>
                <input 
                type="number"
                title="ph"
                name='min'
                value={greenhouseParameters.ph.min}
                onChange={handleChangeParams}
                />
              </div>
              <div className='container'>
                <label>Máximo</label>
                <input 
                type="number"
                title="ph"
                name='max'
                value={greenhouseParameters.ph.max}
                onChange={handleChangeParams}
                />
              </div>
            </article>
          </div>
          {/* CONDUCTIVIDAD */}
          <div className='measure'>
            <p>Conductividad</p>
            <article className='input_group'>
              <div className='container'>
                <label>Mínimo mS/cm</label>
                <input 
                type="number"
                title="conductivity"
                name='min'
                value={greenhouseParameters.conductivity.min}
                onChange={handleChangeParams}
                />
              </div>
              <div className='container'>
                <label>Máximo mS/cm</label>
                <input 
                type="number"
                title="conductivity"
                name='max'
                value={greenhouseParameters.conductivity.max}
                onChange={handleChangeParams}
                />
              </div>
            </article>
          </div>
          {/* HUMEDAD DE LA HOJA */}
          <div className='measure'>
            <p>Humedad de la hoja</p>
            <article className='input_group'>
              <div className='container'>
                <label>Mínimo %</label>
                <input 
                type="number"
                title="leafHumidity"
                name='min'
                value={greenhouseParameters.leafHumidity?.min}
                onChange={handleChangeParams}
                />
              </div>
              <div className='container'>
                <label>Máximo %</label>
                <input 
                type="number"
                title="leafHumidity"
                name='max'
                value={greenhouseParameters.leafHumidity?.max}
                onChange={handleChangeParams}
                />
              </div>
            </article>
          </div>
          </section>
          <div className='checkbox_cont'>
            <div>
            <p>Si las medidas no son las correctas, asumo la responsabilidad</p>
            <input type='checkbox' name='responsibility_acknowledged' value={greenhouseInfo.responsibility_acknowledged} onClick={handleResponsability}></input>
            </div>
          </div>
          {/* IMG Y BOTONES */}
          <div className='aaa'>
            <button onClick={handleBack}><img alt='icono atrás' src='/assets/images/back1.png'/></button>
            <button className='crear' onClick={handleSubmit} disabled={error != "" || greenhouseInfo.responsibility_acknowledged === 0}>Crear</button>
            <img alt='icono invernadero' className='gh_img' src='/assets/images/greenhouse.png'/>
          </div>
        </section>
      </main>
      }

    </div>
  )
}
