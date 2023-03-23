import React, { useContext } from 'react'
import { AICropContext } from '../../context/AICropContext';

export const SunlightCard = ({luzSolar}) => {
    const {user, selectedGreenhouse} = useContext(AICropContext);
  return (
    <div className='measure_cardCont'>
    <div className='sunlight_card'>
        <img src='/assets/images/cards/sunlight.png'/>
        <div>
            <h3>LUZ SOLAR</h3>
            <div className='cuadro'>
                <p>{luzSolar} nm</p>
            </div>
        </div>
    </div>
    <hr/>
</div>
  )
}
