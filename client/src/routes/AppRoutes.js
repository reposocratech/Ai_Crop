import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from '../pages/home/Home'
import { Container } from 'react-bootstrap'
import { Register } from '../pages/auth/Register'
import { Login } from '../pages/auth/Login'


export const AppRoutes = () => {
  return (
    <div>
        <Container fluid>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </Container>
    </div>
  )
}
