import * as V from "victory";
import React, { useState } from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import "./chartCrop.scss";

export const ChartCrop = ({ cropDuration, cropDays }) => {
  const [percent, setPercent] = useState((cropDays * 100) / cropDuration);
  const data = [
    { x: 1, y: percent },
    { x: 2, y: 100 - percent },
  ];

  return (
    <div>
      <svg
        viewBox="0 0 400 400"
        width="100%"
        height="100%"
        className="chartCrop"
      >
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          data={data}
          innerRadius={160}
          cornerRadius={20}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = "#66924F";
                return datum.x === 1 ? color : "transparent";
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={{ percent }}>
          {(newProps) => {
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={200}
                y={200}
                text={`${Math.round(newProps.percent)}%`}
                style={{ fontSize: 90 }}
              />
            );
          }}
        </VictoryAnimation>
      </svg>
    </div>
  );
};
