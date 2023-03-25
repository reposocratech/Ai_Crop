import React from 'react'

export const PhCard = ({ph}) => {
  return (
    <div className='measure_cardCont'>
    <div className='ph_card responsive_card'>
        <div className='ph_body'>
            <p>{ph}</p>
            <h3>pH</h3>
        </div>
        <img src='/assets/images/cards/ph.png'/>
    </div>
    <hr/>
</div>
  )
}
