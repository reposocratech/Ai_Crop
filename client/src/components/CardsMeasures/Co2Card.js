import React from 'react'

export const Co2Card = ({co2}) => {
  return (
    <div className='measure_cardCont'>
        <div className='co2_card responsive_card'>
            <img src='/assets/images/cards/co2.png'/>
            <div className='cuadro'><p>{co2} pm</p></div>
        </div>
        <hr/>
    </div>
  )
}
