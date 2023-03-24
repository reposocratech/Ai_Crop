import React from 'react'

export const LeafHumidity = ({humedadHoja}) => {
  return (
    <div className='measure_cardCont'>
        <div className='leafhumidity_card'>
            <div className='leafhumidity_body'>
                <p>{humedadHoja}%</p>
                <img src='/assets/images/cards/leaf_humidity.png'/>
            </div>
            <h3>HUMEDAD DE HOJA</h3>
        </div>
        <hr/>
    </div>
  )
}
