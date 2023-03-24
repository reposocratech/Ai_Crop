import React from 'react'

export const ConductivityCard = ({conductividad}) => {
  return (
    <div className='measure_cardCont'>
    <div className='conductivity_card'>
        <h3>CONDUCTIVIDAD</h3>
        <div className='conductivity_body'>
            <div className='cuadro'>
                <p>{conductividad} ms/cm</p>
            </div>
            <img src='/assets/images/cards/energia.png'/>
        </div>
    </div>
    <hr/>
</div>
  )
}
