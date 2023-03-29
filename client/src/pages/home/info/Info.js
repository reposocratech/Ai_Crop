import React from 'react'
import { Button, Row } from 'react-bootstrap'
import { TopNavBar } from '../../../components/NavBars/TopNavBar/TopNavBar'
import './info.scss'

export const Info = () => {
  return (
    
    <Row className='cont_auth d-flex flex-column p-0'>
      <TopNavBar/>
    <section className=' contPpal d-flex justify-content-center'>
    <h2 className='fuenteFront title'>Elije tu plan de precios <span className='spanPunto punto'>.</span></h2>
    {/* card one */}
    <div class="pack-container m-5">
  <div class="header">
    <p class="title2">BASIC</p>
    <div class="price-container">
      <span className='price'>€</span>19.90
      <span>/mes</span>
    </div>
  </div>
  <div>
    <ul class="lists">
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'>2 team members</p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'>  100+ components</p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'>2 month free updates</p>
      </li>
      <li class="list">
        <span className=' textoInfo d-flex'>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'>technical support</p>
      </li>
    </ul>
  </div>
  <div class="button-container">
    <button type="button">
      Comprar ahora
    </button>
  </div>
  </div>
    {/* card two */}
    <div class="pack-container m-5">
  <div class="header">
    <p class="title2">STANDARD</p>
    <div class="price-container">
      <span>€</span>39.90
      <span>/mes</span>
    </div>
  </div>
       
  <div>
    <ul class="lists">
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'>2 team members</p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'>100+ components</p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'> 2 month free updates</p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'>technical support</p>
      </li>
    </ul>
  </div>
  <div class="button-container">
    <button type="button">
      Comprar ahora
    </button>
  </div>
</div>
    {/* card three */}
    <div class="pack-container m-5">
  <div class="header">
    <p class="title2">PREMIUM</p>
    <div class="price-container">
      <span>€</span>59.90
      <span>/mes</span>
    </div>
  </div>
  <div className='contenedorRem'>
    <ul class="lists">
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'>2 team members</p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'>100+ components</p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'> 2 month free updates</p>
      </li>
      <li class="list">
        <span>
          <svg aria-hidden="true" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12.75l6 6 9-13.5" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
        <p className='textoInfo'>technical support</p>
      </li>
    </ul>
  </div>
  <div class="button-container">
    <button type="button">
      Comprar ahora
    </button>
  </div>
</div>
</section>
</Row>

    )
  }


      
    
          
        
        
        
          
        
          
        
       
          
        
      
    
          
          
          
    
        
        
         
        
        
    
          
        
         
        
         
    
   

