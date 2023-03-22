import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import { Login } from '../pages/auth/Login'
import { Error } from '../pages/dashboard/error/Error'
import { SimuladorApp } from '../components/SimuladorApp'
import { TopNavBar } from '../components/TopNavBar/TopNavBar'

import '../components/style.scss'


export const SimulatorRoutes = () => {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <Container fluid>
      <Row className='cont_auth d-flex flex-column'>
        <TopNavBar isLogged = {isLogged}/>
        <BrowserRouter>
          <Routes>
            {/* {isLogged 
            ?  */}
            <Route path='' element={<SimuladorApp/>}/> 
            {/* : */}
            <Route path='login' element={<Login setIsLogged = {setIsLogged}/>}/>
            {/* } */}
            <Route path='*' element={<Error/>} />
          </Routes>
        </BrowserRouter>
      </Row>
    </Container>
  )
}
