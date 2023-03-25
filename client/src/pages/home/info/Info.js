import React from 'react'
import { Button } from 'react-bootstrap'
import './info.scss'

export const Info = () => {
  return (
    
<div className='info_Ppal d-flex'>
    
    <div class="book">
        
        <div className='parrafo'>
        <p>✔️ Lorem, ipsum dolor.</p>
        <p>✔️ Lorem, ipsum dolor.</p>
        <p> Lorem, ipsum dolor.</p>
        <p> Lorem, ipsum dolor.</p>
        <Button>SING UP</Button>
        </div>
        <div class="cover">
            <p>BASIC</p>
        </div>
    </div>

    <div class="book2">
        <div className='parrafo'>
        <p>✔️ Lorem, ipsum dolor.</p>
        <p>✔️ Lorem, ipsum dolor.</p>
        <p>✔️ Lorem, ipsum dolor.</p>
        <p>Lorem, ipsum dolor.</p>
        <Button>SING UP</Button>
        </div>
        <div class="cover2">
            <p>STANDARD</p>
        </div>
    </div>

    <div class="book3">
        <div className='parrafo'>
        <p>✔️ Lorem, ipsum dolor.</p>
        <p>✔️ Lorem, ipsum dolor.</p>
        <p>✔️ Lorem, ipsum dolor.</p>
        <p>✔️ Lorem, ipsum dolor.</p>
        <Button>SING UP</Button>
        </div>
        <div class="cover3">
            <p>PREMIUM</p>
        </div>
    </div>

</div>
    )
  }
    
   

