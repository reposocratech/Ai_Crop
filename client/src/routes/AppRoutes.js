import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from '../pages/home/Home'
import { Container } from 'react-bootstrap'
import { Register } from '../pages/auth/Register'
import { Login } from '../pages/auth/Login'
import { About } from '../pages/home/about/About'
import { User } from '../pages/user/User'
import { OneGreenhouse } from '../components/MainPage/ShowCasePages/OneGreenhouse'
import { Error } from '../pages/dashboard/error/Error'
import { Admin } from '../pages/admin/Admin'
import { AllGreenhouses } from '../components/MainPage/ShowCasePages/AllGreenhouses'


export const AppRoutes = () => {
  return (
    <div>
        <Container fluid >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>

                    <Route path='/user' element={<User/>}>
                      <Route path='greenhouse_id' element={<OneGreenhouse/>}/>
                      <Route path='' element={<AllGreenhouses/>}/>
                    </Route>

                    <Route path='/admin' element={<Admin/>}/>
                    <Route path='*' element={<Error/>} />
                </Routes>
            </BrowserRouter>
        </Container>
    </div>
  )
}
