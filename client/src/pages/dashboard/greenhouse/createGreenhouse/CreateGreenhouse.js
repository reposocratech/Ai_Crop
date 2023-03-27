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
    responsibility_acknowledged: false
}

const initialValueMaxMin = {
    measurement_type_id: "",
    max : "",
    min : ""
}

export const CreateGreenhouse = () => {

  const user_id = useContext(AICropContext).user?.user_id;

  const [showForm2, setShowForm2] = useState(false);
  const [greenhouseInfo, setGreenhouseInfo] = useState(initialValueInfo);
  const [temperatura, setTemperatura] = useState(initialValueMaxMin);
  const [co2, setCo2] = useState(initialValueMaxMin);
  const [humidity, setHumidity] = useState(initialValueMaxMin);
  const [sunlight, setSunlight] = useState(initialValueMaxMin);
  const [ph, setPh] = useState(initialValueMaxMin);
  const [conductivity, setConductivity] = useState(initialValueMaxMin);
  const [leafHumidity, setLeafHumidity] = useState(initialValueMaxMin);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  let arrayMeasures = [];

  const handleResponsability = (e) => {
    const name = e.target.name;
    let value = e.target.checked;
    value? value = 1 : value = 0;
    setGreenhouseInfo({...greenhouseInfo, [name]:value})
    console.log(greenhouseInfo);
  }

  const handleChangeGreenhouseInfo = (e) => {
    const {name, value} = e.target;
    setGreenhouseInfo({...greenhouseInfo, [name]:value, user_owner_id:user_id})
  }

  // HANDLE CHANGE MEDIDAS
  const handleChangeTemp = (e) => {
    const {name, value} = e.target;
    setTemperatura({...temperatura, [name]:value, measurement_type_id:1});
    
  }
  const handleChangeCo2 = (e) => {
    const {name, value} = e.target;
    setCo2({...co2, [name]:value, measurement_type_id:2})
  }
  const handleChangeHumidity = (e) => {
    const {name, value} = e.target;
    setHumidity({...humidity, [name]:value, measurement_type_id:3})
  }
  const handleChangeSunlight = (e) => {
    const {name, value} = e.target;
    setSunlight({...sunlight, [name]:value, measurement_type_id:4})
  }
  const handleChangepH = (e) => {
    const {name, value} = e.target;
    setPh({...ph, [name]:(value), measurement_type_id:5})
  }
  const handleChangeConductivity = (e) => {
    const {name, value} = e.target;
    setConductivity({...conductivity, [name]:value, measurement_type_id:6})
  }
  const handleChangeLeafHumidity = (e) => {
    const {name, value} = e.target;
    setLeafHumidity({...leafHumidity, [name]:value, measurement_type_id:7})
  }
  // -----------------------------------

  useEffect(() => {

    if (parseFloat(temperatura.min) > parseFloat(temperatura.max) || parseFloat(co2.min) > parseFloat(co2.max) || parseFloat(humidity.min) > parseFloat(humidity.max) || parseFloat(sunlight.min) > parseFloat(sunlight.max) || parseFloat(ph.min) > parseFloat(ph.max) || parseFloat(conductivity.min) > parseFloat(conductivity.max) || parseFloat(leafHumidity.min) > parseFloat(leafHumidity.max)){
      setError("Los mínimos no deben superar los máximos")
    } 
    else {
      setError("");
    }

  }, [temperatura, co2, humidity, sunlight, ph, conductivity, leafHumidity])
  

  const handleContinue = () => {
    setShowForm2(true)
  }

  const handleBack = () => {
    setShowForm2(false)
  }
  
  const handleSubmit = () => {
    arrayMeasures.push(temperatura, co2, humidity, sunlight, ph, conductivity, leafHumidity);
    console.log(arrayMeasures);
    console.log(greenhouseInfo);
    axios
      .post("http://localhost:4000/greenhouse/createGreenhouse", {greenhouseInfo, arrayMeasures})
      .then((res)=> {
        console.log(res.data);
        navigate('/user');
      })
      .catch((err)=>{
        console.log(err);
      })
  }


  return (
    <div className='cont_greenhouses'>
      <section className='botones_user'>
        <button onClick={()=>navigate(-1)}><img src='/assets/images/go_back.png'/></button>
      </section>
      <header className='header_greenhouses'>
        <h1 className='create_gh'>crear invernadero</h1>
      </header>
      {!showForm2 ? 
      // 1ª PARTE FORMULARIO
      <div>
      <main className='main_creategh'>
        <section className='top_section'>
          <h5>Empecemos por lo básico</h5>
          <img className='leaf_img' src='/assets/images/leaf_form.png'/>
        </section>
        {/* SECCIÓN FORMULARIO */}
        <Form className='form_creategh1'>
          <p>Ponle un nombre:</p>
          <input
          placeholder='Mi huerto de albahaca'
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
              autoComplete='off'
              className='input_1'
              name='greenhouse_location'
              value={greenhouseInfo.greenhouse_location}
              onChange={handleChangeGreenhouseInfo}
              />
            </div>
            <div>
              <p>Orientación:</p>
              <input
              className='input_1'
              placeholder='Norte'
              autoComplete='off'
              name='greenhouse_orientation'
              value={greenhouseInfo.greenhouse_orientation}
              onChange={handleChangeGreenhouseInfo}
              />
            </div>
          </article>
          {/* EXTENSIÓN Y TIPO INVERNADERO */}
          <article className='input_group'>
            <div>
              <p>Extensión (m2):</p>
              <input
              placeholder='15m2'
              autoComplete='off'
              className='input_1'
              name='greenhouse_size'
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
              >   <option>Slecciona Método de cultivo</option>
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
       <button onClick={handleContinue}><img src='/assets/images/next1.png'/></button>
        <img className='gh_img' src='/assets/images/greenhouse.png'/>
      </div>
      </div>
      :
      // 2ª PARTE FORMULARIO
      <main className='main2_creategh'>
        {/* SECCIÓN IZQ */}
        <section className='sect_1'>
          {error == "" ? 
          <p>Tú conoces tu cultivo mejor que nosotros...</p> :
          <p className='advise'>{error}</p>
          }
          <h5>¿Cuáles son sus límites?</h5>
          {/* TEMPERATURA */}
          <div className='measure'>
            <p>Temperatura</p>
            <article className='input_group'>
              <div className='container'>
                <label>Mínimo ºC</label>
                <input 
                type="number"
                maxLength="3"
                name='min'
                value={temperatura.min}
                onChange={handleChangeTemp}
                />
              </div>
              <div className='container'>
                <label>Máximo ºC</label>
                <input 
                type="number"
                minLength="2"
                maxLength="5"
                name='max'
                value={temperatura.max}
                onChange={handleChangeTemp}
                />
              </div>
            </article>
          </div>
          {/* CO2 */}
          <div className='measure'>
            <p>Co2</p>
            <article className='input_group'>
            <div className='container'>
                <label>Mínimo ppm</label>
                <input 
                type="number"
                maxLength="5"
                name='min'
                value={co2.min}
                onChange={handleChangeCo2}
                />
              </div>
              <div className='container'>
                <label>Máximo ppm</label>
                <input 
                type="number"
                maxLength="5"
                name='max'
                value={co2.max}
                onChange={handleChangeCo2}
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
                maxLength="5"
                name='min'
                value={humidity.min}
                onChange={handleChangeHumidity}
                />
              </div>
              <div className='container'>
                <label>Máximo %</label>
                <input 
                type="number"
                maxLength="5"
                name='max'
                value={humidity.max}
                onChange={handleChangeHumidity}
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
                maxLength="5"
                name='min'
                value={sunlight.min}
                onChange={handleChangeSunlight}
                />
              </div>
              <div className='container'>
                <label>Máximo nm</label>
                <input 
                type="number"
                maxLength="5"
                name='max'
                value={sunlight.max}
                onChange={handleChangeSunlight}
                />
              </div>
            </article>
          </div>
        </section>
        {/* SECCION DCHA */}
        <section className='sect_1'>
          <p className='advise'>Te notificaremos  en cuanto se excendan estos límites</p>
          <section className='l-measures'>
          {/* PH */}
          <div className='measure'>
            <p>pH</p>
            <article className='input_group'>
              <div className='container'>
                <label>Mínimo</label>
                <input 
                type="number"
                maxLength="5"
                name='min'
                value={ph.min}
                onChange={handleChangepH}
                />
              </div>
              <div className='container'>
                <label>Máximo</label>
                <input 
                type="number"
                maxLength="5"
                name='max'
                value={ph.max}
                onChange={handleChangepH}
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
                maxLength="5"
                name='min'
                value={conductivity.min}
                onChange={handleChangeConductivity}
                />
              </div>
              <div className='container'>
                <label>Máximo mS/cm</label>
                <input 
                type="number"
                maxLength="5"
                name='max'
                value={conductivity.max}
                onChange={handleChangeConductivity}
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
                max={5}
                name='min'
                value={leafHumidity.min}
                onChange={handleChangeLeafHumidity}
                />
              </div>
              <div className='container'>
                <label>Máximo %</label>
                <input 
                type="number"
                maxLength="5"
                name='max'
                value={leafHumidity.max}
                onChange={handleChangeLeafHumidity}
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
            <button onClick={handleBack}><img src='/assets/images/back1.png'/></button>
            <button className='crear' onClick={handleSubmit} disabled={error != "" || greenhouseInfo.responsibility_acknowledged === 0}>Crear</button>
            <img className='gh_img' src='/assets/images/greenhouse.png'/>
          </div>
        </section>
      </main>
      }

    </div>
  )
}
