import React, { useContext, useState } from 'react'
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
import { Info } from '../pages/home/info/Info'
import { EditGreenhouse } from '../pages/dashboard/greenhouse/EditGreenhouse/EditGreenhouse'
import { AICropContext } from '../context/AICropContext'



export const AppRoutes = () => {
  
  const {user, isLogged, token} = useContext(AICropContext);
  
  return (
    <div>
        <Container fluid>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Home/>}/> 
                    <Route path='register' element={<Register/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='info' element={<Info/>}/>

                    <Route path='user' element={<MainPage/>}> {/*Vista de user == Vista de todos sus greenhouses*/}
                      <Route path='' element={<AllGreenhouses/>}/> 
                      <Route path='greenhouse/:greenhouse_id' element={<OneGreenhouse/>}/>
                      <Route path=':greenhouse/:measure' element={<Measure/>}/>
                      <Route path='edit' element={<EditUser/>}/>
                      <Route path='editGreenhouse' element={<EditGreenhouse/>}/>
                      <Route path='admin' element={<Admin/>}/> {/*Vista de TODOS los usuarios (card per user)*/}
                    </Route>

                    <Route path='*' element={<Error/>} />
                </Routes>
            </BrowserRouter>
        </Container>
    </div>
  )
}
