import React, { createContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { getLocalStorageAICrop } from '../helpers/localStorage/localStorageAICrop';
import axios from 'axios';

export const AICropContext = createContext()

export const AICropProvider = (props) => {
    const [user, setUser] = useState();
    // const [userGreenhouse, setUserGreenhouse] = useState();
    const [isLogged, setIsLogged] = useState(false)
    const [token, setToken] = useState()

    useEffect(() => {
        const token = getLocalStorageAICrop();
        setToken(token);

        if(token) {
            let user_id = jwtDecode(token).user.user_id;
            axios
                .get(`http://localhost:4000/user/getOneUser/${user_id}`)
                .then((res)=>{
                    setUser(res.data.resultUser[0])
                    // setUserTravels(res.data.resultTravel)
                })
                .catch((error)=>console.log(error))
        }

    }, [isLogged])
    

  return (
    <AICropContext.Provider value={{
        user,
        setUser,
        // userTravels,
        // setUserTravels,
        isLogged,
        setIsLogged
    }}>
        {props.children}
    </AICropContext.Provider>
  )
}
