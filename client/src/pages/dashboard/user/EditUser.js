import React, { useContext, useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { AICropContext } from "../../../context/AICropContext";
import axios from "axios";
import './editUser.scss';
import { Countries } from '../../auth/lists/Countries'
import { SpainProvinces } from '../../auth/lists/SpainProvinces'

import { Row } from 'react-bootstrap';
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
export const EditUser = () => {
  const { user,setUser } = useContext(AICropContext);
  const [editUser, setEditUser] = useState(initialValue);
  const [file, setFile] =  useState();
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
                console.log("***** KEE PASAA********", res.data.img);
                if(res.data.img === ""){
                    setUser(editUser)
                }else{
                    setUser({...editUser, img:res.data.img})
                }
                navigate("/user")
            })
            .catch((err)=>console.log(err));
        }
        console.log(user,"el user");
  return (
    <section className='contEdit fondo'>
        
        <article className='nombre_apell'>

        <div id="floatContainer"  className="float-container">
            <label htmlFor="floatField">Nombre</label>
            <input
                type="text" maxLength="20" 
                placeholder='nombre'
                value={editUser.first_name}
                onChange={handleChange}
                name="first_name"
            />
        </div>

        <div id="floatContainer"  className="float-container">
            <label htmlFor="floatField">Apellido</label>
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
        </article>
        
        <article className='nombre_apell'>
<div id="floatContainer" className="float-container">
            <label htmlFor="floatField">Teléfono</label>
            <input
            placeholder='Teléfono'
            value={editUser.phone}
            onChange={handleChange}
            name="phone"        />
        </div>
        
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

        </article>

        
        

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
        
        <div id="floatContainer" className="float-container">
            <label htmlFor="floatField">Conocimientos</label>
           <input
            placeholder='conocimientos'
            value={editUser.user_knowledge}
            onChange={handleChange}
            name="user_knowledge"        /> 
        </div>

        <div id="floatContainer" className="float-container">
            <label htmlFor="floatField">Img</label>
            <input
            type="file"
            onChange={handleChangeFile}
        />
        </div>
        
        <article className='button_section'>
            <button onClick={handleSubmit} className='bg_verde'>aceptar</button>
            <button onClick={()=>navigate(-1)}>cancelar</button>
        </article>
        
        
    </section>

  )
}