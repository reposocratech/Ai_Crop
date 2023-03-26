import React, { useContext, useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { AICropContext } from "../../../context/AICropContext";
import axios from "axios";
import './editUser.scss';
import { Countries } from '../../auth/lists/Countries'
import { SpainProvinces } from '../../auth/lists/SpainProvinces'

import { Row } from 'react-bootstrap';
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
}
export const EditUser = (/* {showModalNotif,setShowModalNotif} */) => {
  const { user,setUser } = useContext(AICropContext);
  const [editUser, setEditUser] = useState(initialValue);
  const [file, setFile] =  useState();
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [showModalNotif, setShowModalNotif] = useState(false);

    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
        setEditUser(user)
        }
    },[user])
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setEditUser({...editUser, [name]:value})
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
                console.log(editUser);
                console.log(res.data);
                console.log("***** KEE PASAA********", res.data.img);
                if(res.data.img === ""){
                    setUser(editUser)
                }else{
                    setUser({...editUser, user_photo:res.data.img})
                    
                }
                navigate("/user")
            })
            .catch((err)=>console.log(err));
        }

        const handleForm1 = ()=>{

            setShowForm1(!showForm1);
            setShowForm2(false);
            setShowForm3(false);
        }
        
        const handleForm2 = ()=>{

            setShowForm2(!showForm2);
            setShowForm1(false);
            setShowForm3(false);
        }
        
        const handleForm3 = ()=>{

            setShowForm3(!showForm3);
            setShowForm2(false);
            setShowForm1(false);
        }
        
  return (
    <section className='contEdit'>
        

        <header className='botones_user'>
            <button onClick={()=>navigate(-1)}><img src='/assets/images/go_back.png'/></button>
            <ButtonNotif setShowModalNotif={setShowModalNotif}/>
            <ModalNotif showModalNotif={showModalNotif} setShowModalNotif={setShowModalNotif}/>

        </header>
        <div className='tituloEdit'> <h1 className='mb-5 mt-5'>Configuración...<span className='punto'>...</span></h1>
        </div>
        

        {showForm1 && 
        //PARTE 1-----
        <section /* className='contEdit fondo' */>
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
                    name= "last_name"        />
            </div>
            
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">DNI</label>
                <input
                placeholder='Documento de identificación'
                value={editUser.dni}
                onChange={handleChange}
                name="dni"        />
            </div>

            <div id="floatContainer" className="float-container">

            <label htmlFor="floatField">Teléfono</label>
            <input
            placeholder='Teléfono'
            value={editUser.phone}
            onChange={handleChange}
            name="phone"        />
        </div>


        </section>
        }
        
        {showForm2 && 
        <section >
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">Dirección</label>
                <input
                placeholder='Dirección'
                value={editUser.address}
                onChange={handleChange}
                name="address"        />
            </div>
            
            <div id="floatContainer" className="float-container">
                <label htmlFor="floatField">C.P.</label>
                <input
                placeholder='Codigo Postal'
                value={editUser.post_code}
                onChange={handleChange}
                name="post_code"        />

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

                    {editUser.country === "España" ?
                    
                    <>
                    <label htmlFor="floatField">Provincia</label>
                    <select id="countries" className='select_form'
                    required 
                    name='city' 
                    value={editUser.city}
                    onChange={handleChange}>
                        <SpainProvinces/>
                    </select>
                    </>
                    :
                    <>
                    <label htmlFor="floatField">Ciudad</label>
                    <input type="text" maxLength="80" required 
                    name='city' 
                    value={editUser.city}
                    onChange={handleChange}/>
                    </>
                    }
                </div>
           
        </section>
         }

         {showForm3 &&
         <section > 
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
                onChange={handleChangeFile}
            />
            </div>
            
            
        </section>
}

    <article  className='button_section'>
    <button onClick={handleForm1}>{showForm1? `volver `:` Datos personales`}</button>
    <button onClick={handleForm2}>{showForm2? `volver `:`Localización`}</button>
    <button onClick={handleForm3}>{showForm3? `volver `:`Perfil `}</button>
    </article>

            <article className='button_section'>
                <button onClick={handleSubmit} className='bg_verde'>aceptar</button>
                
            </article>

    </section>

  )
}