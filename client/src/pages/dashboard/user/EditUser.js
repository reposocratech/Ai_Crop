import React, { useContext, useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { AICropContext } from "../../../context/AICropContext";
import axios from "axios";
import './editUser.scss';
import { Countries } from '../../auth/lists/Countries'
import { ButtonNotif } from '../../../components/Notifications/ButtonNotif';
import { ModalNotif } from '../../../components/Notifications/ModalNotif';
const initialValue = {
  first_name: "",
  last_name:"",
  dni: "",
  phone: "",
  address: "",
  post_code: "",
  city: "",
  country: "",
  user_knowledge: "",
  user_type: 2,
}
const initialValuePass = {
  email: "",
  currentPass: "",
  newPass: "",
  newPassConfirm: "",
}
export const EditUser = (/* {showModalNotif,setShowModalNotif} */) => {
  const { user, setUser } = useContext(AICropContext);
  const [editUser, setEditUser] = useState(initialValue);
  const [file, setFile] =  useState();
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState("")
  const [showErrorPassword2, setShowErrorPassword2] = useState("")
  const [activeButton, setActiveButton] = useState(0);
  const [showModalNotif, setShowModalNotif] = useState(false);
  const [changePassForm, setChangePassForm] = useState(initialValuePass);
  const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            setEditUser(user)
        }
        console.log(user);
    },[user])
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setEditUser({...editUser, [name]:value})
        setShowErrorPassword("");
    }
     const handleChangeFile = (e) =>{
        setFile(e.target.files[0])
    }
    const handleSubmit = () =>{
        const newFormData = new FormData();
        newFormData.append("file", file);
        newFormData.append("register", JSON.stringify(editUser));
        axios
            .put(`http://localhost:4000/user/editUser/${user.user_id}`, newFormData)
            .then((res)=>{
                console.log(res.data);
                if(res.data.img === ""){
                    setUser(editUser)
                }else{
                    setUser({...editUser, user_photo:res.data.img})
                }
            })
            .catch((err)=>console.log(err));
            if( !changePassForm.currentPass || !changePassForm.newPass || !changePassForm.newPassConfirm && showForm4 ){
                setShowErrorPassword("Debes rellenar todos los campos");
            }
            else if( changePassForm.newPass !== changePassForm.newPassConfirm){
                setShowErrorPassword("La nueva contraseña y la validación no coinciden");
            }else if (changePassForm.currentPass && changePassForm.newPass && changePassForm.newPassConfirm && changePassForm.newPass === changePassForm.       newPassConfirm) {
                setShowErrorPassword("");
                axios
                    .post(`http://localhost:4000/user/changePassword`, changePassForm)
                    .then((res)=>{
                        console.log(res.data);
                        navigate("/user")
                    })
                    .catch((err)=>{
                    setShowErrorPassword("La contraseña no es correcta")
                    console.log(err.response.data,"error gordo")
                    }
                    );
                }
        }
        const handleForm1 = ()=>{
            setShowForm1(true);
            setShowForm2(false);
            setShowForm3(false);
            setShowForm4(false);
            setActiveButton(1);
        }
        const handleForm2 = ()=>{
            setShowForm1(false);
            setShowForm2(true);
            setShowForm3(false);
            setShowForm4(false);
            setActiveButton(2);
        }
        const handleForm3 = ()=>{
            setShowForm1(false);
            setShowForm2(false);
            setShowForm3(true);
            setShowForm4(false);
            setActiveButton(3);
        }
        const handleForm4 = ()=>{
            setShowForm1(false);
            setShowForm2(false);
            setShowForm3(false);
            setShowForm4(true);
            setActiveButton(4);
        }
        const handlePassword = (e) => {
            const {name, value} = e.target;
            setChangePassForm({...changePassForm, [name]:value, email: user.email})
            setShowErrorPassword("");
        }
  return (
    <section className='contEdit'>
        <header className='botones_user'>
            <button onClick={()=>navigate(-1)}><img alt='atrás' src='/assets/images/go_back.png'/></button>
            <ButtonNotif setShowModalNotif={setShowModalNotif}/>
            <ModalNotif showModalNotif={showModalNotif} setShowModalNotif={setShowModalNotif}/>
        </header>
        <div className='tituloEdit'><h1 >configuración</h1>
        <h4>Modificar información</h4>
        </div>

        <main className='main_edit'>
        
        {showForm1 && 
        // ---- PARTE 1 ----
        <section className='contEdit' >
          <div className='input_group'>

            <div id="floatContainer"  className="float-container">
                <label>Nombre</label>
                <input
                    type="text" maxLength="20"
                    placeholder='nombre'
                    value={editUser.first_name}
                    onChange={handleChange}
                    name="first_name"
                />
            </div>
            
            <div id="floatContainer"  className="float-container">
                <label >Apellido</label>
                <input
                type="text" maxLength="25"
                placeholder='Apellidos'
                value={editUser.last_name}
                onChange={handleChange}
                name= "last_name"/>
            </div>
            
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">DNI</label>
                <input
                placeholder='Documento de identificación'
                value={editUser.dni}
                onChange={handleChange}
                name="dni"      
                maxLength={14}/>
            </div>
            
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Teléfono</label>
                <input
                placeholder='Teléfono'
                value={editUser.phone}
                onChange={handleChange}
                name="phone"     
                maxLength={10}/>
            </div>

          </div>
        </section>
        }
        
        {showForm2 && 
        <section className='contEdit'>
          <div className='input_group'>

            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Dirección</label>
                <input
                placeholder='Dirección'
                value={editUser.address}
                onChange={handleChange}
                name="address" 
                maxLength={50}/>
            </div>
            
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">C.P.</label>
                <input
                placeholder='Codigo Postal'
                value={editUser.post_code}
                onChange={handleChange}
                name="post_code"       
                maxLength={10}/>
            </div>
            
            <div id="floatContainer" className="float-container">
                <label htmlFor="countries">País</label>
                <select id="countries" className='select_form'
                required
                name='country'
                value={editUser.country}
                onChange={handleChange}>
                <Countries/>
                </select>
            </div>

            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Ciudad</label>
                <input type="text" maxLength="80" required
                name='city'
                value={editUser.city}
                onChange={handleChange}/>
            </div>

          </div>
        </section>
         }
         
         
         {showForm3 &&
         <section className='contEdit'>
          <div className='input_group'>
          
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Conocimientos previos</label>
                <select id="countries" className='select_form'
                required
                name='user_knowledge'
                value={editUser.user_knowledge}
                onChange={handleChange}>
                  <option></option>
                  <option value="Agricultor tradicional">Agricultor tradicional</option>
                  <option value="Técnico en agricultura tradicional">Técnico en agricultura tradicional</option>
                  <option value="Técnico en agricultura hidropónica">Técnico en agricultura hidropónica</option>
                  <option value="Ingeniero agrónomo especializado en hidroponía">Ingeniero agrónomo especializado en hidroponía</option>
                </select>
            </div>
            
            <div id="floatContainer" className=" fileInput">
                <input
                type="file"
                name="src-file1"
                onChange={handleChangeFile}/>
            </div> 
            
          </div>
        </section>
        }
        
        
         {showForm4 &&
         <section className='contEdit' >
          <div className='input_group'>
          
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Correo electrónico</label>
                <input type="email" maxLength="80" required disabled
                name='email' className='disabled'
                value={user.email}/>
            </div>
            
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Contraseña actual</label>
                <input type="password" maxLength="80" required
                name='currentPass'
                value={changePassForm.currentPass}
                onChange={handlePassword}/>
            </div>
            
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Nueva contraseña</label>
                <input type="password" maxLength="80" required
                name='newPass'
                value={changePassForm.newPass}
                onChange={handlePassword}/>
            </div>
            
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Repetir contraseña</label>
                <input type="password" maxLength="80" required
                name='newPassConfirm'
                value={changePassForm.newPassConfirm}
                onChange={handlePassword}/>
            </div>
            
          </div>
          {showErrorPassword !=="" && <p className='mensajeError'> {showErrorPassword} </p>}
        </section>
        }
        
        <article  className='button_section'>
            <button onClick={handleForm1} className={activeButton === 1 ? 'active' : null}>Perfil</button>
            <button onClick={handleForm2} className={activeButton === 2 ? 'active' : null}>Localización</button>
            <button onClick={handleForm3} className={activeButton === 3 ? 'active' : null}>Avatar</button>
            <button onClick={handleForm4} className={activeButton === 4 ? 'active' : null}>Contraseña</button>
        </article>
      </main>

       <article className='bottom_section'>
           <button onClick={handleSubmit} className='bg_verde'>Aceptar</button>
           <img src='/assets/images/planta.png'/>
       </article>
    </section>
  )
}