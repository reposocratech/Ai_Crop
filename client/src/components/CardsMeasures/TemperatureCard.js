import React from 'react'
import './cardsmeasures.scss'

export const TemperatureCard = ({temperatura}) => {
  return (
    <div className='measure_cardCont'>
        <div className='temperature_card responsive_card'>
            <h3>TEMPERATURA</h3>
            <p>{temperatura} ºC</p>
        </div>
        <hr/>
    </div>
  )
}
