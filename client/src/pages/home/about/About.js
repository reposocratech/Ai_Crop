import React from 'react'
import './About.scss'


// INFORMACIÓN SOBRE LA PÁGINA

export const About = () => {
  return (
    <div className='cont_about p-0' id='about'>
        <h2 className='mt-5 about'>SOBRE NOSOTROS</h2>
        <hr />
        <br/><br/><br/>
        <p className='parrafoPpal'> 
          Somos cultivadores hidropónicos y nuestro objetivo es incentivar a los agricultores tradicionales de que en menos metros cuadrados pueden formar parcelas y transformar su cultivo. Aportamos una herramienta útil al agricultor facilitando una producción eficiente para invernaderos hidropónicos: <i>la agricultura 4.0</i>, la implementación de tecnología digital en los procesos agrícolas. Mediante el uso de un software de inteligencia artificial los agricultores pueden optimizar la gestión y el seguimiento de los cultivos.
        </p>
         {/* REDES */}
         <section className='rrss mb-5'>
                <p className='m-0 parrafoLinks'>Follow us</p>
                <a href="https://www.facebook.com/josediego.castaneda/"> <img alt='facebook' src='/assets/images/social/facebook.png'/></a>
                <a href="https://www.linkedin.com/in/diego-castanedab/"> <img alt='linkedin' src='/assets/images/social/linkedin.png'/></a>
                <a href="https://www.instagram.com/josediego1988/"> <img alt='instagram' src='/assets/images/social/instagram.png' /></a>
               <a href="https://twitter.com/?lang=es"> <img alt='twitter' src='/assets/images/social/twitter.png'/></a>
          </section>
    </div>
  )
}
               
               
