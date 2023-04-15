import axios from 'axios';
import { timeMillisecond, timeMilliseconds, utcMillisecond } from 'd3-time';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { VictoryArea, VictoryAxis, VictoryBrushContainer, VictoryChart, VictoryLine, VictoryZoomContainer } from 'victory';

export const MeasureChart = ({measure}) => {
    const [state, setState] = useState({});
    const [datos, setDatos] = useState([])
    const {greenhouse_id, measurement_type_id} = useParams();
    
    function obtenerNumeroAleatorio(min, max) {
      return parseFloat(Math.random() * ((max + 0.1) - min) + min);
    }


    useEffect(() => {

      if(measure){

        let historialMedidas = [];
        let prom = parseFloat((measure.max + measure.min)/2)
        let medidaAnterior = prom ;
  
        for(let i = 0; i < 700; i++){
          let fecha = new Date();
          let milisecs = fecha.getTime() - 60000000 * i;
          let fecha2 = new Date (milisecs)
          let aleat = parseFloat(obtenerNumeroAleatorio((prom*-0.1), (prom*0.1)))
          let medida = {x: fecha2, y: parseFloat((medidaAnterior + parseFloat(aleat)))}
          // console.log(aleat)
          // console.log(prom*-0.1, prom*0.1)
          
          if (medida.y < measure.max * 1.5 && medida.y > measure.min * 0.5){
            historialMedidas.push(medida);
          }
        }
    
        setDatos(historialMedidas)

      }
      
    }, [measure])
    
    const getMonthString = (number) => {
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        return months[number];
    } 
  
    const handleZoom = (domain) => {
      setState({ selectedDomain: domain });
    };

    const handleBrush = (domain) => {
      setState({ zoomDomain: domain });
    };

  
    return (
      <div>
        {/* CHART SUPERIOR*/}
        <VictoryChart
          width={600}
          height={300}
          domain={measure && {y: [measure.min * 0.9, measure.max * 1.1]}}
          // scale={{ x: "time" }}
        
          containerComponent={
            <VictoryZoomContainer
              responsive={true}
              zoomDimension="x"
              zoomDomain={state.zoomDomain}
              onZoomDomainChange={handleZoom}
            />
          }
        >
         
          <VictoryLine
            style={{
              data: { stroke: "tomato" },
            }}
            data={ datos }
          />
        </VictoryChart>
  
        {/* CHART INFERIOR*/}
        <VictoryChart
          width={600}
          height={120}
          domain={{y: [measure?.min * .75, measure?.max * 1.25]}}
        //   scale={{ x: "time" }}
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          containerComponent={
            <VictoryBrushContainer
              responsive={true}
              brushDimension="x"
              brushDomain={state.selectedDomain}
              onBrushDomainChange={handleBrush}
            />
          }
        >
          <VictoryAxis
            tickFormat={(x) => getMonthString(new Date(x).getMonth())}
          />
          <VictoryLine
            style={{
              data: { stroke: "tomato" },
            }}
            data={ datos }
          />
        </VictoryChart>
        </div>
    )
}