import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './admin.scss'

export const Admin = () => {

  const [usersInfo, setUsersInfo] = useState();
  const navigate = useNavigate();
  const [action, setAction] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
 
    if (search === ""){

      axios
        .get('http://localhost:4000/admin/allUsers')
        .then((res)=>{
          setUsersInfo(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })

    } else {

      axios
        .get(`http://localhost:4000/admin/oneUser/${search}`)
        .then((res)=>{
          setUsersInfo(res.data)
        })
        .catch((err)=>{
          console.log(err);
        })

    }

    }, [action])

    const onDisable = (user_id) => {
      axios
        .get(`http://localhost:4000/admin/disableUser/${user_id}`)
        .then((res)=>{
          setAction(!action);
        })
        .catch((err)=>{
          console.log(err);
        })
    }

    const onEnable = (user_id) => {
      axios
        .get(`http://localhost:4000/admin/enableUser/${user_id}`)
        .then((res)=>{
          setAction(!action);
        })
        .catch((err)=>{
          console.log(err);
        })
    }

    const handleSearch = (e) => {
      setSearch(e.target.value)

      if (e.target.value != ""){

        axios
        .get(`http://localhost:4000/admin/oneUser/${e.target.value}`)
        .then((res)=>{
          setUsersInfo(res.data)
        })
        .catch((err)=>{
          console.log(err);
        })

      } else {
        axios
        .get('http://localhost:4000/admin/allUsers')
        .then((res)=>{
          setUsersInfo(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }

    const resetInput = () => {
      setSearch("")
      setAction(!action);
    }

  return (
    <div className='cont_admin'>
      <section className='botones_admin'>
        <button onClick={()=>navigate('/')}><img src='/assets/images/go_back.png'/></button>
      </section>
      <header className='header_admin'>
        <h1 className='titleMini'>bienvenido, administrador</h1>
        <div className='search'>
          <input type="text" maxLength="50" 
          placeholder='Buscar usuario'
          name='search' 
          value={search}
          onChange={handleSearch}
          />
          <h5 onClick={resetInput}>x</h5>
        </div>
      </header>
      <p>Puede ver aquí a todos los usarios registrados en la App</p>
      <main className='main_admin'>
        {usersInfo?.map((elem, index)=>{

          let tipo_de_user = ""
          switch (elem.user_type){
            case 1:
              tipo_de_user = "Admin"
              break;
            case 2:
              tipo_de_user = "Agricultor"
              break;
            case 3:
              tipo_de_user = "Colaborador"
              break;
            default:
              console.log("pringao2")
          }

          let filterdisabled = ""

          if (elem.is_disabled){
            filterdisabled = "disabledCard"
          }

          return(
            <div className={`card_user ${filterdisabled}`} key={index} >
              <section onClick={()=>{navigate('')}}>
                <div className='info_user'>
                <h5>{elem.full_name}</h5>
                <p>{elem.email}</p>
                <p className='num_gh'>{elem.n_of_greenhouses} invernadero(s)</p>
                <p>{tipo_de_user}</p>
                </div>
                {!elem.is_disabled ? 
                <img className='disable' src='/assets/images/config_admin2.png' onClick={()=> {onDisable(elem.user_id)}}/>
                :
                <img className='disable' src='/assets/images/config_admin2.png' onClick={()=> {onEnable(elem.user_id)}}/>
                }
              </section>
              <hr/>
            </div>
          )
        })}
      </main>
    </div>
  )
}
