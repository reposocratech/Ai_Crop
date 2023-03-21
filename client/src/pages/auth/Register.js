import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { TopNavBar } from '../../components/NavBars/TopNavBar/TopNavBar'
import axios from 'axios'

import "./auth.scss" 

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
    user_photo: "default_pic.png"
}

export const Register = () => {

  const [register, setRegister] = useState(initialValue);
  const [messageError, setMessageError] = useState("");
  const [showForm1, setShowForm1] = useState(true);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegister({...register, [name]:value})
  }


  // ---- Show/Dont show forms --- //

  const handleContinue1 = (e) => { // Pasa al 2 formulario
    if(!register.first_name || !register.last_name || !register.email || !register.password){
      console.log(register);
      setMessageError("Debes rellenar todos los campos")
     
    } else {
      setShowForm1(false)
      setShowForm2(true);
      console.log(register, "register")
    }
  }
  const handleContinue2 = (e) => { // Pasa al 3 formulario
    if(!register.first_name || !register.last_name || !register.email || !register.password ||!register.city || !register.country || !register.address || !register.post_code){
      setMessageError("Debes rellenar todos los campos")
    } else {
      setShowForm2(false)
      setShowForm3(true);
      console.log(register, "register")
    }
  }

  const handleBack1 = (e) => { // Vuele al 1 formulario
      setShowForm1(true)
      setShowForm2(false)
  }
  const handleBack2 = (e) => { // Vuele al 2 formulario
      setShowForm3(false)
      setShowForm2(true)
  }

  // ----------------- //


  const handleSubmit = () => {
    if(!register.first_name || !register.last_name || !register.email || !register.password || !register.country || !register.city || !register.post_code || !register.phone || !register.user_knowledge){
      setMessageError("Debes rellenar todos los campos")
    } else {
      axios
      .post("http://localhost:4000/user/createUser",register)
      .then((res)=>{
          console.log(res)
          navigate('/login')
        })
      .catch((err)=>{
        console.log(err.config);
        if(err.response.data.error.errno === 1062){
          setMessageError("email duplicado")
        }else{
          setMessageError("Error en el registro")

        }
      })
    }
  }

  return (
    <div>
      <Row className='cont_auth d-flex flex-column p-0'>
          <TopNavBar/>
          <main className='form'>
          <h5 className='company_name'>AI crop</h5>
          <div className='title'>
            {showForm1 ? 
            <h1 className='mb-5 mt-5'>Crear cuenta nueva<span className='punto ms-1'>.</span></h1> : 
            <h1 className='mb-5 mt-5'>Ya casi estamos<span className='punto'>...</span></h1>
            }
          </div>
            {!showForm2 || !showForm3 &&
          <p className='ms-1'>¿Ya estás registrado? <span className='etiq_login' onClick={()=>navigate('/login')}>Log in</span></p>
            }

        {showForm1 && 
          // PARTE 1 FORMULARIO
          <section className='form_registro'>

            <article className='nombre_apell'>
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Nombre</label>
                <input type="text" maxLength="20" required 
                name='first_name' 
                value={register.first_name}
                onChange={handleChange}
                />
            </div>
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Apellido</label>
                <input type="text" maxLength="25" required 
                name='last_name' 
                value={register.last_name}
                onChange={handleChange}
                />
            </div>
            </article>

            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Email</label>
                <input type="email" maxLength="30" required 
                name='email' 
                value={register.email}
                onChange={handleChange}
                />
            </div>

            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField" className='verde2'>Password</label>
                <input className='password' type="password" maxLength="25" required
                name='password' 
                value={register.password}
                onChange={handleChange}
                />
            </div>

            <article className='button_section'>
              <button>Suscripciones</button>
              <button className='bg_verde' onClick={handleContinue1}>Continuar</button>
            </article>
            <p className='text-center mt-3 text-danger'>{messageError}</p>

          </section> 
        }

        {showForm2 &&
          // PARTE 2 FORMULARIO
          <section className='form_registro'>

            <div id="floatContainer" className="float-container">
                <label htmlFor="countries">País</label>
                <select id="countries" className='select_form'
                required 
                name='country' 
                value={register.country}
                onChange={handleChange}>
                  <option></option>
                  <option value="Afganistán">Afganistán</option>
                  <option value="Albania">Albania</option>
                  <option value="Alemania">Alemania</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Antigua y Barbuda">Antigua y Barbuda</option>
                  <option value="Arabia Saudita">Arabia Saudita</option>
                  <option value="Argelia">Argelia</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaiyán">Azerbaiyán</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bangladés">Bangladés</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Baréin">Baréin</option>
                  <option value="Bélgica">Bélgica</option>
                  <option value="Belice">Belice</option>
                  <option value="Benín">Benín</option>
                  <option value="Bielorrusia">Bielorrusia</option>
                  <option value="Birmania/Myanmar">Birmania/Myanmar</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia y Herzegovina">Bosnia y Herzegovina</option>
                  <option value="Botsuana">Botsuana</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Brunéi">Brunéi</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Bután">Bután</option>
                  <option value="Cabo Verde">Cabo Verde</option>
                  <option value="Camboya">Camboya</option>
                  <option value="Camerún">Camerún</option>
                  <option value="Canadá">Canadá</option>
                  <option value="Catar">Catar</option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Chipre">Chipre</option>
                  <option value="Ciudad del Vaticano">Ciudad del Vaticano</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoras">Comoras</option>
                  <option value="Corea del Norte">Corea del Norte</option>
                  <option value="Corea del Sur">Corea del Sur</option>
                  <option value="Costa de Marfil">Costa de Marfil</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Croacia">Croacia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Dinamarca">Dinamarca</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egipto">Egipto</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Emiratos Árabes Unidos">Emiratos Árabes Unidos</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Eslovaquia">Eslovaquia</option>
                  <option value="Eslovenia">Eslovenia</option>
                  <option value="España">España</option>
                  <option value="Estados Unidos">Estados Unidos</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Etiopía">Etiopía</option>
                  <option value="Filipinas">Filipinas</option>
                  <option value="Finlandia">Finlandia</option>
                  <option value="Fiyi">Fiyi</option>
                  <option value="Francia">Francia</option>
                  <option value="Gabón">Gabón</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Granada">Granada</option>
                  <option value="Grecia">Grecia</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea ecuatorial">Guinea ecuatorial</option>
                  <option value="Guinea-Bisáu">Guinea-Bisáu</option>
                  <option value="Haití">Haití</option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hungría">Hungría</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Irak">Irak</option>
                  <option value="Irán">Irán</option>
                  <option value="Irlanda">Irlanda</option>
                  <option value="Islandia">Islandia</option>
                  <option value="Islas Marshall">Islas Marshall</option>
                  <option value="Islas Salomón">Islas Salomón</option>
                  <option value="Israel">Israel</option>
                  <option value="Italia">Italia</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japón">Japón</option>
                  <option value="Jordania">Jordania</option>
                  <option value="Kazajistán">Kazajistán</option>
                  <option value="Kenia">Kenia</option>
                  <option value="Kirguistán">Kirguistán</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Laos">Laos</option>
                  <option value="Lesoto">Lesoto</option>
                  <option value="Letonia">Letonia</option>
                  <option value="Líbano">Líbano</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libia">Libia</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lituania">Lituania</option>
                  <option value="Luxemburgo">Luxemburgo</option>
                  <option value="Macedonia del Norte">Macedonia del Norte</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malasia">Malasia</option>
                  <option value="Malaui">Malaui</option>
                  <option value="Maldivas">Maldivas</option>
                  <option value="Malí">Malí</option>
                  <option value="Malta">Malta</option>
                  <option value="Marruecos">Marruecos</option>
                  <option value="Mauricio">Mauricio</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="México">México</option>
                  <option value="Micronesia">Micronesia</option>
                  <option value="Moldavia">Moldavia</option>
                  <option value="Mónaco">Mónaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Níger">Níger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Noruega">Noruega</option>
                  <option value="Nueva Zelanda">Nueva Zelanda</option>
                  <option value="Omán">Omán</option>
                  <option value="Países Bajos">Países Bajos</option>
                  <option value="Pakistán">Pakistán</option>
                  <option value="Palaos">Palaos</option>
                  <option value="Panamá">Panamá</option>
                  <option value="Papúa Nueva Guinea">Papúa Nueva Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Perú">Perú</option>
                  <option value="Polonia">Polonia</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Reino Unido">Reino Unido</option>
                  <option value="República Centroafricana">República Centroafricana</option>
                  <option value="República Checa">República Checa</option>
                  <option value="República del Congo">República del Congo</option>
                  <option value="República Democrática del Congo">República Democrática del Congo</option>
                  <option value="República Dominicana">República Dominicana</option>
                  <option value="República Sudafricana">República Sudafricana</option>
                  <option value="Ruanda">Ruanda</option>
                  <option value="Rumanía">Rumanía</option>
                  <option value="Rusia">Rusia</option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Cristóbal y Nieves">San Cristóbal y Nieves</option>
                  <option value="San Marino">San Marino</option>
                  <option value="San Vicente y las Granadinas">San Vicente y las Granadinas</option>
                  <option value="Santa Lucía">Santa Lucía</option>
                  <option value="Santo Tomé y Príncipe">Santo Tomé y Príncipe</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leona">Sierra Leona</option>
                  <option value="Singapur">Singapur</option>
                  <option value="Siria">Siria</option>
                  <option value="Somalia">Somalia</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Suazilandia">Suazilandia</option>
                  <option value="Sudán">Sudán</option>
                  <option value="Sudán del Sur">Sudán del Sur</option>
                  <option value="Suecia">Suecia</option>
                  <option value="Suiza">Suiza</option>
                  <option value="Surinam">Surinam</option>
                  <option value="Tailandia">Tailandia</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Tayikistán">Tayikistán</option>
                  <option value="Timor Oriental">Timor Oriental</option>
                  <option value="Togo">Togo</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad y Tobago">Trinidad y Tobago</option>
                  <option value="Túnez">Túnez</option>
                  <option value="Turkmenistán">Turkmenistán</option>
                  <option value="Turquía">Turquía</option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Ucrania">Ucrania</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistán">Uzbekistán</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Yibuti">Yibuti</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabue">Zimbabue</option>
                </select>
            </div>
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Ciudad</label>
                <input type="text" maxLength="80" required 
                name='city' 
                value={register.city}
                onChange={handleChange}
                />
            </div>
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Address</label>
                <input type="text" maxLength="25" required 
                name='address' 
                value={register.address}
                onChange={handleChange}
                />
            </div>
            <article className='button_section'>
            <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">Código postal</label>
                  <input type="text" maxLength="25" required 
                  name='post_code' 
                  value={register.post_code}
                  onChange={handleChange}
                  />
            </div>
              <button className='bg_verde' onClick={handleContinue2}>Continuar</button>
            </article>
            <button className='atras mt-3' onClick={handleBack1}>◄</button>
            <p className='text-center mt-3 text-danger'>{messageError}</p>
          </section>
        }

        {showForm3 && 
          // PARTE 3 FORMULARIO
          <section className='form_registro'>

            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Conocimientos previos</label>
                <select id="countries" className='select_form'
                required 
                name='user_knowledge' 
                value={register.user_knowledge}
                onChange={handleChange}>
                  <option></option>
                  <option value="Agricultor tradicional">Agricultor tradicional</option>
                  <option value="Técnico en agricultura tradicional">Técnico en agricultura tradicional</option>
                  <option value="Técnico en agricultura hidropónica">Técnico en agricultura hidropónica</option>
                  <option value="Ingeniero agrónomo especializado en hidroponía">Ingeniero agrónomo especializado en hidroponía</option>
                </select>
            </div>

            <article className='nombre_apell'>
              <div id="floatContainer" className="float-container">
                  <label htmlFor="floatField">DNI</label>
                  <input type="text" maxLength="25" required 
                  name='dni' 
                  value={register.dni}
                  onChange={handleChange}
                  />
              </div>
              <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Teléfono</label>
                <input type="number" maxLength="20" required 
                name='phone' 
                value={register.phone}
                onChange={handleChange}
                />
              </div>
            </article>

            <article className='button_section'>
              <button className='bg_verde' onClick={handleSubmit}>Regístrate</button>
            </article>
            <button className='atras mt-3' onClick={handleBack2}>◄</button>
            <p className='text-center mt-3 text-danger'>{messageError}</p>

          </section>
        }

          </main>


      </Row>
    </div>
  )
}