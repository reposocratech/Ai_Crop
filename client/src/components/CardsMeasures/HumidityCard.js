import React from 'react'

export const HumidityCard = ({humedad}) => {
  return (
    <div className='measure_cardCont'>
        <div className='humidity_card responsive_card'>
            <div className='humidity_body'>
                <p>{humedad}%</p>
                <h3>HUMEDAD</h3>
            </div>
            <img src='/assets/images/cards/humidity.png'/>
        </div>
        <hr/>
    </div>
  )
}
