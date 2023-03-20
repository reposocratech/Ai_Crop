import React from 'react'
import { Outlet } from 'react-router-dom'
import "./mainPage.scss"
import { AllGreenhouses } from './ShowCasePages/AllGreenhouses'
import { OneGreenhouse } from './ShowCasePages/OneGreenhouse'

export const ShowCase = () => {
    const params = window.location.pathname;
    console.log(params);
  return (
    <div className="white_cont p-5">
        <Outlet/>
    </div>
  )
}
