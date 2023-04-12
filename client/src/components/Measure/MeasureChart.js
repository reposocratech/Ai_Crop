import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { VictoryAxis, VictoryBrushContainer, VictoryChart, VictoryLine, VictoryZoomContainer } from 'victory';

export const MeasureChart = () => {
    const [state, setState] = useState({});
    const [datos, setDatos] = useState([])
    const {greenhouse_id, measurement_type_id} = useParams();

    useEffect(() => {
        axios
        .get(`http://localhost:4000/server/parameters/history/${greenhouse_id}/${measurement_type_id}`)
        .then((res)=>{
            let info = res.data;
            let array = [];
            for (let i = 0 ; i < info.length; i++){
                let date = new Date(info[i].x)
                array.push({x: date, y: info[i].y})          
            }
            setDatos(array);
            console.log(array);
          })
          .catch((err)=>{
            console.log(err);
          })
    }, [])
    
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
          width={550}
          height={300}
        //   scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              responsive={false}
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
          width={550}
          height={90}
        //   scale={{ x: "time" }}
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
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