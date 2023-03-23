import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/auth/Login'
import { Error } from '../pages/dashboard/error/Error'
import { SimuladorApp } from '../components/SimuladorApp'
import { TopNavBar } from '../components/TopNavBar/TopNavBar'

import '../components/style.scss'


export const SimulatorRoutes = () => {
  const [isLogged, setIsLogged] = useState(false)

  return (
      <div className='cont_simulator'>
        <TopNavBar isLogged = {isLogged}/>
        <BrowserRouter>
          <Routes>
            <Route path='' element={<SimuladorApp/>}/> 
            <Route path='login' element={<Login setIsLogged = {setIsLogged}/>}/>
            <Route path='*' element={<Error/>} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}
