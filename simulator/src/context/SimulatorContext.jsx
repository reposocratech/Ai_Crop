import React, { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getLocalStorageSimulator } from "../helpers/localStorage/localStorageSimulator";
import axios from "axios";

export const SimulatorContext = createContext();

export const SimulatorProvider = (props) => {
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const tokenStorage = getLocalStorageSimulator();
    setToken(tokenStorage);

    if (tokenStorage) {
      let user_id = jwtDecode(tokenStorage).user.user_id;
      axios
        .get(`http://localhost:4000/user/getOneUser/${user_id}`)
        .then((res) => {
          setUser(res.data.resultUser[0]);
          setIsLogged(true);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <SimulatorContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        token,
      }}
    >
      {props.children}
    </SimulatorContext.Provider>
  );
};
