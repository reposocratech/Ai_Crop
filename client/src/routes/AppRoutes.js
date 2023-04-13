import React, { useContext, useEffect, useState } from 'react'
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
import { CreateGreenhouse } from '../pages/dashboard/greenhouse/createGreenhouse/CreateGreenhouse'
import { Contact } from '../pages/home/contact/Contact'
import { RegisterCollab } from '../pages/auth/RegisterCollab'
import { ForgotPass } from '../pages/auth/ForgotPass'
import { MeasureChart } from '../components/Measure/MeasureChart'
import axios from 'axios'


export const AppRoutes = () => {
  const { user } = useContext(AICropContext);

  return (
    <div>
      <Container fluid>
        <BrowserRouter>
          <Routes>
            {!user && (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPass />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/collaborator/:greenhouse_id"
                  element={<RegisterCollab />}
                />
              </>
            )}

            {(user?.user_type === 2 || user?.user_type === 3) && (
              <Route path="/user" element={<MainPage />}>
                {" "}
                {/*Vista de user == Vista de todos sus greenhouses*/}
                <Route path="" element={<AllGreenhouses />} />
                <Route
                  path="greenhouse/:greenhouse_id"
                  element={<OneGreenhouse />}
                />
                <Route
                  path="greenhouse/:greenhouse_id/:measurement_type_id"
                  element={<Measure />}
                />
                <Route path="edit" element={<EditUser />} />
                <Route
                  path="editGreenhouse/:greenhouse_id"
                  element={<EditGreenhouse />}
                />
                <Route path="createGreenhouse" element={<CreateGreenhouse />} />
              </Route>
            )}

                    {(user?.user_type === 2 || user?.user_type === 3)
                    &&
                    <Route path='/user' element={<MainPage/>}> {/*Vista de user == Vista de todos sus greenhouses*/}
                      <Route path='chart/:greenhouse_id/:measurement_type_id' element={<MeasureChart/>}/> 
                      <Route path='' element={<AllGreenhouses/>}/> 
                      <Route path='greenhouse/:greenhouse_id' element={<OneGreenhouse/>}/>
                      <Route path='greenhouse/:greenhouse_id/:measurement_type_id' element={<Measure/>}/>
                      <Route path='edit' element={<EditUser/>}/>
                      <Route path='editGreenhouse/:greenhouse_id' element={<EditGreenhouse/>}/>
                      <Route path='createGreenhouse' element={<CreateGreenhouse/>}/>
                    </Route>
                    }
                    
                    {user?.user_type === 1 && 
                    <Route path='/admin' element={<MainPage/>}>
                      <Route path='' element={<Admin/>}/> {/*Vista de TODOS los usuarios (card per user)*/}
                    </Route>
                    }

            {(user?.user_type || !user?.user_type) && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Error />} />
                <Route path="/info" element={<Info />} />
                <Route path="/contact" element={<Contact />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
};
