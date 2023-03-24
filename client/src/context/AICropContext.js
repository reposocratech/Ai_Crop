import React, { createContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { getLocalStorageAICrop } from '../helpers/localStorage/localStorageAICrop';
import axios from 'axios';

export const AICropContext = createContext()

export const AICropProvider = (props) => {
    const [user, setUser] = useState();
    const [userAlarms, setUserAlarms] = useState();
    const [isLogged, setIsLogged] = useState(false);
    const [token, setToken] = useState();
    const [selectedGreenhouse, setSelectedGreenhouse] = useState();

    useEffect(() => {
        const tokenStorage = getLocalStorageAICrop();
        setToken(tokenStorage);

        if(tokenStorage) {
            let user_id = jwtDecode(tokenStorage).user.user_id;

            axios
                .get(`http://localhost:4000/user/getOneUser/${user_id}`)
                .then((res)=>{
                    setUser(res.data.resultUser[0])
                })
                .catch((error)=>console.log(error))

            axios
                .get(`http://localhost:4000/server/alarm/seeActiveAlarms/${user_id}`)
                .then((res)=>{
                    setUserAlarms(res.data)
                })
                .catch((error)=>console.log(error))
        }

    }, [])
    

  return (
    <AICropContext.Provider value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        userAlarms,
        setUserAlarms,
        selectedGreenhouse,
        setSelectedGreenhouse
    }}>
        {props.children}
    </AICropContext.Provider>
  )
}
