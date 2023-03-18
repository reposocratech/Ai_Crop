import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from '../pages/home/Home'
import { Container } from 'react-bootstrap'
import { Register } from '../pages/auth/Register'
import { Login } from '../pages/auth/Login'
import { About } from '../pages/home/about/About'


export const AppRoutes = () => {
  return (
    <div>
        <Container fluid>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/about' element={<About/>}/>
                </Routes>
            </BrowserRouter>
        </Container>
    </div>
  )
}
