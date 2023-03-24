import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home/Home'
import { Container } from 'react-bootstrap'
import { Register } from '../pages/auth/Register'
import { Login } from '../pages/auth/Login'
import { OneGreenhouse } from '../pages/dashboard/greenhouse/oneGreenhouse/OneGreenhouse'
import { Error } from '../pages/dashboard/error/Error'
import { Admin } from '../pages/admin/Admin'
import { AllGreenhouses } from '../pages/dashboard/greenhouse/allGreenhouses/AllGreenhouses'
import { Measure} from '../pages/dashboard/measure/Measure'
import { EditUser } from '../pages/dashboard/user/EditUser'
import { MainPage } from '../pages/dashboard/MainPage/MainPage'


export const AppRoutes = () => {
  return (
    <div>
        <Container fluid>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Home/>}/> 
                    <Route path='register' element={<Register/>}/>
                    <Route path='login' element={<Login/>}/>

                    <Route path='user' element={<MainPage/>}> {/*Vista de user == Vista de todos sus greenhouses*/}
                      <Route path='' element={<AllGreenhouses/>}/> 
                      <Route path=':greenhouse' element={<OneGreenhouse/>}/>
                      <Route path=':greenhouse/:measure' element={<Measure/>}/>
                      <Route path='edit' element={<EditUser/>}/>
                    </Route>

                    <Route path='admin' element={<Admin/>}/> {/*Vista de TODOS los usuarios (card per user)*/}
                    <Route path='*' element={<Error/>} />
                </Routes>
            </BrowserRouter>
        </Container>
    </div>
  )
}
